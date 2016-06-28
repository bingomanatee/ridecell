/* @flow */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import {increment, doubleAsync} from '../../redux/modules/parkingSpots';
import {display, send} from '../../redux/modules/reservation';
import ParkingSpot from '../../containers/ParkingSpot';
import map from './maps/streets.png';
import InputRange from 'react-input-range';

import toolbar from './toolbar.png';
import location from './icons/location.png';
import calendar from './icons/calendar.png';
import time from './icons/clock.png';
import you from './icons/you.svg';

const bg = img => ({backgroundImage: `url(${img})`});

const mapStyle = bg(map);
const locIconStyle = bg(location);
const dateStyle = bg(calendar);
const timeStyle = bg(time);
const compactStyle = {
    height: 'auto',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'inherit'
};

const compactStyleNM = Object.assign({margin: 0}, compactStyle);

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
    display: any
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
    constructor (props) {
        super(props);
        this.state = {newReservation: {reserveFor: 60}};
    }

    static propTypes = {
        parkingSpots: PropTypes.array,
        reservation: PropTypes.object,
        display: PropTypes.func,
        send: PropTypes.func
    };

    render () {
        console.log('parking spots: ', this.props.parkingSpots);
        let spots = '';
        const displayInput = function () {
            this.props.display(true);
        }.bind(this);

        let resform = '';

        if (this.props.reservation.sent) {
            spots = this.props.parkingSpots.map((spot) => <ParkingSpot key={`parkingspot${spot.id}`} spot={spot}/>);
        }

        if (this.props.reservation.display) {
            const changeRes = function (component, values) {
                var newReservation = Object.assign({}, this.state.newReservation, {reserveFor: values});
                this.setState({newReservation});
            }.bind(this);

            const search = function () {
                this.props.display(false);
                this.props.send();
            }.bind(this);

            const changeDate = function (evt) {
                this.setState({newReservation: Object.assign({}, this.state.newReservation, {date: evt.value})});
            }.bind(this);
            const changeTime = function (evt) {
                this.setState({newReservation: Object.assign({}, this.state.newReservation, {time: evt.value})});
            }.bind(this);

            resform = <div className={classes.resform}>
                <div className={classes.resform__inner}>
                    <div className={classes.resform__formrow}>
                        <div className={classes.resform__icon} style={locIconStyle}>
                        </div>
                        <div className={classes.resform__inputCell}><input type="text" name="location"
                                                                           placeholder="Location"/>
                        </div>
                    </div>

                    <div className={classes.resform__formrow}>
                        <div className={classes.resform__icon} style={dateStyle}>
                        </div>
                        <div className={classes.resform__inputCell}><input type="text" value={this.state.newReservation.date} name="date" onChange={changeDate} placeholder="Date"/>
                        </div>
                        <div className={classes.resform__icon} style={timeStyle}>
                        </div>
                        <div className={classes.resform__inputCell}><input type="text" name="time" value={this.state.newReservation.time} onChange={changeTime} placeholder="Time"/>
                        </div>
                    </div>

                    <div className={classes.resform__formrow} style={compactStyle}>
                        <div className={classes.resform__label}>
                            Reserve For:
                        </div>
                    </div>
                    <div className={classes.resform__formrow} style={compactStyleNM}>
                        <div className={classes.resform__reserveForCell}>
                            <InputRange minValue={15} value={this.state.newReservation.reserveFor} maxValue={120}
                                        step={15} onChange={changeRes}/>
                        </div>
                    </div>
                    <div className={classes.resform__formrow}>
                        <center>
                            <button onClick={search} className={classes.resform__submitBtn}>Search</button>
                        </center>
                    </div>
                </div>
            </div>;
        }

        return (
            <div className={classes.appframe}>
                <h1 className={classes.appframe__title}>Parking App</h1>
                <section className={classes.appframe__map} style={mapStyle}>
                    {spots}
                    <div className={classes.you}>
                        <img src={you} />
                    </div>
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
    display, send
})(HomeView);
