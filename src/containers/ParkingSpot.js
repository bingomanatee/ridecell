import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import classNames from './ParkingSpot.scss';

import parkingSpotImage from './ParkingSpot.svg';

const PIP_WIDTH = 28;

type
Props = {
    spot: object
};
export class ParkingSpot extends React.Component {
    props:Props;

    render () {
        const spotStyle = {
            left: `${this.props.spot.x - PIP_WIDTH / 2}px`,
            top: `${this.props.spot.y - PIP_WIDTH / 2}px`,
            backgroundImage: `url(${parkingSpotImage})`
        };
        console.log('spot: ', classNames.spot);
        return (
            <div key={`spot-${this.props.spot.id}`} className={classNames.spot} style={spotStyle}>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingSpot);
