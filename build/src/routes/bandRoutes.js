"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createBandController_1 = require("../controllers/Bands/createBandController");
const getBandDetailController_1 = require("../controllers/Bands/getBandDetailController");
const bandRouter = express_1.Router();
exports.default = bandRouter;
bandRouter.post('/create', createBandController_1.createBandController);
bandRouter.get('/:idOrName', getBandDetailController_1.getBandDetailController);
//# sourceMappingURL=bandRoutes.js.map