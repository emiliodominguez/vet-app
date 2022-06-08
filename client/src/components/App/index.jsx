import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClientsContextProvider } from "../../contexts/ClientsContext";
import { FiltersContextProvider } from "../../contexts/FiltersContext";
import { PetsContextProvider } from "../../contexts/PetsContext";
import { routes } from "../../shared/routes";
import "./App.module.scss";

export default function App() {
	return (
		<ClientsContextProvider>
			<PetsContextProvider>
				<BrowserRouter>
					<Routes>
						{Object.entries(routes).map(([key, route]) => (
							<Route key={key} path={route.path} element={<FiltersContextProvider>{route.element}</FiltersContextProvider>} />
						))}
					</Routes>
				</BrowserRouter>
			</PetsContextProvider>
		</ClientsContextProvider>
	);
}
