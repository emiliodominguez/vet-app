import { useEffect, useState, useRef } from "react";
import { usePets } from "../../contexts/PetsContext";
import { useClients } from "../../contexts/ClientsContext";
import Modal, { useModal } from "../../components/Shared/Modal";
import ConfirmationModal, { useConfirmationModal } from "../../components/Shared/ConfirmationModal";
import { petFields } from "../../shared/constants";
import { className } from "../../shared/helpers";
import Layout from "../../components/Shared/Layout";
import Table from "../../components/Shared/Table";
import Button from "../../components/Shared/Button";
import styles from "./Pets.module.scss";

export default function PetsPage() {
	const { pets, getPetsByOwner, getPet, savePet, editPet, deletePet } = usePets();
	const { clients } = useClients();
	const { modalProps, openModal, closeModal } = useModal();
	const { confirmationModalProps, openConfirmationModal, closeConfirmationModal } = useConfirmationModal();
	const [filteredPets, setFilteredPets] = useState(() => pets);
	const [editablePet, setEditablePet] = useState(null);
	const [formError, setFormError] = useState(null);
	const currentYearRef = useRef(new Date().getFullYear());

	function handleAddClick() {
		openModal({ title: "Add pet" });
		setFormError(null);
	}

	function handleEditClick(pet) {
		openModal({ title: `Edit ${pet.name}` });
		setEditablePet(pet);
		setFormError(null);
	}

	function handleDeleteClick(pet) {
		openConfirmationModal({
			title: `Are you sure you want to delete ${pet.name}`,
			confirmText: "Yes",
			cancelText: "Cancel",
			onConfirm: () => {
				deletePet(pet.id);
				closeConfirmationModal();
			},
			onCancel: closeConfirmationModal,
			close: closeConfirmationModal
		});
	}

	function handleInputChange(e) {
		if (!editablePet) return;
		setEditablePet(prev => ({ ...prev, [e.target.name]: e.target.value }));
		setFormError(null);
	}

	function getOwnerName(id) {
		const client = clients.find(client => client.id === id);
		return client ? client.name : "-";
	}

	function getPetAge(birthDate) {
		const age = currentYearRef.current - new Date(birthDate).getFullYear();
		return age ? ` - ${age} year(s)` : "";
	}

	async function handleFormSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const petData = petFields.reduce((acc, field) => ({ ...acc, [field.key]: formData.get(field.key) }), {});

		try {
			if (editablePet) {
				await editPet(editablePet.id, petData).then();
			} else {
				await savePet(petData);
			}

			e.target.reset();
			closeModal();
		} catch (error) {
			setFormError(error.message);
		}
	}

	useEffect(() => {
		setFilteredPets(pets);
	}, [pets]);

	useEffect(() => {
		if (!modalProps) {
			setEditablePet(null);
			setFormError(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalProps]);

	return (
		<Layout className={styles.pets}>
			<h1>Pets</h1>

			{/* Filters section */}
			{/* <div className={styles.filters}></div> */}

			{/* Pets table */}
			<Table
				className={styles.table}
				columns={[...petFields.map(field => field.label), "Actions"]}
				rows={filteredPets.map(pet => [
					pet.name,
					new Date(pet.birth_date).toLocaleDateString() + getPetAge(pet.birth_date),
					pet.type,
					pet.breed,
					pet.affection,
					new Date(pet.admission_date).toLocaleDateString(),
					getOwnerName(pet.owner_id),
					<div className={styles.actions}>
						<Button sm onClick={() => handleEditClick(pet)}>
							Edit
						</Button>

						<Button sm kind="danger" onClick={() => handleDeleteClick(pet)}>
							Delete
						</Button>
					</div>
				])}
			/>

			{/* Add pet button */}
			{clients.length > 0 && (
				<Button className={styles.addPetBtn} onClick={handleAddClick}>
					+ Add pet
				</Button>
			)}

			{/* Set pet form modal */}
			{modalProps && (
				<Modal {...modalProps} close={closeModal}>
					<form {...className("form", styles.form)} onSubmit={handleFormSubmit}>
						{Object.values(petFields).map(
							field =>
								field.inputType && (
									<div key={field.key}>
										<label htmlFor={field.key}>{field.label}</label>

										<input
											name={field.key}
											type={field.inputType}
											placeholder={field.placeholder}
											value={editablePet?.[field.key]}
											onChange={handleInputChange}
										/>
									</div>
								)
						)}

						{clients.length > 0 && (
							<select name="owner_id" value={editablePet?.owner_id ?? ""} onChange={handleInputChange} required>
								{clients.map(client => (
									<option key={client.id} value={client.id}>
										{client.name}
									</option>
								))}
							</select>
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
