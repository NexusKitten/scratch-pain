import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Higher Order Component to manage inputs that submit on change and <enter>
 * @param {React.Component} Toggle bool input that consumes onChange, onBlur, onKeyPress
 * @returns {React.Component} Live input that calls onSubmit on change and <enter>
 */
export default function (Toggle) {
    class LiveToggle extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleChange',
                'handleFlush'
            ]);
            this.state = {
                value: null
            };
        }
        handleFlush () {
            this.setState({value: null});
        }
        handleChange (e) {
            this.props.onChange(e.target.checked, e.target.id);
            this.setState({ value: e.target.checked });
        }
        render () {
            const liveValue = this.state.value === null ? this.props.value : this.state.value;
            return (
                <Toggle
                    {...this.props}
                    checked={liveValue}
                    onBlur={this.handleFlush}
                    onChange={this.handleChange}
                />
            );
        }
    }

    LiveToggle.propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func.isRequired,
        value: PropTypes.bool
    };

    return LiveToggle;
}
