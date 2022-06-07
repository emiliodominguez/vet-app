import PropTypes from "prop-types";
import { className } from "../../../shared/helpers";

export default function Button(props) {
	return (
		<button {...className("btn", props.kind, { sm: props.sm })} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	kind: PropTypes.oneOf(["positive", "warning", "danger"]),
	sm: PropTypes.bool,
	onClick: PropTypes.func
};
