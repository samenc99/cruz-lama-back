"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
class UserDatabase extends Database_1.default {
    constructor() {
        super('lama_users');
    }
}
exports.default = new UserDatabase();
//# sourceMappingURL=UserDatabase.js.map