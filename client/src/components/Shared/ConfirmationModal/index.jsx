import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import Button from "../Button";
import styles from "./ConfirmationModal.module.scss";

export default function ConfirmationModal(props) {
	return (
		<Modal className={styles.modal} title={props.title ?? "Do you want to continue?"} close={props.close}>
			<div className={styles.actions}>
				<Button onClick={props.onCancel} kind="danger">
					{props.cancelText ?? "Cancel"}
				</Button>

				<Button onClick={props.onConfirm} kind="positive">
					{props.confirmText ?? "Confirm"}
				</Button>
			</div>
		</Modal>
	);
}

export function useConfirmationModal() {
	const [confirmationModalProps, setConfirmationModalProps] = useState(null);

	return {
		confirmationModalProps,
		openConfirmationModal: props => setConfirmationModalProps(props),
		closeConfirmationModal: () => setConfirmationModalProps(null)
	};
}

ConfirmationModal.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func
};
