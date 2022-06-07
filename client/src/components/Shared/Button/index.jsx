import PropTypes from "prop-types";
import { className } from "../../../shared/helpers";
import styles from "./Button.module.scss";

export default function Button(props) {
	return (
		<button type={props.type} {...className(styles.btn, styles[props.kind], props.className, { [styles.sm]: props.sm })} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	kind: PropTypes.oneOf(["positive", "warning", "danger"]),
	sm: PropTypes.bool,
	type: PropTypes.string,
	onClick: PropTypes.func
};
