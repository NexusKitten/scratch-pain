import PropTypes from 'prop-types';
import React from 'react';

import bindAll from 'lodash.bindall';

import LayerListItemComponent from '../components/layer-list-item/layer-list-item.jsx';

class LayerListItemContainer extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'changeLayer'
        ]);
    }
    changeLayer() {
        this.props.setActiveLayer(this.props.id);
    }
    render() {
        return (
            <div onClick={this.changeLayer}>
                <LayerListItemComponent
                    name={this.props.name}
                    id={this.props.id}
                    src={this.props.src}
                />
            </div>
        );
    }
}

LayerListItemContainer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
    setActiveLayer: PropTypes.func.isRequired,
};

export default (LayerListItemContainer);
