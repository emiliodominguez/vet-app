import { useCallback, useEffect, useState } from "react";
import { useClients } from "../../contexts/ClientsContext";
import Modal, { useModal } from "../../components/Shared/Modal";
import { clientFields } from "../../shared/constants";
import { className } from "../../shared/helpers";
import Layout from "../../components/Shared/Layout";
import Table from "../../components/Shared/Table";
import styles from "./Clients.module.scss";

export default function ClientsPage() {
	const { clients, saveClient, editClient, softDeleteClient, hardDeleteClient } = useClients();
	const { modalProps, openModal, closeModal } = useModal();
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

	const handleInputChange = useCallback(e => {
		setEditableClient(prev => {
			if (prev) return { ...prev, [e.target.name]: e.target.value };
		});

		setFormError(prev => {
			if (prev) return null;
		});
	}, []);

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
						<button className="btn sm" onClick={() => handleEditClick(client)}>
							Edit
						</button>

						<button className="btn sm danger" onClick={() => softDeleteClient(client.id)}>
							Delete (soft)
						</button>

						<button className="btn sm danger" onClick={() => hardDeleteClient(client.id)}>
							Delete (hard)
						</button>
					</div>
				])}
			/>

			<button {...className("btn", styles.addClientBtn)} onClick={handleAddClick}>
				+ Add client
			</button>

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
											onChange={handleInputChange}
										/>
									</div>
								)
						)}

						{formError && <p className="error">{formError}</p>}

						<input type="submit" value="Submit" className="btn positive" />
					</form>
				</Modal>
			)}
		</Layout>
	);
}
