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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const createTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Database_1.default.connection.raw(`
      CREATE TABLE IF NOT EXISTS lama_bands (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL 
      );
      CREATE TABLE IF NOT EXISTS lama_shows (
         id VARCHAR(255) PRIMARY KEY,
         week_day VARCHAR(255) NOT NULL,
         start_time INT NOT NULL,
         end_time INT NOT NULL,
         photo text,
         band_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(band_id) REFERENCES lama_bands(id)
      );
      CREATE TABLE IF NOT EXISTS lama_users (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         role VARCHAR(255) NOT NULL DEFAULT 'NORMAL'
      );
      create table if not exists lama_tickets (
        id varchar(255) primary key ,
        name varchar(255) not null ,
        value float not null ,
        tickets_quantity int not null ,
        tickets_purchased int default 0,
        show_id varchar(255),
        foreign key (show_id) references lama_shows(id)
      );
    `);
        res.status(200).send({ message: 'ok' });
    }
    catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message || err.sqlMessage });
    }
});
exports.default = createTables;
//# sourceMappingURL=createTables.js.map