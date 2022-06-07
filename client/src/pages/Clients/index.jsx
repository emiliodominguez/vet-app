import { useEffect, useState } from "react";
import { useClients } from "../../contexts/ClientsContext";
import Modal, { useModal } from "../../components/Shared/Modal";
import ConfirmationModal, { useConfirmationModal } from "../../components/Shared/ConfirmationModal";
import { clientFields } from "../../shared/constants";
import Layout from "../../components/Shared/Layout";
import Table from "../../components/Shared/Table";
import Button from "../../components/Shared/Button";
import styles from "./Clients.module.scss";

export default function ClientsPage() {
	const { clients, saveClient, editClient, softDeleteClient, hardDeleteClient } = useClients();
	const { modalProps, openModal, closeModal } = useModal();
	const { confirmationModalProps, openConfirmationModal, closeConfirmationModal } = useConfirmationModal();
	const [editableClient, setEditableClient] = useState(null);
	const [formError, setFormError] = useState(null);

	function handleAddClick() {
		openModal({ title: "Add client" });
		setFormError(null);
	}

	function handleEditClick(client) {
		openModal({ title: "Edit client" });
		setEditableClient(client);
		setFormError(null);
	}

	function handleDeleteClick(client, soft) {
		openConfirmationModal({
			title: `Are you sure you want to delete ${client.name}`,
			confirmText: "Yes",
			cancelText: "No",
			onConfirm: () => {
				soft ? softDeleteClient(client.id) : hardDeleteClient(client.id);
				closeConfirmationModal();
			},
			onCancel: closeConfirmationModal,
			close: closeConfirmationModal
		});
	}

	async function handleFormSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const clientData = clientFields.reduce((acc, field) => ({ ...acc, [field.key]: formData.get(field.key) }), {});

		try {
			if (editableClient) {
				await editClient(editableClient.id, clientData);
			} else {
				await saveClient(clientData);
			}

			e.target.reset();
			closeModal();
		} catch (error) {
			setFormError(error.message);
		}
	}

	useEffect(() => {
		if (!modalProps) {
			setEditableClient(null);
			setFormError(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalProps]);

	return (
		<Layout className={styles.clients}>
			<h1>Clients</h1>

			{/* Clients table */}
			<Table
				className={styles.table}
				columns={[...clientFields.map(field => field.label), "Actions"]}
				rows={clients.map(client => [
					client.name,
					client.email,
					client.age,
					new Date(client.birth_date).toLocaleDateString(),
					client.phone,
					client.address,
					<ul>
						{client.pets?.map(pet => (
							<li key={pet.id}>{pet.name}</li>
						))}
					</ul>,
					<div className={styles.actions}>
						<Button sm onClick={() => handleEditClick(client)}>
							Edit
						</Button>

						<Button sm kind="danger" onClick={() => handleDeleteClick(client, true)}>
							Delete (soft)
						</Button>

						<Button sm kind="danger" onClick={() => handleDeleteClick(client, false)}>
							Delete (hard)
						</Button>
					</div>
				])}
			/>

			{/* Add client button */}
			<Button className={styles.addClientBtn} onClick={handleAddClick}>
				+ Add client
			</Button>

			{/* Set client form modal */}
			{modalProps && (
				<Modal {...modalProps} close={closeModal}>
					<form className="form" onSubmit={handleFormSubmit}>
						{Object.values(clientFields).map(
							field =>
								field.inputType && (
									<div key={field.key}>
										<label htmlFor={field.key}>{field.label}</label>

										<input
											name={field.key}
											type={field.inputType}
											placeholder={field.placeholder}
											value={editableClient?.[field.key]}
											onChange={e => {
												setEditableClient(prev => ({ ...prev, [field.key]: e.target.value }));
												setFormError(null);
											}}
										/>
									</div>
								)
						)}

						{formError && <p className="error">{formError}</p>}

						<Button type="submit" kind="positive">
							Submit
						</Button>
					</form>
				</Modal>
			)}

			{/* Delete confirmation modal */}
			{confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
		</Layout>
	);
}
