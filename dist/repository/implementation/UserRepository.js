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
exports.MySQLUserRepository = void 0;
const database_1 = require("../../config/database");
class MySQLUserRepository {
    // 🟢 Create User
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO users (first_name, middle_name, last_name, name_ext, email, password) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
            const [result] = yield database_1.pool.query(query, [
                data.first_name,
                data.middle_name,
                data.last_name,
                data.name_ext,
                data.email,
                data.password
            ]);
            return Object.assign({ id: result.insertId }, data);
        });
    }
    // 🟡 Get All Users
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.pool.query("SELECT * FROM users");
            return rows;
        });
    }
    // 🟠 Get User by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.pool.query("SELECT * FROM users WHERE id = ?", [id]);
            const users = rows;
            return users.length > 0 ? users[0] : null;
        });
    }
    // 🟠 Update User
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      UPDATE users 
      SET first_name = ?, middle_name = ?, last_name = ?, name_ext = ?, email = ?, password = ?
      WHERE id = ?
    `;
            yield database_1.pool.query(query, [
                data.first_name,
                data.middle_name,
                data.last_name,
                data.name_ext,
                data.email,
                data.password,
                id
            ]);
            return this.findById(id);
        });
    }
    // 🔴 Delete User
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.pool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        });
    }
}
exports.MySQLUserRepository = MySQLUserRepository;
