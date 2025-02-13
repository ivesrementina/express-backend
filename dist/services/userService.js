"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const UserRepository_1 = require("../repository/implementation/UserRepository");
const userRepository = new UserRepository_1.MySQLUserRepository();
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findAll();
});
exports.getAllUsers = getAllUsers;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.create(data);
});
exports.createUser = createUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findById(id);
});
exports.getUserById = getUserById;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.update(id, data);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.delete(id);
});
exports.deleteUser = deleteUser;
