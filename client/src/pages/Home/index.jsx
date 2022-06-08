import Layout from "../../components/Shared/Layout";
import styles from "./Home.module.scss";

export default function HomePage() {
	return (
		<Layout title="Home" className={styles.home}>
			<div className={styles.image}>
				<img src="./assets/home-bg.jpg" alt="Dogs" />
			</div>

			<div className={styles.content}>
				<h2>
					Pass It On
					<b>¿Backend or Frontend?</b>
				</h2>
			</div>
		</Layout>
	);
}
