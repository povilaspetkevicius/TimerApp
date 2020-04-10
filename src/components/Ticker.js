import React from 'react';
class Ticker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: this.props.date,
			difference: 0,
		};
		this.updateTimer = this.updateTimer.bind(this);
	}

	updateTimer = () => {
		this.timer = setInterval(() => {
			this.setState({
				difference: this.state.time - Date.now(),
			});
		}, 1);
	};

	formatDate = (diff) => {
		let days = Math.floor(diff / 86400000);
		let hours = Math.floor((diff % 86400000) / 3600000);
		let minutes = Math.floor((diff % 3600000) / 60000);
		let seconds = Math.floor((diff % 60000) / 1000);

		return `${days}d:${hours}h:${minutes}m:${seconds}`;
	};

	render() {
		this.updateTimer();

		return (
			<div>
				<div>{this.formatDate(this.props.date)}</div>
			</div>
		);
	}
}

export default Ticker;
