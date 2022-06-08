import PropTypes from "prop-types";

export default function OwnersSelect(props) {
	return (
		<select name={props.name} value={props.value ?? "-1"} onChange={props.onChange} required={props.required}>
			{props.placeholder && (
				<option value="-1" disabled hidden>
					{props.placeholder}
				</option>
			)}

			<option value="">All</option>

			{props.clients.map(client => (
				<option key={client.id} value={client.id}>
					{client.name}
				</option>
			))}
		</select>
	);
}

OwnersSelect.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	clients: PropTypes.array,
	onChange: PropTypes.func,
	required: PropTypes.bool
};
