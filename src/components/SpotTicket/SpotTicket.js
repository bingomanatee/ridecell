import React from 'react';
import classes from './SpotTicket.scss';
import info from './info.svg';
import park from './park.svg';
import reset from './reset.svg';

const SpotTicket = (props) => (
    <div className={classes.spotticket}>
        <div className={classes.spotticket__row}>
            <div className={classes.spotticket__inner}>
                <div className={`${classes.spotticket__innerrow} ${classes.spotticket__innerrow_first}`}>
                    <div className={`${classes.spotticket__cell} ${classes.spotticket__cell_2x}`}>
                        <h2>{props.spot.name}</h2>
                        <p>{props.spot.address}</p>
                    </div>
                    <div className={`${classes.spotticket__cell} ${classes.spotticket__cell_last}`}>
                        <p className={classes.spotticket__info}><img src={info} />More</p>
                    </div>
                </div>
                <div className={classes.spotticket__innerrow}>
                    <div className={classes.spotticket__cell}>
                        <h3>Open Spots</h3>
                        <div className={classes.spoticket__data}><b>{props.spot.spots}</b>
                        </div>
                    </div>
                    <div className={classes.spotticket__cell}>
                        <h3>Cost</h3>
                        <div className={classes.spoticket__data}><b>{props.spot.cost}</b>
                        </div>
                    </div>
                    <div className={classes.spotticket__cell}>
                        <h3>Distance</h3>
                        <div className={classes.spoticket__data}><b>{props.spot.distance}</b> mi</div>
                    </div>
                </div>
                <div className={`${classes.spotticket__innerrow} ${classes.spotticket__innerrow_last}`}>
                    <div className={classes.spotticket__cell}>
                       <button className={classes.reset} onClick={props.reset}>
                           <img src={reset} />
                           <h3>Start Over</h3>
                       </button>
                    </div>
                    <div className={`${classes.spotticket__cell} ${classes.spotticket__cell_2x}`} onClick={props.save}>
                        <button><img src={park} /> <h3>Pay and Reserve</h3></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SpotTicket;
