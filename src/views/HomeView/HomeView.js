/* @flow */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import {increment, doubleAsync} from '../../redux/modules/parkingSpots';
import {display, send, reset} from '../../redux/modules/reservation';
import ParkingSpot from '../../containers/ParkingSpot';
import ReservationForm from './../../containers/ReservationForm';
import SpotTicket from './../../components/SpotTicket/SpotTicket';

import map from './maps/streets.png';
import toolbar from './toolbar.png';
import you from './icons/you.svg';

const bg = (img) => ({backgroundImage: `url(${img})`});

const mapStyle = bg(map);

import classes from './HomeView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
    parkingSpots: array,
    reservation: object,
    display: any,
    send: any,
    reset: any
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {

    static propTypes = {
        parkingSpots: PropTypes.array,
        reservation: PropTypes.object,
        display: PropTypes.func,
        send: PropTypes.func,
        reset: PropTypes.func
    };

    spots () {
        if (!this.props.reservation.sent) {
            return '';
        }

        const activeId = this.props.reservation.activeSpot ? this.props.reservation.activeSpot.id : false;
        return this.props.parkingSpots.filter((spot) => (!activeId) || (spot.id === activeId))
            .map((spot) => (<ParkingSpot key={`parkingspot${spot.id}`} spot={spot}/>));
    }

    spotTicket () {
        if (!this.props.reservation.activeSpot) {
            return '';
        }

        const reset = function () {
            this.props.reset();
        }.bind(this);

        const save = function () {
            alert('saving space');
            this.props.reset();
        }.bind(this);

        return <SpotTicket save={save} reset={reset} spot={this.props.reservation.activeSpot}/>
    }

    resForm () {
        if (!(this.props.reservation.display)) {
            return '';
        }

        return <ReservationForm />
    }

    render () {
        console.log('parking spots: ', this.props.parkingSpots);
        const displayInput = function () {
            this.props.display(true);
        }.bind(this);

        return (
            <div className={classes.appframe}>
                <h1 className={classes.appframe__title}>Parking App</h1>
                <section className={classes.appframe__map} style={mapStyle}>
                    {this.spots()}
                    <div className={classes.you}>
                        <img src={you}/>
                    </div>
                    {this.resForm()}
                    {this.spotTicket()}
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
export default connect(mapStateToProps, {
    display, send, reset
})(HomeView);
