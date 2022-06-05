import { createContext, useContext, useEffect, useState } from "react";
import petsService from "../services/pets.service";

const PetsContext = createContext();

export function PetsContextProvider(props) {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		petsService
			.getPets()
			.then(setPets)
			.catch(() => console.error("There's been an error fetching pets"));
	}, []);

	return <PetsContext.Provider value={{ pets }}>{props.children}</PetsContext.Provider>;
}

export function usePets() {
	const context = useContext(PetsContext);

	if (!context) throw new Error("usePets must be used within PetsContext");

	return context;
}
