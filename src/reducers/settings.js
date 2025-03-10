import Settings from '../lib/settings';
import log from '../log/log';

const UPDATE_SETTING = 'scratch-paint/modes/UPDATE_SETTING';
const UPDATE_SETTING_ALL = 'scratch-paint/modes/UPDATE_SETTING_ALL';
const initialState = {};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case UPDATE_SETTING_ALL:
            if (action.value) {
                return action.value;
            }
        case UPDATE_SETTING:
            if (action.key in Settings) {
                return { ...state, [action.key]: action.value };
            }
            log.warn(`Setting does not exist: ${action.key}`);
        /* falls through */
        default:
            return state;
    }
};

// Action creators ==================================
const updateSetting = function (key, value) {
    return {
        type: UPDATE_SETTING,
        key: key,
        value: value
    };
};

const setAllSettings = function (value) {
    return {
        type: UPDATE_SETTING_ALL,
        value: value
    };
}

export {
    reducer as default,
    updateSetting,
    setAllSettings
};
