import PropTypes from 'prop-types';
import React from 'react';

import bindAll from 'lodash.bindall';

import LayerListItemComponent from '../components/layer-list-item/layer-list-item.jsx';

class LayerListItemContainer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
    }
    render () {
        return (
            <LayerListItemComponent
                name={this.props.name}
                id={this.props.id}
                src={this.props.src}
            />
        );
    }
}

LayerListItemContainer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
};

export default (LayerListItemContainer);
