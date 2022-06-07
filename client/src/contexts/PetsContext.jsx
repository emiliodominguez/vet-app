import { createContext, useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import petsService from "../services/pets.service";

const PetsContext = createContext();

export function PetsContextProvider(props) {
	const [pets, setPets] = useState([]);

	const getPets = useCallback(async () => {
		const data = await petsService.getPets().catch(() => {
			throw new Error("There's been an error fetching pets");
		});
		if (data) setPets(data);
	}, []);

	async function getPetsByOwner(clientID) {
		return await petsService.getPetsByClient(clientID).catch(() => {
			throw new Error("There's been an error fetching pets");
		});
	}

	async function getPet(id) {
		return await petsService.getPetById(id).catch(() => {
			throw new Error("There's been an error fetching the pet");
		});
	}

	async function savePet(pet) {
		return await petsService
			.savePet(pet)
			.then(getPets)
			.catch(() => {
				throw new Error("There's been an error saving the pet");
			});
	}

	async function editPet(id, updatedPet) {
		return await petsService
			.editPet(id, updatedPet)
			.then(getPets)
			.catch(() => {
				throw new Error("There's been an error editing the pet");
			});
	}

	async function deletePet(id) {
		return await petsService
			.hardDeletePet(id)
			.then(getPets)
			.catch(() => {
				throw new Error("There's been an error deleting the pet");
			});
	}

	useEffect(() => {
		getPets();
	}, [getPets]);

	return (
		<PetsContext.Provider
			value={{
				pets,
				getPetsByOwner,
				getPet,
				savePet,
				editPet,
				deletePet
			}}
		>
			{props.children}
		</PetsContext.Provider>
	);
}

export function usePets() {
	const context = useContext(PetsContext);

	if (!context) throw new Error("usePets must be used within PetsContext");

	return context;
}

PetsContextProvider.propTypes = {
	children: PropTypes.node
};
