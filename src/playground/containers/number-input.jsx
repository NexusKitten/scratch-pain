import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import propTypes from 'prop-types';

class NumberInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChange'
        ]);
    }
    handleChange(event) {
        this.props.updateTo(event.target.id, event.target.value)
    }
    render () {
        return (
            <input id={this.props.id}
            placeholder={this.props.placeholder}
            type="number" 
                onChange={this.handleChange}/>
        );
    }
}

NumberInput.propTypes = {
    id: propTypes.string,
    placeholder: propTypes.number,
    updateTo: PropTypes.func.isRequired,
};

export default (NumberInput);
