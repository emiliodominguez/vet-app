import PropTypes from "prop-types";
import { className } from "../../../shared/helpers";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

export default function Layout(props) {
	return (
		<>
			<Header />
			<main {...className(styles.main, props.className)}>{props.children}</main>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};
