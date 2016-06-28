/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const DISPLAY_SEARCH = 'DISPLAY_SEARCH';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const SEND_SEARCH = 'SEND_SEARCH';

// ------------------------------------
// Actions
// ------------------------------------
export function update (search:object):Action {
    return {
        type: UPDATE_SEARCH,
        payload: search
    };
}

export function display (show:bool = true) {
    return {
        type: DISPLAY_SEARCH,
        payload: show
    }
}

export function send () {
    return {
        type: SEND_SEARCH
    }
}

export const actions = {
    update,
    display,
    send
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DISPLAY_SEARCH]: (state:object, action:object) =>  Object.assign({}, state, {display: action.payload}),
    [UPDATE_SEARCH]: (state: object, action: object) => Object.assign({}, state, action.payload),
    [SEND_SEARCH]: (state: object, action: object) => Object.assign({}, state, {sent: true})
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    display: false,
    sent: false,
    date: new Date(),
    reserveFor: 60 // minutes
};

export default function reservationReducer (state:array = initialState, action:Action):number {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
