"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
const getAllUsers = () => {
    return database_1.users;
};
exports.getAllUsers = getAllUsers;
const createUser = (name, email) => {
    const newUser = { id: (0, uuid_1.v4)(), name, email };
    database_1.users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const getUserById = (id) => {
    return database_1.users.find(user => user.id === id);
};
exports.getUserById = getUserById;
const updateUser = (id, name, email) => {
    const userIndex = database_1.users.findIndex(user => user.id === id);
    if (userIndex === -1)
        return undefined;
    database_1.users[userIndex] = { id, name, email };
    return database_1.users[userIndex];
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const userIndex = database_1.users.findIndex(user => user.id === id);
    if (userIndex === -1)
        return false;
    database_1.users.splice(userIndex, 1);
    return true;
};
exports.deleteUser = deleteUser;
