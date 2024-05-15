# Loyalty Program

## Highlights

- Function parameters type-hinted using [JSDoc](https://jsdoc.app/)

## Functions

- Add, remove, manage and retrieve customers from the database
- Add and remove loyalty points from a customer

## Usage

_To use this module, clone this repository within your project and import it as shown below._

```bash
git clone https://github.com/kedto/loyalty.git
```

```js
const {
  addCustomer,
  addPoints,
  deleteCustomer,
  getCustomer,
  getCustomers,
  removePoints,
  updateCustomer,
} = require("./loyalty/kenneth_loyaltyprogram.js");
```

### `addCustomer`

**Description:** Adds a customer to the database after checking for pre-existing registrations with the same email or phone number.  
**Input:** An object with the following properties:

- `name` (string, required) - the name of the customer
- `phone` (number, required) - the phone number of the customer  
  format: `<countrycode><number>`, e.g. `6581188446`
- `email` (string, required) - the email of the customer
- `password` (string, required) - the customer's password

**Output:** The user object if the operation was successful, and `false` if the operation failed.

**Example:**

```js
addCustomer({
  name: "Kenneth Ho",
  phone: 6581188446,
  email: "223835E@mymail.nyp.edu.sg",
  password: "very-secure-passw0rd!",
});
// Returns the customer object if there is no customer with the same phone number or email in the database, otherwise returns false. Customer IDs are random UUIDv4s.
```

### `deleteCustomer`

**Description:** Removes a customer from the database  
**Input:** A string containing the ID of the customer (required)  
**Output:** The deleted user object if the operation was successful, and `false` if the operation failed.

**Example:**

```js
// This UUID is purely an example. Get a customer's UUID from the database.
deleteCustomer("1e4bbb38-49c0-4090-9cc9-49d543b4904a");
// Returns the deleted customer object, or false if the user is not found.
```

### `getCustomer`

**Description:** Gets information about a customer from the database.  
**Input:** An object with **any one of the following properties**:

- `id` (string) - the customer's ID within the database
- `phone` (number) - the customer's phone number within the database
- `email` (string) - the customer's email address within the database

**Output:** A customer object if the operation was successful, and `false` if the operation failed

**Example:**

```js
getCustomer({
  phone: 6581188446,
});
// Returns a customer object, or false if the user is not found.
```

### `getCustomers`

**Description:** Returns all customers in an array.
**Input:** None
**Output:** An array containing all customers

**Example:**

```js
getCustomers();
// Returns an array containing all customer objects.
```

### `updateCustomer`

**Description:** Update a customer's information in the database.  
**Input:** An object with the following properties:

- `id` (string, required) - the customer's ID within the database
- `phone` (number) - the customer's new phone number
- `email` (string) - the customer's new email address
- `name` (string) - the customer's new name
- `password` (string) - the customer's new password
- `points` (number) - the customer's new number of points

**Output:** The updated customer object, or `false` if the operation failed.

**Example:**

```js
// This UUID is purely an example. Get a customer's UUID from the database.
updateCustomer({
  id: "1e4bbb38-49c0-4090-9cc9-49d543b4904a",
  name: "Ketho",
});
// Returns the updated user object if the user was found, otherwise returns false.
```

### `addPoints`

**Description:** Adds loyalty points to a customer.  
**Input:** The ID of the customer, and the number of points to add.  
**Output:** The number of points the user has after the operation, or `false` if the user was not found.

**Example:**

```js
// This UUID is purely an example. Get a customer's UUID from the database.
addPoints("1e4bbb38-49c0-4090-9cc9-49d543b4904a", 100);
// Returns the user's new points value if the user was found, or false if the user was not found.
```

### `removePoints`

**Description:** Removes loyalty points from a customer.
**Input:** The ID of the customer, and the number of points to remove.  
**Output:** The number of points the user has after the operation, or `false` if the user was not found.

**Example:**

```js
// This UUID is purely an example. Get a customer's UUID from the database.
removePoints("1e4bbb38-49c0-4090-9cc9-49d543b4904a", 50);
// Returns the user's new points value if the user was found, or false if the user was not found.
```

### Full Test Suite

```js
const {
  addCustomer,
  addPoints,
  deleteCustomer,
  getCustomer,
  getCustomers,
  removePoints,
  updateCustomer,
} = require("./kenneth_loyaltyprogram.js");

console.log("============= TEST 1 =============");
console.log(
  'Adding customer John Doe, with phone number 1234567890, email john@doe.io and password "password"...'
);
console.log("Expect: A customer object with the right details");
console.log(
  addCustomer({
    name: "John Doe",
    phone: 1234567890,
    email: "john@doe.io",
    password: "password",
  })
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
  })
);
console.log(
  addCustomer({
    name: "John Doe",
    phone: 2345678901,
    email: "john@doe.io",
    password: "password",
  })
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
console.log(getCustomers());
```
