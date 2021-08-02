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
exports.TicketsBusiness = void 0;
const Tickets_1 = require("../model/Tickets");
const CustomError_1 = __importDefault(require("./erros/CustomError"));
const TicketsDatabase_1 = __importDefault(require("../data/TicketsDatabase"));
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const User_1 = require("../model/User");
class TicketsBusiness {
    constructor() {
        this.createTicket = (input, token) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (typeof token !== 'string') {
                    throw new CustomError_1.default(400, 'Token invalid');
                }
                const payload = Authenticator_1.tokenValidate(token);
                if (payload.role !== User_1.USER_ROLES.ADMIN) {
                    throw new CustomError_1.default(403, "Only admin can create ticket.");
                }
                if (!input.name || !input.showId ||
                    isNaN(input.value) || isNaN(input.ticketsQuantity)) {
                    throw new CustomError_1.default(400, "All fields are required!");
                }
                if (input.value <= 0 || input.ticketsQuantity <= 0) {
                    throw new CustomError_1.default(400, 'Value ou ticketsQuantity needs to be greater than zero.');
                }
                const ticketData = Tickets_1.toTicketsData(input, IdGenerator_1.idGenerator());
                yield TicketsDatabase_1.default.insertGeneric(ticketData);
            }
            catch (err) {
                if ((_a = err.sqlMessage) === null || _a === void 0 ? void 0 : _a.includes('Duplicate entry')) {
                    throw new CustomError_1.default(409, 'Ticket already registered.');
                }
                else if ((_b = err.message) === null || _b === void 0 ? void 0 : _b.includes('jwt expired')) {
                    throw new CustomError_1.default(403, 'Token expired.');
                }
                else if ((_c = err.message) === null || _c === void 0 ? void 0 : _c.includes('jwt invalid')) {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                throw new CustomError_1.default(err.statusCode || 500, err.message || 'Internal server error.');
            }
        });
        this.buyTicket = (input, token) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e;
            try {
                if (typeof token !== "string") {
                    throw new CustomError_1.default(400, 'Token invalid');
                }
                Authenticator_1.tokenValidate(token);
                if (!input.name || typeof input.name !== "string") {
                    throw new CustomError_1.default(400, 'Property name is required.');
                }
                if (isNaN(input.ticketsQuantity) || input.ticketsQuantity <= 0) {
                    throw new CustomError_1.default(400, 'Property quantityTickets is required and needs to be greater than zero.');
                }
                const [result] = yield TicketsDatabase_1.default.selectGeneric(['id', 'tickets_quantity', 'tickets_purchased'], { name: input.name });
                if (!result) {
                    throw new CustomError_1.default(404, 'Show not found.');
                }
                if ((result.tickets_quantity - result.tickets_purchased) < input.ticketsQuantity) {
                    throw new CustomError_1.default(403, 'Insufficient tickets');
                }
                yield TicketsDatabase_1.default.updateGeneric({ tickets_purchased: result.tickets_purchased + input.ticketsQuantity }, { id: result.id });
            }
            catch (err) {
                if ((_d = err.message) === null || _d === void 0 ? void 0 : _d.includes('jwt expired')) {
                    throw new CustomError_1.default(403, 'Token expired.');
                }
                else if ((_e = err.message) === null || _e === void 0 ? void 0 : _e.includes('jwt invalid')) {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                throw new CustomError_1.default(err.statusCode || 500, err.message || 'Internal server error.');
            }
        });
    }
}
exports.TicketsBusiness = TicketsBusiness;
exports.default = new TicketsBusiness();
//# sourceMappingURL=TicketsBusiness.js.map