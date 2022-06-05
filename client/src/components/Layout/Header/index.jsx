import { NavLink } from "react-router-dom";
import { routes } from "../../../config/routes";
import "./Header.module.scss";

export default function Header() {
	return (
		<header>
			<nav>
				<ul>
					{Object.entries(routes).map(([key, route]) => (
						<li key={key}>
							<NavLink to={route.path}>{route.label}</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
