export const apiUrl = "http://127.0.0.1:8000";

export const clientFields = Object.freeze([
	{ key: "name", label: "Name", inputType: "string", placeholder: "Client's name", required: true },
	{ key: "email", label: "Email", inputType: "email", placeholder: "Client's email", required: true },
	{ key: "age", label: "Age", inputType: "number", placeholder: "Client's age", required: true },
	{ key: "birth_date", label: "Birth date", inputType: "date", required: true },
	{ key: "phone", label: "Phone", inputType: "tel", placeholder: "Client's phone", required: true },
	{ key: "address", label: "Address", inputType: "string", placeholder: "Client's address", required: true },
	{ key: "pets", label: "Pets" }
]);
