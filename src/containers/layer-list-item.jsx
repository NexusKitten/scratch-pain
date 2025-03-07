import PropTypes from 'prop-types';
import React from 'react';

import bindAll from 'lodash.bindall';

import LayerListItemComponent from '../components/layer-list-item/layer-list-item.jsx';
import { setActiveLayer } from '../reducers/layers.js';
import { connect } from 'react-redux';
import PaperCanvas from './paper-canvas.jsx';

class LayerListItemContainer extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'setActive',
        ]);
    }
    setActive() {
        //let layerIndex = layerIDs.indexOf(this.props.activeCostumeLayer);
        //let oldLayer = layers[layerIndex];
        // update old layer
        this.props.setActiveLayer(this.props.id);
        //isVector, image, rotationCenterX, rotationCenterY
        let pcanvas = new PaperCanvas({
            imageFormat: this.props.imageFormat === "svg",
            image: this.props.image,
            rotationCenterX: this.props.rotationCenterX,
            rotationCenterY: this.props.rotationCenterY,
        })
        pcanvas.switchCostume(
            this.props.imageFormat,
            this.props.image,
            this.props.rotationCenterX,
            this.props.rotationCenterY,)
    }
    render() {
        return (
            <LayerListItemComponent
                name={this.props.name}
                id={this.props.id}
                src={this.props.src}
                setActiveLayer={this.setActive}
            />
        );
    }
}

LayerListItemContainer.propTypes = {
    layers: PropTypes.array,
    layerIDs: PropTypes.array,
    activeCostumeLayer: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
    setActiveLayer: PropTypes.func.isRequired,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(HTMLImageElement)
    ]),
    imageFormat: PropTypes.string,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    onUpdateImage: PropTypes.func.isRequired,
    onUpdateName: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    layers: state.scratchPaint.layers.layers,
    layerIDs: state.scratchPaint.layers.layerIDs,
    activeCostumeLayer: state.scratchPaint.layers.activeCostumeLayer,
});

const mapDispatchToProps = dispatch => ({
    setActiveLayer: index => {
        dispatch(setActiveLayer(index));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerListItemContainer);
