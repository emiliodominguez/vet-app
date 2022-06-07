import { NavLink } from "react-router-dom";
import { routes } from "../../../../shared/routes";
import styles from "./Header.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<a href="/" className={styles.navBadge}>
				<h1>Vet-App</h1>
			</a>

			<div className={styles.navMenu}>
				<input type="checkbox" />

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
				</svg>

				<nav>
					<ul>
						{Object.entries(routes).map(([key, route]) => (
							<li key={key}>
								<NavLink to={route.path}>{route.label}</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
