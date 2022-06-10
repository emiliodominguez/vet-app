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

/**
 * Searches by name inside an array of entities
 * @param {any[]} target The target array
 * @param {string} text The search text
 * @returns The filtered array
 */
export function searchByName(target, text) {
	return target.filter(pet => pet.name.toLowerCase().includes(text.toLowerCase()));
}

/**
 * Highlights any given text
 * @param {string} string The source text
 * @param {string} stringToHighlight The text to highlight
 * @returns The merged highlighted text
 */
export function highlightText(string, stringToHighlight) {
	const regExp = new RegExp(stringToHighlight, "gi");
	return string.replace(regExp, foundString => `<b class="highlight">${foundString}</b>`);
}

/**
 * Gets an age based on the birth year
 * @param {Date} birthDate The birth date
 * @returns The age
 */
export function getAge(birthDate) {
	const currentYear = new Date().getFullYear();
	return currentYear - new Date(birthDate).getFullYear();
}
