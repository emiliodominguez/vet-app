import Layout from "../../components/Layout";
import { usePets } from "../../contexts/PetsContext";
import "./Pets.module.scss";

export default function PetsPage() {
	const { pets } = usePets();

	return (
		<Layout>
			<h1>The pets page</h1>

			{pets.map((pet) => (
				<p key={pet.id}>{pet.name}</p>
			))}
		</Layout>
	);
}
