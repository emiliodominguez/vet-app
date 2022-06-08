import { Link } from "react-router-dom";
import { routes } from "../../shared/routes";
import Layout from "../../components/Shared/Layout";
import styles from "./Home.module.scss";

export default function HomePage() {
	return (
		<Layout className={styles.home}>
			<div className={styles.image}>
				<img src="./assets/home-bg.jpg" alt="Dogs" />
			</div>

			<div className={styles.content}>
				<h2>
					Pass It On! <b>¿Backend or Frontend?</b>
				</h2>

				<Link to={routes.clients.path} className="btn">
					Go to clients
				</Link>
			</div>
		</Layout>
	);
}
