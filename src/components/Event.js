import React from 'react';
import Ticker from './Ticker';

const containerStyle = {
	padding: '1rem',
	borderBottom: '1px solid #3a8bba',
	maxWidth: '20rem',
};

const block = {
	display: 'inline-block',
	paddingRight: '1rem',
};

class Event extends React.Component {
	render() {
		return (
			<div style={containerStyle}>
				<label style={block}>{this.props.name}</label>
				<div style={block}>
					<Ticker date={this.props.diffInMillis} />
				</div>
			</div>
		);
	}
}

export default Event;
