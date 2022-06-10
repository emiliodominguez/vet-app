import { useEffect, useState, useRef } from "react";
import { useClients } from "../../contexts/ClientsContext";
import { useFilters } from "../../contexts/FiltersContext";
import Modal, { useModal } from "../../components/Shared/Modal";
import ConfirmationModal, { useConfirmationModal } from "../../components/Shared/ConfirmationModal";
import { clientFields } from "../../shared/constants";
import { getAge, highlightText, searchByName } from "../../shared/helpers";
import Layout from "../../components/Shared/Layout";
import Table from "../../components/Shared/Table";
import Button from "../../components/Shared/Button";
import styles from "./Clients.module.scss";

export default function ClientsPage() {
	const { clients, saveClient, editClient, softDeleteClient, hardDeleteClient } = useClients();
	const { filters, search, clearFilters: clearFiltersCtx } = useFilters();
	const { modalProps, openModal, closeModal } = useModal();
	const { confirmationModalProps, openConfirmationModal, closeConfirmationModal } = useConfirmationModal();
	const [filteredClients, setFilteredClients] = useState([]);
	const [editableClient, setEditableClient] = useState(null);
	const [formError, setFormError] = useState(null);

	function clearFilters() {
		clearFiltersCtx();
		setFilteredClients(clients);
	}

	function handleAddClick() {
		openModal({ title: "Add client" });
		setFormError(null);
	}

	function handleEditClick(client) {
		openModal({ title: `Edit ${client.name}` });
		setEditableClient(client);
		setFormError(null);
	}

	function handleDeleteClick(client, soft) {
		openConfirmationModal({
			title: `Are you sure you want to ${soft ? "disable" : "delete"} ${client.name}`,
			confirmText: "Yes",
			cancelText: "Cancel",
			onConfirm: () => {
				soft ? softDeleteClient(client.id) : hardDeleteClient(client.id);
				closeConfirmationModal();
			},
			onCancel: closeConfirmationModal,
			close: closeConfirmationModal
		});
	}

	function handleFormInputChange(e) {
		setEditableClient(prev => ({ ...prev, [e.target.name]: e.target.value }));
		setFormError(null);
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
		setFilteredClients(clients);
	}, [clients]);

	useEffect(() => {
		setFilteredClients(searchByName(clients, filters.searchText));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters.searchText]);

	useEffect(() => {
		return () => clearFilters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout title="Clients" className={styles.clients}>
			<h1>Clients</h1>

			{/* Filters section */}
			<div className={styles.filters}>
				<input type="search" placeholder="Search clients..." value={filters.searchText} onChange={e => search(e.target.value)} />

				<Button type="submit" kind="danger" sm onClick={clearFilters}>
					Clear filters
				</Button>
			</div>

			{/* Clients table */}
			<Table
				className={styles.table}
				columns={[...clientFields.map(field => field.label), "Actions"]}
				rows={filteredClients.map(client => [
					<p dangerouslySetInnerHTML={{ __html: highlightText(client.name, filters.searchText) }} />,
					client.email,
					getAge(client.birth_date),
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

						<Button sm kind="warning" onClick={() => handleDeleteClick(client, true)}>
							Disable
						</Button>

						<Button
							sm
							kind="danger"
							onClick={() => handleDeleteClick(client, false)}
							disabled={!!client.pets.length}
							title={client.pets.length ? "You can't delete a user who has assigned pets" : undefined}
						>
							Delete
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
				<Modal
					{...modalProps}
					close={() => {
						setEditableClient(null);
						setFormError(null);
						closeModal();
					}}
				>
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
											onChange={handleFormInputChange}
										/>
									</div>
								)
						)}

						{formError && <p className="error">{formError}</p>}

						<Button type="submit" kind="positive" disabled={!!formError}>
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
