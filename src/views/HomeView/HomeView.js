/* @flow */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import {increment, doubleAsync} from '../../redux/modules/parkingSpots';
import {display} from '../../redux/modules/reservation';
import ParkingSpot from '../../containers/ParkingSpot';

import map from './maps/streets.png';
import toolbar from './toolbar.png';
const mapStyle = {background: `url(${map})`};

import classes from './HomeView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type
Props = {
    parkingSpots: array,
    reservation: object,
    display: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
    static propTypes = {
        parkingSpots: PropTypes.array,
        reservation: PropTypes.object,
        display: PropTypes.function
    };

    render () {
        console.log('parking spots: ', this.props.parkingSpots);
        const spots = this.props.parkingSpots.map((spot) => <ParkingSpot key={`parkingspot${spot.id}`} spot={spot}/>);
        const displayInput = function () {
            debugger;
            this.props.display(true);
        }.bind(this);

        let resform = '';

        if (this.props.reservation.display) {
            resform = <div className={classes.resform}>
                <div className={classes.resform__inner}>Reservation</div>
            </div>;
        }

        return (
            <div className={classes.appframe}>
                <h1 className={classes.appframe__title}>Parking App</h1>
                <section className={classes.appframe__map} style={mapStyle}>
                    {spots}
                    {resform}
                </section>
                <nav className={classes.appframe__nav}><img src={toolbar} onClick={displayInput}/></nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    parkingSpots: state.parkingSpots,
    reservation: state.reservation
});
export default connect((mapStateToProps), {
    display
})(HomeView);
