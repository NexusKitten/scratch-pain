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
            'updateAngle',
            'onRotChange',
            'translateSelection',
            'updateExposedBounds'
        ]);
    }

    componentWillReceiveProps(newProps) {
        // Strictly compare, since selectedItems updates frequently even when it's contents are static.
        const a = this.props.selectedItems;
        const b = newProps.selectedItems;
        if (!(a.length === b.length && a.every((element, index) => element === b[index]))) {
            const selected = getSelectedRootItems();
            if (selected.length === 0) return;
            for (const item of selected) {
                item.data.rotation = 0;
                console.log(item.data.rotation)
            }
        }
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
            case "center":
                return rect.center;
        }
        return;
    }

    castToNormalAngle(angle) {
        if (Math.sign(angle) === -1) {
            return ((angle - 180) % 360) + 180;
        } else {
            return ((angle + 180) % 360) - 180;
        }
    }

    updateAngle() {
        const selected = getSelectedRootItems();
        if (selected.length === 0) return;
        console.log(selected[0]);
        return this.castToNormalAngle(selected[0].data.rotation);
    }

    onRotChange(angle) {
        // adapted from rotate-tool.js
        let oldRot = this.updateAngle();
        let rotChange = this.castToNormalAngle(angle) - oldRot;

        let rotGroupPivot = this.updateExposedBounds("center");
        let rotItems = [];
        for (const item of this.props.selectedItems) {
            if (item.parent instanceof paper.Layer) {
                rotItems.push(item);
            }
        }

        for (let i = 0; i < rotItems.length; i++) {
            const item = rotItems[i];

            item.data.rotation = angle;
            item.rotate(rotChange, rotGroupPivot);
        }
        this.props.redrawSelectionBox();
        this.props.onUpdateImage();
    }

    translateSelection(translation) {
        // adapted from nudge-tool.js
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
                rot={this.updateAngle() ?? 0}
                onTransXChange={this.onTransXChange}
                onRotChange={this.onRotChange}
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
