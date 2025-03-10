import keyMirror from 'keymirror';

const Settings = keyMirror({
    START_VECTOR: null,
    VECTOR_POINT_SHAPE: null,
    SHIFT_ITEMS: null,
    ROT_SNAP: null,
    DARK_MODE: null,
    THEME: null,
 });

const settingsData = [
    {
        name: "Start as vector?",
        description: "",
        id: Settings.START_VECTOR,
        type: "bool",
        default: true,
    },
    {
        name: "Curve vector points by default?",
        description: "",
        id: Settings.VECTOR_POINT_SHAPE,
        type: "bool",
        default: true,
    },
    "---",
    {
        name: "Shift pasted items?",
        description: "",
        id: Settings.SHIFT_ITEMS,
        type: "bool",
        default: false,
    },
    "---",
    {
        name: "Dark Mode?",
        description: "",
        id: Settings.DARK_MODE,
        type: "bool",
        default: false,
    },
]

export {
    Settings as default,
    settingsData
}
