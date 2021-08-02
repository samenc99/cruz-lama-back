"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor(tableName) {
        this.tableName = tableName;
        this.selectGeneric = (aliases, where = {}) => {
            return Database.connection(this.tableName)
                .select(aliases)
                .where(where);
        };
        this.insertGeneric = (data) => {
            return Database.connection(this.tableName)
                .insert(data);
        };
        this.deleteGeneric = (where) => {
            return Database.connection(this.tableName)
                .delete()
                .where(where);
        };
        this.updateGeneric = (data, where) => {
            return Database.connection(this.tableName)
                .update(data)
                .where(where);
        };
    }
}
exports.default = Database;
Database.connection = knex_1.default({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        port: Number(process.env.DB_PORT),
        multipleStatements: true
    }
});
//# sourceMappingURL=Database.js.map