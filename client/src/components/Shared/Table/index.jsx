import PropTypes from "prop-types";
import { className } from "../../../shared/helpers";
import styles from "./Table.module.scss";

export default function Table(props) {
	return (
		<div {...className(styles.container, props.className)}>
			<table className={styles.table}>
				<thead>
					<tr>
						{props.columns.map(element => (
							<th key={element}>{element}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{props.rows.map((row, i) => (
						<tr key={`row_${i}`}>
							{row.map((element, i) => (
								<td key={`element_${i}`}>{element || "-"}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

Table.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	rows: PropTypes.arrayOf(PropTypes.array).isRequired,
	className: PropTypes.string
};
