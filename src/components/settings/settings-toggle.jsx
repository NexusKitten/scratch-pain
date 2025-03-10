import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import LiveToggleHOC from '../forms/live-toggle-hoc.jsx';
import Toggle from '../forms/toggle.jsx';

import styles from './settings.css';

const LiveToggle = LiveToggleHOC(Toggle);

const SettingsToggle = props => {
    return (
        <label className={styles.settingLine}>
            <LiveToggle
                onChange={props.onChange}
                id={props.id}
                value={props.value}
                className={styles.toggle}
            />
            <span className={styles.label}>
                {props.text}
            </span>
        </label>
    );
};

SettingsToggle.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    text: PropTypes.string,
};

export default SettingsToggle;