const { v4: uuidv4 } = require("uuid");

const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");

// =================
/**
 * readContacts
 * @returns {Promise<void>}
 */

const readContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

//=================
/**
 * writeContacts
 * @param {string} fileName
 * @param {array <object>} data
 * @returns {Promise<void>}
 */

const writeContacts = async (fileName, data) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(data), "utf8");
  } catch (error) {
    console.log(error.message);
  }
};

//========================
/** listContacts
 * @returns {array<object>}
 */

async function listContacts() {
  const contacts = await readContacts(contactsPath);
  console.table(contacts);
}

// =======================
/**
 * getContactById
 * @param {string} contactId
 * @returns {array<object>}
 */

async function getContactById(contactId) {
  const contacts = await readContacts(contactsPath);
  const contactById = contacts.filter(({ id }) => id === contactId);
  if (!contactById) {
    console.log(`Contact with id: ${contactId} is not found!`);
    return;
  }
  console.table(contactById);
}

// ================
/**
 * removeContact
 * @param {string} contactId
 * @returns {array<object>}
 */

async function removeContact(contactId) {
  const contacts = await readContacts(contactsPath);
  const contactById = contacts.filter(({ id }) => id !== contactId);

  if (!contactById) {
    console.log(`Contact with id: ${contactId} is not found!`);
    return;
  }
  console.log(`Contact removed!`);
  console.table(contactById);
}

// ==============
/**
 * addContact
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @returns {array<object>}
 */

async function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  const contacts = await readContacts(contactsPath);
  const data = [...contacts, newContact];
  writeContacts(contactsPath, data);

  console.log("You add new contact");
  console.table(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
