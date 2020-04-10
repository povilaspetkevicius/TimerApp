import React from 'react';

const inputStyle = {
	textAlign: 'center',
	minWidth: '45%',
};

class DatePicker extends React.Component {
	handleDatepickerChange = (event) => {
		this.props.onDatepickerChange({
			target: {
				type: event.target.type,
				value: event.target.value,
			},
		});
	};
	render() {
		return (
			<div>
				<input
					style={inputStyle}
					type="date"
					onChange={this.handleDatepickerChange}
				></input>
				<input
					style={inputStyle}
					type="time"
					onChange={this.handleDatepickerChange}
				></input>
			</div>
		);
	}
}

export default DatePicker;
