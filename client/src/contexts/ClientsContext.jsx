import { createContext, useContext, useEffect, useState } from "react";
import clientsService from "../services/clients.service";

const ClientsContext = createContext();

export function ClientsContextProvider(props) {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		clientsService
			.getClients()
			.then(setClients)
			.catch(() => console.error("There's been an error fetching clients"));
	}, []);

	return <ClientsContext.Provider value={{ clients }}>{props.children}</ClientsContext.Provider>;
}

export function useClients() {
	const context = useContext(ClientsContext);

	if (!context) throw new Error("useClients must be used within ClientsContext");

	return context;
}
