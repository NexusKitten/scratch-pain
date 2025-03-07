import paper from '@turbowarp/paper';
import PropTypes from 'prop-types';
import React from 'react';

import bindAll from 'lodash.bindall';

import LayerListComponent from '../components/layer-list/layer-list.jsx';
import propTypes from 'prop-types';

class LayerListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <LayerListComponent
                setActiveLayer={this.props.setActiveLayer}
                getLayerData={this.props.getLayerData}
                createNewLayer={this.props.createNewLayer}
                name={this.props.name}
                allLayerData={this.props.allLayerData}
            />
        );
    }
}

LayerListContainer.propTypes = {
    getLayerData: PropTypes.func.isRequired,
    setActiveLayer: PropTypes.func.isRequired,
    createNewLayer: PropTypes.func.isRequired,
    name: PropTypes.string,
    allLayerData: PropTypes.object,
};

export default (LayerListContainer);
