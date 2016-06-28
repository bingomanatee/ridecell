import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseSpot} from '../redux/modules/reservation';
import classNames from './ParkingSpot.scss';

import parkingSpotImage from './ParkingSpot.svg';

const PIP_WIDTH = 28;

type
Props = {
    spot: object,
    activeSpot: any
};
export class ParkingSpot extends React.Component {
    props:Props;

    static propTypes = {
        spot: PropTypes.object,
        chooseSpot: PropTypes.func
    };

    render () {
        const spotStyle = {
            left: `${this.props.spot.x - PIP_WIDTH / 2}px`,
            top: `${this.props.spot.y - PIP_WIDTH / 2}px`,
            backgroundImage: `url(${parkingSpotImage})`
        };
        
        var choose = function() {
            this.props.chooseSpot(this.props.spot);
        }.bind(this);
        
        return (
            <div onClick={choose} key={`spot-${this.props.spot.id}`} className={classNames.spot} style={spotStyle}>
                <h3>{this.props.spot.name}</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};
export default connect(
    mapStateToProps,
    {chooseSpot}
)(ParkingSpot);
