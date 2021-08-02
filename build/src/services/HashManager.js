"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.createHash = void 0;
const bcryptjs_1 = require("bcryptjs");
const createHash = (plainText) => {
    const salt = bcryptjs_1.genSaltSync(Number(process.env.BCRYPT_COST));
    return bcryptjs_1.hashSync(plainText, salt);
};
exports.createHash = createHash;
const compareHash = (plainText, cypherText) => {
    return bcryptjs_1.compareSync(plainText, cypherText);
};
exports.compareHash = compareHash;
//# sourceMappingURL=HashManager.js.map