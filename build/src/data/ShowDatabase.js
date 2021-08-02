"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
class ShowDatabase extends Database_1.default {
    constructor() {
        super('lama_shows');
    }
}
exports.default = new ShowDatabase();
//# sourceMappingURL=ShowDatabase.js.map