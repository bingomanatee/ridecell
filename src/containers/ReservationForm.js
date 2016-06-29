import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import InputRange from 'react-input-range';

import classes from './ReservationForm.scss';
import {display, update, send} from '../redux/modules/reservation';

type Props = {
    reservation: object,
    display: any
}

const bg = (img) => ({backgroundImage: `url(${img})`});

import location from './icons/location.png';
import calendar from './icons/calendar.png';
import time from './icons/clock.png';

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

export class ReservationForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {newReservation: {reserveFor: 60}};
    }

    props:Props;
    static propTypes = {
        reservation: PropTypes.object,
        display: PropTypes.func,
        update: PropTypes.func,
        send: PropTypes.func
    };

    render () {
        const changeRes = function (component, values) {
            var newReservation = Object.assign({}, this.state.newReservation, {reserveFor: values});
            this.setState({newReservation});
        }.bind(this);

        const search = function () {
            this.props.display(false);
            this.props.update(this.state.newReservation);
            this.props.send();
        }.bind(this);

        const changeDate = function (evt) {
            this.setState({newReservation: Object.assign({}, this.state.newReservation, {date: evt.value})});
        }.bind(this);

        const changeTime = function (evt) {
            this.setState({newReservation: Object.assign({}, this.state.newReservation, {time: evt.value})});
        }.bind(this);

        return (
            <div className={classes.resform}>
                <div className={classes.resform__inner}>
                    <div className={classes.resform__formrow}>
                        <div className={classes.resform__icon} style={locIconStyle}>
                        </div>
                        <div className={classes.resform__inputCell}>
                            <input type="text" name="location"
                                   placeholder="Location"/>
                        </div>
                    </div>

                    <div className={classes.resform__formrow}>
                        <div className={classes.resform__icon} style={dateStyle}>
                        </div>
                        <div className={classes.resform__inputCell}>
                            <input type="text"
                                   value={this.state.newReservation.date}
                                   name="date" onChange={changeDate}
                                   placeholder="Date"/>
                        </div>
                        <div className={classes.resform__icon} style={timeStyle}>
                        </div>
                        <div className={classes.resform__inputCell}>
                            <input type="text" name="time"
                                   value={this.state.newReservation.time}
                                   onChange={changeTime} placeholder="Time"/>
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
            </div>
        );
    }
}

export default connect(
    {}, {
        display, update, send
    })(ReservationForm);
