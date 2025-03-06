import paper from '@turbowarp/paper';
import PropTypes from 'prop-types';
import React from 'react';
import PaperCanvas from './paint-editor.jsx'
import { getRaster } from '../helper/layer.js';

import bindAll from 'lodash.bindall';

import LayerListComponent from '../components/layer-list/layer-list.jsx';
import PaintEditor from '../index.js';

class LayerListContainer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'createNewLayer',
        ]);
        this.totalLayers = 0
        this.layers = [];
        this.layers.push({
            name: "Base Layer",
            src: props.image,
            id: this.totalLayers,
        })
        this.totalLayers++;
        this.activeLayer = 0;
    }
    createNewLayer() {
        let defaultLayerName = `Layer ${this.totalLayers}`;
        this.layers.push({
            name: defaultLayerName,
            src: PaintEditor.image,
            id: this.totalLayers,
        });
        this.totalLayers++;
        this.props.onUpdateImage();
        console.log(this.layers)
    }
    render () {
        return (
            <LayerListComponent
                name={this.props.name}
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
    name: PropTypes.string,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(HTMLImageElement)
    ]),
    onUpdateName: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
};

export default (LayerListContainer);
