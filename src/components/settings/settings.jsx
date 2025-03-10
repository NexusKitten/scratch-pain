import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import LiveToggleHOC from '../forms/live-toggle-hoc.jsx';
import Toggle from '../forms/toggle.jsx';
import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import styles from './settings.css';
import TWRenderRecoloredImage from '../../tw-recolor/render.jsx';

import propTypes from 'prop-types';
import Settings from '../../lib/settings';

import SettingsToggle from './settings-toggle.jsx';

const LiveToggle = LiveToggleHOC(Toggle);

const SettingsComp = props => {
    return (
        <div>
            <SettingsToggle
            onChange = {props.onChange}
            id = {Settings.DARK_MODE}
            value = {props.DARK_MODE}
            text = {"shift pasted items?"}
            />
            <SettingsToggle
                onChange={props.onChange}
                id={Settings.DARK_MODE}
                value={props.DARK_MODE}
                text={"shift pasted items?"}
            />
        </div>
    );
};

SettingsComp.propTypes = {
    DARK_MODE: PropTypes.bool,
    onTransYChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onWidthChange: PropTypes.func.isRequired,
    onHeightChange: PropTypes.func.isRequired,
    x: propTypes.number,
    y: propTypes.number,
    rot: propTypes.number,
    width: propTypes.number,
    height: propTypes.number,
};

const mapStateToProps = state => ({
    DARK_MODE: state.scratchPaint.settings.DARK_MODE ?? false,
    format: state.scratchPaint.format,
    fillBitmapShapes: state.scratchPaint.fillBitmapShapes,
    bitBrushSize: state.scratchPaint.bitBrushSize,
    bitEraserSize: state.scratchPaint.bitEraserSize,
    brushValue: state.scratchPaint.brushMode.brushSize,
    clipboardItems: state.scratchPaint.clipboard.items,
    eraserValue: state.scratchPaint.eraserMode.brushSize
});

export default connect(
    mapStateToProps
)(SettingsComp);
