import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import parkingSpots from './modules/parkingSpots';
import reservation from './modules/reservation';

export default combineReducers({
    parkingSpots,
    reservation,
    router
});
