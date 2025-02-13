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
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            const [result] = yield database_1.pool.query(query, [data.name, data.email, data.password]);
            return Object.assign({ id: result.insertId }, data);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.pool.query("SELECT * FROM users");
            return rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.pool.query("SELECT * FROM users WHERE id = ?", [id]);
            const users = rows;
            return users.length > 0 ? users[0] : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query("UPDATE users SET ? WHERE id = ?", [data, id]);
            return this.findById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.pool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        });
    }
}
exports.MySQLUserRepository = MySQLUserRepository;
