import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const FiltersContext = createContext();

export function FiltersContextProvider(props) {
	const [filters, setFilters] = useState({ searchText: "", owner: null });

	function search(searchText) {
		setFilters(prev => ({ ...prev, searchText }));
	}

	function filterPetsByOwner(id) {
		setFilters(prev => ({ ...prev, owner: id }));
	}

	function clearFilters(callback) {
		setFilters({ searchText: "", owner: null });
		callback?.();
	}

	return (
		<FiltersContext.Provider
			value={{
				filters,
				search,
				filterPetsByOwner,
				clearFilters
			}}
		>
			{props.children}
		</FiltersContext.Provider>
	);
}

export function useFilters() {
	const context = useContext(FiltersContext);

	if (!context) throw new Error("useFilters must be used within FiltersContext");

	return context;
}

FiltersContextProvider.propTypes = {
	children: PropTypes.node
};
