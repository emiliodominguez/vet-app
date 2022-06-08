import { useEffect, useState, useRef } from "react";
import { usePets } from "../../contexts/PetsContext";
import { useClients } from "../../contexts/ClientsContext";
import { useFilters } from "../../contexts/FiltersContext";
import Modal, { useModal } from "../../components/Shared/Modal";
import ConfirmationModal, { useConfirmationModal } from "../../components/Shared/ConfirmationModal";
import { petFields } from "../../shared/constants";
import { className, highlightText, searchByName } from "../../shared/helpers";
import Layout from "../../components/Shared/Layout";
import Table from "../../components/Shared/Table";
import Button from "../../components/Shared/Button";
import OwnersSelect from "./OwnersSelect";
import styles from "./Pets.module.scss";

export default function PetsPage() {
	const { pets, getPetsByOwner, savePet, editPet, deletePet } = usePets();
	const { clients } = useClients();
	const { filters, search, filterPetsByOwner, clearFilters: clearFiltersCtx } = useFilters();
	const { modalProps, openModal, closeModal } = useModal();
	const { confirmationModalProps, openConfirmationModal, closeConfirmationModal } = useConfirmationModal();
	const [filteredPets, setFilteredPets] = useState(pets);
	const [editablePet, setEditablePet] = useState(null);
	const [formError, setFormError] = useState(null);
	const currentYearRef = useRef(new Date().getFullYear());

	function clearFilters() {
		clearFiltersCtx();
		setFilteredPets(pets);
	}

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

	function handleFormInputChange(e) {
		if (!editablePet) return;
		setEditablePet(prev => ({ ...prev, [e.target.name]: e.target.value }));
		setFormError(null);
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

	function getOwnerName(id) {
		const client = clients.find(client => client.id === id);
		return client ? client.name : "-";
	}

	function getPetAge(birthDate) {
		const age = currentYearRef.current - new Date(birthDate).getFullYear();
		return age ? ` - ${age} year(s)` : "";
	}

	useEffect(() => {
		if (filters.owner) {
			getPetsByOwner(filters.owner).then(data => {
				const filtered = pets.reduce((acc, pet) => {
					if (data.find(x => x.id === pet.id)) {
						acc.push(pet);
					}

					return filters.searchText ? searchByName(acc, filters.searchText) : acc;
				}, []);

				setFilteredPets(filtered);
			});
		}

		setFilteredPets(searchByName(pets, filters.searchText));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	useEffect(() => {
		return () => clearFilters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout title="Pets" className={styles.pets}>
			<h1>Pets</h1>

			{/* Filters section */}
			<div className={styles.filters}>
				<input type="search" placeholder="Search pets..." value={filters.searchText} onChange={e => search(e.target.value)} />

				{clients.length > 0 && (
					<OwnersSelect
						clients={clients}
						value={filters.owner}
						placeholder="Filter by owner"
						onChange={e => filterPetsByOwner(e.target.value)}
					/>
				)}

				<Button type="submit" kind="danger" sm onClick={clearFilters}>
					Clear filters
				</Button>
			</div>

			{/* Pets table */}
			<Table
				className={styles.table}
				columns={[...petFields.map(field => field.label), "Actions"]}
				rows={filteredPets.map(pet => [
					<p dangerouslySetInnerHTML={{ __html: highlightText(pet.name, filters.searchText) }} />,
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
				<Modal
					{...modalProps}
					close={closeModal}
					onClose={() => {
						setEditablePet(null);
						setFormError(null);
					}}
				>
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
											onChange={handleFormInputChange}
										/>
									</div>
								)
						)}

						{clients.length > 0 && (
							<OwnersSelect
								name="owner_id"
								clients={clients}
								value={editablePet?.owner_id ?? ""}
								onChange={handleFormInputChange}
								required
							/>
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
