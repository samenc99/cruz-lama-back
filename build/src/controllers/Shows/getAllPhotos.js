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
const ShowBusiness_1 = __importDefault(require("../../business/ShowBusiness"));
const getAllPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield ShowBusiness_1.default.getAllPhotos(req.headers.authorization);
        res.status(200).send({ photos });
    }
    catch (err) {
        res.status(err.statusCode || 400).send({ message: err.message || err.sqlMessage });
    }
});
exports.default = getAllPhotos;
//# sourceMappingURL=getAllPhotos.js.map