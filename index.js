import {program} from "commander";

import * as contactsService from './contacts.js'

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({action, id, ...data}) {
    switch (action) {
        case "list":
            const allContacts = await contactsService.listContacts()
            console.table(allContacts)
            break

        case "get":
            const contacts = await contactsService.getContactById(id)
            console.log(contacts)
            break;

        case "add":
            const {name, email, phone} = data
            const  newContact = contactsService.addContact(name, email, phone)
            console.log( newContact)
            break;

        case "remove":
            const removeId = await contactsService.removeContact(id,data)
            console.log(removeId)
            break;
        case "update":
            const updateId = await contactsService.updateMovieById(id)
            console.log(updateId)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);
