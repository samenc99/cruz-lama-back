"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ShowDatabase_1 = __importDefault(require("../data/ShowDatabase"));
const CustomError_1 = __importDefault(require("./erros/CustomError"));
const ValidateInputDate_1 = __importStar(require("../services/ValidateInputDate"));
const IdGenerator_1 = require("../services/IdGenerator");
const BandBusiness_1 = __importDefault(require("./Bands/BandBusiness"));
const Authenticator_1 = require("../services/Authenticator");
const User_1 = require("../model/User");
class ShowBusiness {
    constructor() {
        this.addShow = (input, token) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!token || typeof token !== 'string') {
                    throw new CustomError_1.default(400, 'Token invalid');
                }
                Authenticator_1.tokenValidate(token);
                if (!input.weekDay || !input.startTime || !input.endTime || !input.bandId) {
                    throw new CustomError_1.default(400, 'All fields are required!');
                }
                const date = new ValidateInputDate_1.ValidateInputDate(input.weekDay, input.startTime, input.endTime);
                const valideDate = date.validateDate();
                yield BandBusiness_1.default.getBandByIdOrName(input.bandId);
                yield this.getShows(input.weekDay, ['start_time', 'end_time'])
                    .then(shows => {
                    for (const show of shows) {
                        date.validateShowDate(show.start_time, show.end_time);
                    }
                }).catch(err => {
                    if (err.message !== 'There are no shows on this day.') {
                        throw new CustomError_1.default(500, err.message);
                    }
                    console.log(err.message);
                });
                const showData = Object.assign(Object.assign({}, valideDate), { band_id: input.bandId, id: IdGenerator_1.idGenerator() });
                yield ShowDatabase_1.default.insertGeneric(showData);
            }
            catch (err) {
                if ((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes('jwt expired')) {
                    throw new CustomError_1.default(403, 'Token expired.');
                }
                else if ((_b = err.message) === null || _b === void 0 ? void 0 : _b.includes('jwt invalid')) {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                throw new CustomError_1.default(err.statusCode, err.sqlMessage || err.message);
            }
        });
        this.getShows = (weekDay, aliases) => __awaiter(this, void 0, void 0, function* () {
            ValidateInputDate_1.default.validateDay(weekDay);
            const result = yield ShowDatabase_1.default.selectGeneric(aliases || ['name', 'music_genre'], { week_day: weekDay }).join('lama_bands', 'lama_bands.id', 'lama_shows.band_id')
                .orderBy('start_time', 'asc');
            if (result.length === 0) {
                throw new CustomError_1.default(404, 'There are no shows on this day.');
            }
            return result;
        });
        this.addPhoto = (url, idShow, token) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            try {
                if (!token || typeof token !== "string") {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                Authenticator_1.tokenValidate(token);
                if (!url || typeof url !== 'string') {
                    throw new CustomError_1.default(400, 'Property url is required.');
                }
                if (!idShow || typeof idShow !== "string") {
                    throw new CustomError_1.default(400, 'Property idShow is required.');
                }
                const [result] = yield ShowDatabase_1.default.selectGeneric('id', { id: idShow });
                if (!result) {
                    throw new CustomError_1.default(404, 'Show not found.');
                }
                yield ShowDatabase_1.default.updateGeneric({ photo: url }, { id: idShow });
            }
            catch (err) {
                if ((_c = err.message) === null || _c === void 0 ? void 0 : _c.includes('jwt expired')) {
                    throw new CustomError_1.default(403, 'Token expired.');
                }
                else if ((_d = err.message) === null || _d === void 0 ? void 0 : _d.includes('jwt invalid')) {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                throw new CustomError_1.default(err.statusCode || 500, err.message || err.sqlMessage);
            }
        });
        this.getAllPhotos = (token) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f;
            try {
                if (!token || typeof token !== 'string') {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                const payload = Authenticator_1.tokenValidate(token);
                if (payload.role !== User_1.USER_ROLES.ADMIN) {
                    throw new CustomError_1.default(403, 'Only admin.');
                }
                const result = yield ShowDatabase_1.default.selectGeneric('photo');
                if (result.length === 0) {
                    throw new CustomError_1.default(404, 'Photos not found.');
                }
                const photos = [];
                for (const res of result) {
                    if (res.photo !== null) {
                        photos.push(res.photo);
                    }
                }
                return photos;
            }
            catch (err) {
                if ((_e = err.message) === null || _e === void 0 ? void 0 : _e.includes('jwt expired')) {
                    throw new CustomError_1.default(403, 'Token expired.');
                }
                else if ((_f = err.message) === null || _f === void 0 ? void 0 : _f.includes('jwt invalid')) {
                    throw new CustomError_1.default(400, 'Token invalid.');
                }
                throw new CustomError_1.default(err.statusCode || 500, err.message || 'Internal server error.');
            }
        });
    }
}
exports.default = new ShowBusiness();
//# sourceMappingURL=ShowBusiness.js.map