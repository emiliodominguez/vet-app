import { Helmet, HelmetData } from "react-helmet-async";
import PropTypes from "prop-types";
import { className } from "../../../shared/helpers";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

const helmetData = new HelmetData({});

export default function Layout(props) {
	return (
		<>
			<Helmet helmetData={helmetData}>
				<title>VET-APP {props.title ? `- ${props.title}` : ""}</title>
				{props.description && <meta name="description" content={props.description} />}
			</Helmet>

			<Header />

			<main {...className(styles.main, props.className)}>{props.children}</main>

			<Footer />
		</>
	);
}

Layout.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node
};
