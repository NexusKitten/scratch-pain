import PropTypes from 'prop-types';
import React from 'react';

import bindAll from 'lodash.bindall';

import LayerListComponent from '../components/layer-list/layer-list.jsx';

class LayerListContainer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
    }
    render () {
        return (
            <LayerListComponent
                name={this.props.name}
                onUpdateName={this.props.onUpdateName}
                width={this.props.width}
            />
        );
    }
}

LayerListContainer.propTypes = {
    name: PropTypes.string,
    onUpdateName: PropTypes.func.isRequired,
};

export default (LayerListContainer);
