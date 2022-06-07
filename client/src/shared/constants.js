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

export const petFields = Object.freeze([
	{ key: "name", label: "Name", inputType: "string", placeholder: "Pet's name", required: true },
	{ key: "birth_date", label: "Birth date", inputType: "date", required: true },
	{ key: "type", label: "Type", inputType: "string", placeholder: "Pet's type", required: true },
	{ key: "breed", label: "Breed", inputType: "string", placeholder: "Pet's breed", required: true },
	{ key: "affection", label: "Affection", inputType: "string", placeholder: "Pet's affection", required: true },
	{ key: "admission_date", label: "Admission date", inputType: "date", required: true },
	{ key: "owner_id", label: "Owner", placeholder: "Select the owner of the pet", required: true }
]);
