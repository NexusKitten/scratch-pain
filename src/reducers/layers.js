import log from '../log/log';

const CREATE_LAYER = 'scratch-paint/layers/CREATE_LAYER';
const SET_ACTIVE_LAYER = 'scratch-paint/layers/SET_ACTIVE_LAYER';
const initialState = {
    layers: [],
    layerIDs: [],
    activeCostumeLayer: 0
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CREATE_LAYER:
        if (!action.data || !(action.data instanceof Object)) {
            log.warn(`Invalid layer format`);
            return state;
        }
        return {
            activeCostumeLayer: state.activeCostumeLayer,
            layers: state.layers.concat(action.data),
            layerIDs: state.layerIDs.concat(action.id),
        };
    case SET_ACTIVE_LAYER:
        console.log(action.index);
        return {
            activeCostumeLayer: action.index,
            layers: state.layers,
            layerIDs: state.layerIDs,
        };
    default:
        return state;
    }
};

// Action creators ==================================
const createLayer = function (data, id) {
    return {
        type: CREATE_LAYER,
        data: data,
        id: id,
    };
};

const setActiveLayer = function (index) {
    return {
        type: SET_ACTIVE_LAYER,
        index: index
    };
};

export {
    reducer as default,
    createLayer,
    setActiveLayer,
};
