import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import React from 'react';

import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import styles from './settings.css';
import TWRenderRecoloredImage from '../../tw-recolor/render.jsx';

import Settings, { settingsData } from '../../lib/settings';

import SettingsToggle from './settings-toggle.jsx';

const SettingsComp = props => {
    return (
        <div>
            <div
                onClick={props.toggleSettings}
                className={styles.dropdown}
            >
                Settings v
            </div>
            {props.showSettings ? settingsData.map((item, index) => {
                if (item === "---") {
                    return <div className={styles.spacer} key={index}></div>
                } else {
                    switch (item.type) {
                        case "bool":
                            return <SettingsToggle
                                onChange={props.onChange}
                                id={item.id}
                                value={props.settings[item.id] ?? false}
                                text={item.name}
                                key={index}
                            />
                    }
                }
            }) : null}
        </div>
    );
};

SettingsComp.propTypes = {
    toggleSettings: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    showSettings: PropTypes.bool,
};

const mapStateToProps = state => ({
    settings: state.scratchPaint.settings
});

export default connect(
    mapStateToProps
)(SettingsComp);
