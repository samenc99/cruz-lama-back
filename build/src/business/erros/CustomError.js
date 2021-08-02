"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.getStatusCode = () => {
            return this.statusCode;
        };
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map