import HomePage from "../pages/Home";
import ClientsPage from "../pages/Clients";
import PetsPage from "../pages/Pets";

export const routes = Object.freeze({
	home: { path: "/", label: "Home", element: <HomePage /> },
	clients: { path: "/clients", label: "Clients", element: <ClientsPage /> },
	pets: { path: "/pets", label: "Pets", element: <PetsPage /> }
});
