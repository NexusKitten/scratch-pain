import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateSetting, setAllSettings } from '../reducers/settings';

import SettingsComp from '../components/settings/settings.jsx';

import bindAll from 'lodash.bindall';
import Settings from '../lib/settings';

const defaultSettings = {
    START_VECTOR: true,
    VECTOR_POINT_SHAPE: true,
    SHIFT_ITEMS: false,
    ROT_SNAP: true,
    DARK_MODE: false,
    THEME: null,
}

class SettingsContainer extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'updateSettingToggle',
            'updateLocalStorage',
        ]);

        // import settings from local storage
        let storedSettings = localStorage.getItem("settings");
        console.log(storedSettings);
        if (storedSettings !== null) {
            storedSettings = JSON.parse(storedSettings);
            this.props.setAllSettings(storedSettings);
        } else {
            localStorage.setItem("settings", JSON.stringify(defaultSettings))
            this.props.setAllSettings(defaultSettings);
        }
    }

    updateLocalStorage(id, val) {
        let storedSettings = localStorage.getItem("settings");
        storedSettings = JSON.parse(storedSettings);
        storedSettings = {...storedSettings, [id]: val};
        localStorage.setItem("settings", JSON.stringify(storedSettings));
    }

    updateSettingToggle(val, id) {
        if (id === "DARK_MODE") {
            alert("just kidding i havent implemented dark mode yet");
            return;
        }
        this.props.updateSetting(id, val);
        this.updateLocalStorage(id, val);
    }

    render() {
        return (
            < SettingsComp
                onChange={this.updateSettingToggle}
            />
        )
    }
}

SettingsContainer.propTypes = {
    updateSetting: PropTypes.func.isRequired,
    setAllSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    mode: state.scratchPaint.mode,
    selectedItems: state.scratchPaint.selectedItems,
});

const mapDispatchToProps = dispatch => ({
    updateSetting: (id, val) => {
        dispatch(updateSetting(id, val));
    },
    setAllSettings: (val) => {
        dispatch(setAllSettings(val));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsContainer);
