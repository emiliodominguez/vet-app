import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.module.scss";

export default function Layout(props) {
	return (
		<>
			<Header />
			<main className={props.className}>{props.children}</main>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};
