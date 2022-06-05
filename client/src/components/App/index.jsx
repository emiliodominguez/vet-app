import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClientsContextProvider } from "../../contexts/ClientsContext";
import { PetsContextProvider } from "../../contexts/PetsContext";
import { routes } from "../../config/routes";
import "./App.module.scss";

export default function App() {
	return (
		<ClientsContextProvider>
			<PetsContextProvider>
				<BrowserRouter>
					<Routes>
						{Object.entries(routes).map(([key, route]) => (
							<Route
								key={key}
								path={route.path}
								element={route.element}
							/>
						))}
					</Routes>
				</BrowserRouter>
			</PetsContextProvider>
		</ClientsContextProvider>
	);
}
