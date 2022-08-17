import { Schema } from "mongoose";
import db from "./db";

export type valueContact = {
    type: string,
    value: string
}
export type dataModel = {
    name: string, valueContact: valueContact 
}

export type response_object_people = {
    name: string,
    valueContact: valueContact,
    _id: string,
}

const ModelPeople = db.model("people", new Schema({
    name: { type: String, default: "" },
    valueContact: {
        type: Object, defualt: {
            type: "email",
            value: ""
        }
    }
}, {
    timestamps: true
}));

const newPeopleContact = async (data: dataModel): Promise<response_object_people> => {
    try {
        const resultMongo = await ModelPeople.create(data);
        return {
            _id: resultMongo.id as string,
            name: resultMongo.name,
            valueContact: resultMongo.valueContact,
        }
    } catch (error) {
        console.log(error);
        return {} as response_object_people;
    }
}

const findAllContacts = async (): Promise<response_object_people[]> => {
    try {
        return (await ModelPeople.find()).map(contact => {
            return {
                _id: contact.id as string,
                name: contact.name,
                valueContact: contact.valueContact
            }
        });
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default { newPeopleContact, findAllContacts }