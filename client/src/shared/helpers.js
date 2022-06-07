/**
 * A helper function to handle classname conditions easily.
 * Recieves an object containing strings or an object with the CSS class as key
 * and a condition to add or remove it as value.
 *
 * @param classNames - The classnames object
 * @returns The classes separated by a space
 */
export function className(...classNames) {
	const classes = [];

	for (const className of classNames) {
		if (typeof className === "object") {
			for (const key in className) {
				if (className.hasOwnProperty(key) && className[key]) {
					classes.push(key);
				}
			}
		} else {
			classes.push(className);
		}
	}

	return { className: classes.join(" ") };
}