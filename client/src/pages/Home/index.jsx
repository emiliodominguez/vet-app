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
				<h2>Lorem ipsum dolor sit amet consectetur</h2>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero dolores autem unde pariatur cum ipsa! Reprehenderit voluptatibus,
					veniam inventore nulla adipisci distinctio totam saepe deserunt soluta nostrum natus quidem aut quos, corporis recusandae dolorem
					rerum tempora ullam!
				</p>

				<Link to={routes.clients.path} className="btn">
					Go to clients
				</Link>
			</div>
		</Layout>
	);
}
