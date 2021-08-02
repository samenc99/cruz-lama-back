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
const BandDatabase_1 = __importDefault(require("../../data/Band/BandDatabase"));
const User_1 = require("../../model/User");
const Authenticator_1 = require("../../services/Authenticator");
const IdGenerator_1 = require("../../services/IdGenerator");
const CustomError_1 = __importDefault(require("../erros/CustomError"));
class BandBusiness {
    constructor() {
        this.createBand = (token, bandInput) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!bandInput.name || !bandInput.music_genre || !bandInput.responsible) {
                    throw new CustomError_1.default(400, "All fields are required!");
                }
                if (typeof bandInput.name !== "string" ||
                    typeof bandInput.music_genre !== "string" ||
                    typeof bandInput.responsible !== "string") {
                    throw new CustomError_1.default(400, "All fields must be 'string'.");
                }
                const validatedToken = Authenticator_1.tokenValidate(token);
                if (validatedToken.role !== User_1.USER_ROLES.ADMIN) {
                    throw new CustomError_1.default(401, "Only 'ADMIN' can register bands");
                }
                const [bandAlreadyExists] = yield BandDatabase_1.default.selectGeneric("name", {
                    name: bandInput.name,
                });
                console.log("verific se retorna banda", bandAlreadyExists);
                if (bandAlreadyExists) {
                    throw new CustomError_1.default(422, "This band already registred!");
                }
                const band = {
                    id: IdGenerator_1.idGenerator(),
                    name: bandInput.name.toLowerCase(),
                    music_genre: bandInput.music_genre.toLowerCase(),
                    responsible: bandInput.responsible.toLowerCase()
                };
                yield BandDatabase_1.default.insertGeneric(band);
            }
            catch (error) {
                throw new CustomError_1.default(error.statusCode, error.message);
            }
        });
        this.getBandByIdOrName = (idOrName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [bandId] = yield BandDatabase_1.default.selectGeneric("*", {
                    id: idOrName,
                });
                const [bandName] = yield BandDatabase_1.default.selectGeneric("*", {
                    name: idOrName,
                });
                let band = null;
                if (bandId) {
                    band = bandId;
                }
                else if (bandName) {
                    band = bandName;
                }
                if (!bandId && !bandName) {
                    throw new CustomError_1.default(404, "Band not found");
                }
                return band;
            }
            catch (error) {
                throw new CustomError_1.default(error.statusCode, error.message);
            }
        });
    }
}
exports.default = new BandBusiness();
//# sourceMappingURL=BandBusiness.js.map