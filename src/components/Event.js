import React from 'react';
import Ticker from './Ticker';

const containerStyle = {
	padding: '1rem',
	borderBottom: '1px solid #3a8bba',
	maxWidth: '20rem',
};

class Event extends React.Component {
	render() {
		return (
			<div style={containerStyle}>
				<table>
					<tbody>
						<tr>
							<td>{this.props.name}</td>
							<td>
								<Ticker date={this.props.diffInMillis} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Event;
