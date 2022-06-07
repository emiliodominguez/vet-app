import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span>VET-APP | {new Date().getFullYear()}</span>
		</footer>
	);
}
