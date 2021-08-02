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
exports.getBandDetailController = void 0;
const BandBusiness_1 = __importDefault(require("../../business/Bands/BandBusiness"));
const getBandDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idOrName } = req.params;
        const band = yield BandBusiness_1.default.getBandByIdOrName(idOrName);
        res.status(200).send({ band });
    }
    catch (error) {
        res.status(error.statusCode || 500).send({ error: error.message });
    }
});
exports.getBandDetailController = getBandDetailController;
//# sourceMappingURL=getBandDetailController.js.map