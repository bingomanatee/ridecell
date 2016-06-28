/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const DISPLAY_SEARCH = 'DISPLAY_SEARCH';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const RESET = 'RESET';
export const SEND_SEARCH = 'SEND_SEARCH';
export const ACTIVE_SPOT = 'ACTIVE_SPOT';

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

export function chooseSpot (spot:object) {
    return {
        type: ACTIVE_SPOT,
        payload: spot
    }
}

export function reset () {
    return {
        type: RESET
    }
}

export const actions = {
    update,
    display,
    send,
    chooseSpot,
    reset
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DISPLAY_SEARCH]: (state:object, action:object) => Object.assign({}, state, {display: action.payload}),
    [UPDATE_SEARCH]: (state:object, action:object) => Object.assign({}, state, action.payload),
    [SEND_SEARCH]: (state:object, action:object) => Object.assign({}, state, {sent: true}),
    [ACTIVE_SPOT]: (state:object, action:object) => Object.assign({}, state, {activeSpot: action.payload}),
    [RESET]: () => initialState
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    display: false,
    sent: false,
    date: new Date(),
    reserveFor: 60, // minutes
    activeSpot: false
};

export default function reservationReducer (state:array = initialState, action:Action):object {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
