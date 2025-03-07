const SET_STATE = 'playground/SET_STATE';

// Append ?dir=rtl to URL to get RTL layout
const match = location.search.match(/dir=([^&]+)/);
const rtl = match && match[1] == 'rtl';
const svgString =
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' x="0px" y="0px" width="32px" height="32px" viewBox="0.5 384.5 32 32"' +
    ' enable-background="new 0.5 384.5 32 32" xml:space="preserve">' +
    '<path fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M7.5,392.241h7.269' +
    'c4.571,0,8.231,5.555,8.231,10.123v7.377"/>' +
    '<polyline points="10.689,399.492 3.193,391.997 10.689,384.5 "/>' +
    '<polyline points="30.185,405.995 22.689,413.491 15.192,405.995 "/>' +
    '</svg>';
const initialState = {
    name: 'meow',
    rotationCenterX: 20,
    rotationCenterY: 400,
    imageFormat: 'svg', // 'svg', 'png', or 'jpg'
    image: svgString, // svg string or data URI
    imageId: 0, // If this changes, the paint editor will reload
    rtl: rtl,
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_STATE:
        return {
            ...state, ...action.data
        };
    default:
        return state;
    }
};

// Action creators ==================================
const updatePlaygroundStat = function (data) {
    return {
        type: SET_STATE,
        data: data,
    };
};

export {
    reducer as default,
    updatePlaygroundStat
};
