"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidate = exports.tokenGenerator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const tokenGenerator = (payload) => {
    return jsonwebtoken_1.sign(payload, process.env.JWT_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
};
exports.tokenGenerator = tokenGenerator;
const tokenValidate = (token) => {
    return jsonwebtoken_1.verify(token, String(process.env.JWT_KEY));
};
exports.tokenValidate = tokenValidate;
//# sourceMappingURL=Authenticator.js.map