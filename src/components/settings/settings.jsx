import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import React from 'react';

import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import styles from './settings.css';
import TWRenderRecoloredImage from '../../tw-recolor/render.jsx';

import propTypes from 'prop-types';
import Settings from '../../lib/settings';

import SettingsToggle from './settings-toggle.jsx';

// To do: This method for adding settings is incredibly inefficient. It'd be wise to make a JSON-based system in the future.

const messages = defineMessages({
    START_VECTOR: {
        defaultMessage: 'Start as vector?',
        description: 'Setting that determines whether the editor starts in vector mode.',
        id: 'paint.paintEditor.START_VECTOR'
    },
    VECTOR_POINT_SHAPE: {
        defaultMessage: 'Curve points by default?',
        description: 'Setting that determines whether vector points start curved.',
        id: 'paint.paintEditor.VECTOR_POINT_SHAPE'
    },
    SHIFT_ITEMS: {
        defaultMessage: 'Shift pasted items?',
        description: 'Setting that determines whether pasted items are shifted down and right.',
        id: 'paint.paintEditor.SHIFT_ITEMS'
    },
    ROT_SNAP: {
        defaultMessage: 'Rotation snap angle',
        description: 'Setting that determines the angle of which to snap to when shift is held while rotating.',
        id: 'paint.paintEditor.ROT_SNAP'
    },
    DARK_MODE: {
        defaultMessage: 'Dark mode?',
        description: 'Setting that determines whether a user prefers dark or light mode.',
        id: 'paint.paintEditor.DARK_MODE'
    },
    THEME: {
        defaultMessage: 'Theme:',
        description: 'Setting that determines the user\'s desired theme.',
        id: 'paint.paintEditor.THEME'
    },
});

const SettingsComp = props => {
    return (
        <div>
            <SettingsToggle
            onChange = {props.onChange}
            id = {Settings.START_VECTOR}
                value={props.START_VECTOR}
                text={props.intl.formatMessage(messages.START_VECTOR)}
            />
            <SettingsToggle
                onChange={props.onChange}
                id={Settings.VECTOR_POINT_SHAPE}
                value={props.VECTOR_POINT_SHAPE}
                text={props.intl.formatMessage(messages.VECTOR_POINT_SHAPE)}
            />
            <div className={styles.spacer}></div>
            <SettingsToggle
                onChange={props.onChange}
                id={Settings.SHIFT_ITEMS}
                value={props.SHIFT_ITEMS}
                text={props.intl.formatMessage(messages.SHIFT_ITEMS)}
            />
            <div className={styles.spacer}></div>
            <SettingsToggle
                onChange={props.onChange}
                id={Settings.DARK_MODE}
                value={props.DARK_MODE}
                text={props.intl.formatMessage(messages.DARK_MODE)}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    START_VECTOR: state.scratchPaint.settings.START_VECTOR ?? false,
    VECTOR_POINT_SHAPE: state.scratchPaint.settings.VECTOR_POINT_SHAPE ?? false,
    SHIFT_ITEMS: state.scratchPaint.settings.SHIFT_ITEMS ?? false,
    DARK_MODE: state.scratchPaint.settings.DARK_MODE ?? false,
});

export default connect(
    mapStateToProps
)(injectIntl(SettingsComp));
