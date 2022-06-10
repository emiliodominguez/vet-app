import { createContext, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clientsService from "../services/clients.service";

const ClientsContext = createContext();

export function ClientsContextProvider(props) {
	const [clients, setClients] = useState([]);

	const getClients = useCallback(async () => {
		const data = await clientsService.getClients().catch(() => {
			throw new Error("There's been an error fetching clients");
		});
		if (data) setClients(data.filter(x => !!x.is_active));
	}, []);

	async function getClient(id) {
		return await clientsService.getClientById(id).catch(() => {
			throw new Error("There's been an error fetching the client");
		});
	}

	async function saveClient(client) {
		return await clientsService
			.saveClient(client)
			.then(getClients)
			.catch(() => {
				throw new Error("There's been an error saving the client");
			});
	}

	async function editClient(id, updatedClient) {
		return await clientsService
			.editClient(id, updatedClient)
			.then(getClients)
			.catch(() => {
				throw new Error("There's been an error editing the client");
			});
	}

	async function softDeleteClient(id) {
		return await clientsService
			.softDeleteClient(id)
			.then(getClients)
			.catch(() => {
				throw new Error("There's been an error deleting the client");
			});
	}

	async function hardDeleteClient(id) {
		return await clientsService
			.hardDeleteClient(id)
			.then(getClients)
			.catch(() => {
				throw new Error("There's been an error deleting the client");
			});
	}

	useEffect(() => {
		getClients();
	}, [getClients]);

	return (
		<ClientsContext.Provider
			value={{
				clients,
				getClients,
				getClient,
				saveClient,
				editClient,
				softDeleteClient,
				hardDeleteClient
			}}
		>
			{props.children}
		</ClientsContext.Provider>
	);
}

export function useClients() {
	const context = useContext(ClientsContext);

	if (!context) throw new Error("useClients must be used within ClientsContext");

	return context;
}

ClientsContextProvider.propTypes = {
	children: PropTypes.node
};
