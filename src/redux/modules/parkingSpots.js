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

class ParkingSpot {
    constructor (x, y, id, name, cost, spots, distance, address) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.spots = spots;
        this.distance = distance;
        this.address = address;
    }

    set address (val:string) {
        this._address = val;
    }

    get address ():string {
        return this._address;
    }

    set distance (val:number) {
        this._distance = val;
    }

    get distance ():number {
        return this._distance;
    }

    set x (val:number) {
        this._x = val;
    }

    get x ():number {
        return this._x;
    }

    set y (val:number) {
        this._y = val;
    }

    get y ():number {
        return this._y;
    }

    set id (val:number) {
        this._id = val;
    }

    get id ():number {
        return this._id;
    }

    set name (val:string) {
        this._name = val;
    }

    get name ():string {
        return this._name;
    }

    set cost (val:string) {
        this._cost = val;
    }

    get cost ():string {
        return this._cost;
    }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = [
    new ParkingSpot(50, 60, 100, 'First and Grove', '0.25/10 min', 2, 0.25, '123 First Street'),
    new ParkingSpot(200, 80, 200, 'Main Street Park', '2.00/hr', 30, 0.3, '200 Main Street'),
    new ParkingSpot(100, 150, 300, 'Italian Ave.', 'free', 3, 0.5, '1015 Italian Ave'),
    new ParkingSpot(500, 600, 400, 'Arbor St. Garage', '2.00/half hr', 12, 0.44, '30 Arbor St'),
    new ParkingSpot(150, 300, 500, 'First and Arbor', 'free', 2, 1, '503 First Street')
];

export default function counterReducer (state:array = initialState, action:Action):number {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
