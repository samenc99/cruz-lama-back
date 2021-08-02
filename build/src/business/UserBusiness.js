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
const UserDatabase_1 = __importDefault(require("./../data/User/UserDatabase"));
const User_1 = require("../model/User");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const validateEmail_1 = __importDefault(require("../services/validateEmail"));
const CustomError_1 = __importDefault(require("./erros/CustomError"));
class UserBusiness {
    constructor() {
        this.signup = (signupInput) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!signupInput.name || !signupInput.email || !signupInput.password || !signupInput.role) {
                    throw new CustomError_1.default(400, "All fields are required!");
                }
                if (typeof signupInput.name !== "string" ||
                    !validateEmail_1.default(signupInput.email) ||
                    typeof signupInput.password !== "string" ||
                    typeof signupInput.role !== "string") {
                    throw new CustomError_1.default(400, "All fields must be 'string'.");
                }
                const user = Object.assign(Object.assign({}, signupInput), { role: User_1.toUserRoles(signupInput.role), password: HashManager_1.createHash(signupInput.password), id: IdGenerator_1.idGenerator() });
                yield UserDatabase_1.default.insertGeneric(user);
                return Authenticator_1.tokenGenerator({ id: user.id, role: user.role });
            }
            catch (err) {
                if ((_a = err.sqlMessage) === null || _a === void 0 ? void 0 : _a.includes('Duplicate entry')) {
                    throw new CustomError_1.default(409, 'E-mail already exists.');
                }
                throw new CustomError_1.default(err.statusCode, err.message);
            }
        });
        this.login = (loginInput) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!validateEmail_1.default(loginInput.email) ||
                    !loginInput.password ||
                    typeof loginInput.password !== 'string') {
                    throw new CustomError_1.default(400, 'All fields are required!');
                }
                const [result] = yield UserDatabase_1.default.selectGeneric(['id', 'role', 'password'], { email: loginInput.email });
                if (!result) {
                    throw new CustomError_1.default(404, 'E-mail not found.');
                }
                if (!HashManager_1.compareHash(loginInput.password, result.password)) {
                    throw new CustomError_1.default(401, 'Password is incorrect.');
                }
                return Authenticator_1.tokenGenerator({ id: result.id, role: User_1.toUserRoles(result.role) });
            }
            catch (err) {
                throw new CustomError_1.default(err.statusCode, err.message);
            }
        });
    }
}
exports.default = new UserBusiness();
//# sourceMappingURL=UserBusiness.js.map