import paper from '@turbowarp/paper';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import PreciseTransComp from '../components/precise-trans/precise-trans.jsx';

import {redrawSelectionBox} from '../reducers/selected-items';

import { getSelectedRootItems } from '../helper/selection';
import bindAll from 'lodash.bindall';
import Modes from '../lib/modes';

class PreciseTrans extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onTransXChange',
            'onTransYChange',
            'translateSelection',
            'updateExposedBounds'
        ]);
    }

    updateExposedBounds(axis) {
        const selected = getSelectedRootItems();
        if (selected.length === 0) return;
        let rect;
        for (const item of selected) {
            if (rect) {
                rect = rect.unite(item.bounds);
            } else {
                rect = item.bounds;
            }
        }
        switch (axis) {
            case "x":
                return rect.center._x;
            case "y":
                return rect.center._y;
        }
        return;
    }

    translateSelection(translation) {
        const selected = getSelectedRootItems();
        if (translation) {
            for (const item of selected) {
                item.translate(translation);
            }
            this.props.redrawSelectionBox();
            this.props.onUpdateImage();
        }
    }

    // to do: compress these into one function
    onTransXChange(delta) {
        this.translateSelection(new paper.Point(delta - this.updateExposedBounds("x"), 0));
    }
    onTransYChange(delta) {
        this.translateSelection(new paper.Point(0, delta - this.updateExposedBounds("y")));
    }

    render() {
        return (this.props.mode === Modes.SELECT ?
            < PreciseTransComp
                x={this.updateExposedBounds("x") ?? 0}
                y={this.updateExposedBounds("y") ?? 0}
                onTransXChange={this.onTransXChange}
                onTransYChange={this.onTransYChange}
            />
            : <div></div>)
    }
}

PreciseTrans.propTypes = {
    onUpdateImage: PropTypes.func.isRequired,
    redrawSelectionBox: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    mode: state.scratchPaint.mode,
    // selectedItems is unused, but it being a property updates the component whenever a selection is updated.
    selectedItems: state.scratchPaint.selectedItems,
});

const mapDispatchToProps = dispatch => ({
    redrawSelectionBox: () => {
        dispatch(redrawSelectionBox());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PreciseTrans);
