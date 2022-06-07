import { usePets } from "../../contexts/PetsContext";
import { className } from "../../shared/helpers";
import Layout from "../../components/Shared/Layout";
import Table from "../../components/Shared/Table";
import styles from "./Pets.module.scss";

export default function PetsPage() {
	const { pets } = usePets();

	return (
		<Layout className={styles.pets}>
			<h1>Pets</h1>

			<Table
				columns={["Name", "Birth date", "Type", "Breed", "Affection", "Admission date", "Owner", "Actions"]}
				rows={pets.map(pet => [
					pet.name,
					new Date(pet.birth_date).toLocaleDateString(),
					pet.type,
					pet.breed,
					pet.affection,
					new Date(pet.admission_date).toLocaleDateString(),
					pet.owner,
					<div className={styles.rowActions}>
						<button className="btn sm">Edit</button>
						<button className="btn sm danger">Delete (soft)</button>
						<button className="btn sm danger">Delete (hard)</button>
					</div>
				])}
			/>

			<button {...className("btn", styles.addPetBtn)}>+ Add client</button>
		</Layout>
	);
}
