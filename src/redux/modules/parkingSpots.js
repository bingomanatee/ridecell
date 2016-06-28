/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PARKING_SPACE = 'UPDATE_PARKING_SPACE';

// ------------------------------------
// Actions
// ------------------------------------
export function update (space:object):Action {
    return {
        type: UPDATE_PARKING_SPACE,
        payload: space
    };
}

export const actions = {
    update
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [UPDATE_PARKING_SPACE]: (state:array, action:object) =>
        state.map((space) => space.id === action.payload ? action.payload : space)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [
    {
        x: 50,
        y: 60,
        id: 100,
        cost: '0.25/10 min',
        spots: 2
    },
    {
        x: 100,
        y: 200,
        id: 200,
        cost: '15.00/all day',
        spots: 2
    },
    {
        x: 300,
        y: 150,
        id: 300,
        cost: 'free',
        spots: 2
    },
    {
        x: 400,
        y: 300,
        id: 400,
        cost: '0.10/10 min',
        spots: 2
    }
];
export default function counterReducer (state:array = initialState, action:Action):number {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
