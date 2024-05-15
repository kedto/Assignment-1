const { randomUUID } = require("node:crypto");
/**
 * @type {Array<{ id: string, phone: number, email: string, name: string, password: string, points: number }>}
 */
const customers = [];

/**
 * @param {{ name: string, phone: number, email: string, password: string }} customer The customer's name, phone number, email, and password.
 */
function addCustomer({ name, phone, email, password }) {
	if (!name || !phone || !email || !password) {
		console.error("Missing required fields.");
		return false;
	}
	if (customers.find((user) => user.phone === phone)) {
		console.error("A user with that phone number already exists.");
		return false;
	}
	if (customers.find((user) => user.email === email)) {
		console.error("A user with that email already exists.");
		return false;
	}
	try {
		const user = {
			id: randomUUID(),
			phone,
			email,
			name,
			password,
			points: 0,
		};
		customers.push(user);
		console.info(
			`Successfully added user ${user.name} (${user.id}) to the database.`,
		);
		return user;
	} catch (err) {
		console.error(err);
		return false;
	}
}
/**
 * @param {string} id The ID of the customer within the database.
 */
function deleteCustomer(id) {
	try {
		const index = customers.findIndex((user) => user.id === id);
		const deleted = customers.splice(index, 1);
		console.info(`Successfully deleted user with ID ${id} from the database.`);
		return deleted[0];
	} catch (err) {
		console.error(err);
		return false;
	}
}
/**
 * @param {{ id?: string, phone?: number, email?: string }} customer Any of the customer's properties to search for.
 */
function getCustomer({ id, phone, email }) {
	try {
		if (id) {
			return customers.find((user) => user.id === id) || false;
		}
		if (phone) {
			return customers.find((user) => user.phone === phone) || false;
		}
		if (email) {
			return customers.find((user) => user.email === email) || false;
		}
		console.error("No valid search criteria provided.");
		return false;
	} catch (err) {
		console.error(err);
		return false;
	}
}

function getCustomers() {
	return customers;
}

/**
 * @param {{ id: string, phone?: number, email?: string, name?: string, password?: string, points?: number }} user Required customer ID and any properties to update.
 */
function updateCustomer({ id, phone, email, name, password, points }) {
	try {
		const user = customers.find((user) => user.id === id);
		if (!user) return false;
		if (phone) user.phone = phone;
		if (email) user.email = email;
		if (name) user.name = name;
		if (password) user.password = password;
		if (points) user.points = points;
		console.info(
			`Successfully updated user ${user.name} (${id}) in the database.`,
		);
		return user;
	} catch (err) {
		console.error(err);
		return false;
	}
}

/**
 * @param {string} id The ID of the customer within the database.
 * @param {number} points The number of points to add.
 */
function addPoints(id, points) {
	try {
		const user = customers.find((user) => user.id === id);
		if (!user) return false;
		user.points += points;
		console.info(
			`Successfully added ${points} points to user ${user.name} (${id}), for a total of ${user.points} points.`,
		);
		return user.points;
	} catch (err) {
		console.error(err);
		return false;
	}
}

/**
 * @param {string} id The ID of the customer within the database.
 * @param {number} points The number of points to remove.
 */
function removePoints(id, points) {
	try {
		const user = customers.find((user) => user.id === id);
		if (!user) return false;
		user.points -= points;
		console.info(
			`Successfully removed ${points} points from user ${user.name} (${id}), for a total of ${user.points} points.`,
		);
		return user.points;
	} catch (err) {
		console.error(err);
		return false;
	}
}

//Test Suite
console.log("============= TEST 1 =============");
console.log(
	'Adding customer John Doe, with phone number 1234567890, email john@doe.io and password "password"...',
);
console.log("Expect: A customer object with the right details");
console.log(
	addCustomer({
		name: "John Doe",
		phone: 1234567890,
		email: "john@doe.io",
		password: "password",
	}),
);

console.log("============= TEST 2 =============");
console.log("Adding a pre-existing phone number and email to the database...");
console.log("Expect: false (twice)");
console.log(
	addCustomer({
		name: "John Doe",
		phone: 1234567890,
		email: "some1@doe.io",
		password: "password",
	}),
);
console.log(
	addCustomer({
		name: "John Doe",
		phone: 2345678901,
		email: "john@doe.io",
		password: "password",
	}),
);

console.log("============= TEST 3 =============");
console.log("Getting customer John Doe from the database by email...");
const customer = getCustomer({ email: "john@doe.io" });
console.log("Getting customer John Doe from the database by phone number...");
console.log("Expect: Two similar customer objects with the right details");
console.log(getCustomer({ phone: 1234567890 }));
console.log(customer);

console.log("============= TEST 4 =============");
console.log("Updating customer John Doe's name to Jane Doe...");
updateCustomer({ id: customer.id, name: "Jane Doe" });
console.log("Updating customer Jane Doe's email to jane@doe.io...");
updateCustomer({ id: customer.id, email: "jane@doe.io" });
console.log("Updating customer Jane Doe's phone number to 10987654321...");
updateCustomer({ id: customer.id, phone: 10987654321 });
console.log("Updating customer Jane Doe's password to 'newpassword'...");
updateCustomer({ id: customer.id, password: "newpassword" });
console.log("Expect: A customer object with the updated details");
console.log(getCustomer({ id: customer.id }));

console.log("============= TEST 5 =============");
console.log("Adding 100 points to Jane Doe's account...");
console.log("Expect: A customer object with the updated details");
addPoints(customer.id, 100);
console.log(getCustomer({ id: customer.id }));

console.log("============= TEST 6 =============");
console.log("Removing 50 points from Jane Doe's account...");
console.log("Expect: A customer object with the updated details");
removePoints(customer.id, 50);
console.log(getCustomer({ id: customer.id }));

console.log("============= TEST 7 =============");
console.log("Deleting customer Jane Doe from the database...");
console.log("Expect: An empty array");
deleteCustomer(customer.id);
console.log("Existing Users:");
console.log(getCustomers());



module.exports = {
	addCustomer,
	addPoints,
	deleteCustomer,
	getCustomer,
	getCustomers,
	removePoints,
	updateCustomer,
};
