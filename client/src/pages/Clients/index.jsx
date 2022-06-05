import Layout from "../../components/Layout";
import { useClients } from "../../contexts/ClientsContext";
import "./Clients.module.scss";

export default function ClientsPage() {
	const { clients } = useClients();

	return (
		<Layout>
			<h1>The clients page</h1>

			{clients.map((client) => (
				<p key={client.id}>{client.name}</p>
			))}
		</Layout>
	);
}
