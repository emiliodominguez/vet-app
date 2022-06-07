import PropTypes from "prop-types";
import { className } from "../../../shared/helpers";
import styles from "./Button.module.scss";

export default function Button(props) {
	return (
		<button
			{...className(styles.btn, styles[props.kind], props.className, { [styles.sm]: props.sm })}
			type={props.type}
			title={props.title}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	kind: PropTypes.oneOf(["positive", "warning", "danger"]),
	sm: PropTypes.bool,
	type: PropTypes.string,
	title: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
};
