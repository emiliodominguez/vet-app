import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Modal.module.scss";

export default function Modal(props) {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<button className={styles.closeBtn} onClick={props.close}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
					</svg>
				</button>

				{props.title && <h2 className={styles.title}>{props.title}</h2>}
				{props.children}
			</div>
		</div>
	);
}

export function useModal() {
	const [modalProps, setModalProps] = useState(null);

	return {
		modalProps,
		openModal: props => setModalProps(props),
		closeModal: () => setModalProps(null)
	};
}

Modal.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	close: PropTypes.func.isRequired
};
