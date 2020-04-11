import React from 'react';
import Ticker from './Ticker';

const containerStyle = {
	padding: '1rem',
	borderBottom: '1px solid #3a8bba',
	maxWidth: '40rem',
};

const block = {
	display: 'inline-block',
	paddingRight: '1rem',
};

const buttonGroup = {
	display: 'inline-block',
	float: 'right',
};

class Event extends React.Component {
	render() {
		return (
			<div style={containerStyle}>
				<label style={block}>{this.props.event.name}</label>
				<div style={block}>
					<Ticker date={this.props.event.date - Date.now()} />
				</div>
				<div style={buttonGroup}>
					<button
						style={block}
						onClick={() => {
							this.props.deleteEvent(this.props.event.id);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

export default Event;
