"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createShow_1 = __importDefault(require("../controllers/Shows/createShow"));
const getShows_1 = __importDefault(require("../controllers/Shows/getShows"));
const createTicket_1 = __importDefault(require("../controllers/Tickets/createTicket"));
const buyTicket_1 = __importDefault(require("../controllers/Tickets/buyTicket"));
const addPhoto_1 = __importDefault(require("../controllers/Shows/addPhoto"));
const getAllPhotos_1 = __importDefault(require("../controllers/Shows/getAllPhotos"));
const showRouter = express_1.Router();
exports.default = showRouter;
showRouter.get('/photo', getAllPhotos_1.default);
showRouter.get('/:weekDay', getShows_1.default);
showRouter.post('/create', createShow_1.default);
showRouter.post('/ticket', createTicket_1.default);
showRouter.put('/ticket', buyTicket_1.default);
showRouter.put('/photo/:idShow', addPhoto_1.default);
//# sourceMappingURL=showRouter.js.map