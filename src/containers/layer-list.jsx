import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import bindAll from 'lodash.bindall';

import LayerListComponent from '../components/layer-list/layer-list.jsx';
import { createLayer, setActiveLayer } from '../reducers/layers';
import PaperCanvas from './paper-canvas.jsx';

class LayerListContainer extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'createNewLayer',
        ]);
        this.totalLayers = 0;
        this.createNewLayer();
        this.props.setActiveLayer(0);
    }
    createNewLayer() {
        this.props.createLayer({
            name: `Layer ${this.props.layers.length}`,

            id: this.totalLayers
        }, this.totalLayers)
        this.totalLayers++;
        console.log(this.layers)
    }
    render() {
        return (
            <LayerListComponent
                name={this.props.name}
                image={this.props.image}
                imageFormat={this.props.imageFormat}
                rotationCenterX={this.props.rotationCenterX}
                rotationCenterY={this.props.rotationCenterY}
                onUpdateName={this.props.onUpdateName}
                width={this.props.width}
                createNewLayer={this.createNewLayer}
                listOfLayers={this.layers}
                onUpdateImage={this.props.onUpdateImage}
            />
        );
    }
}

LayerListContainer.propTypes = {
    layers: PropTypes.array,
    layerIDs: PropTypes.array,
    activeCostumeLayer: PropTypes.number,
    name: PropTypes.string,
    createLayer: PropTypes.func.isRequired,
    setActiveLayer: PropTypes.func.isRequired,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(HTMLImageElement)
    ]),
    imageFormat: PropTypes.string,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    onUpdateName: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    layers: state.scratchPaint.layers.layers,
    layerIDs: state.scratchPaint.layers.layerIDs,
    activeCostumeLayer: state.scratchPaint.layers.activeCostumeLayer,
});

const mapDispatchToProps = dispatch => ({
    createLayer: data => {
        dispatch(createLayer(data));
    },
    setActiveLayer: index => {
        dispatch(setActiveLayer(index));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerListContainer);
