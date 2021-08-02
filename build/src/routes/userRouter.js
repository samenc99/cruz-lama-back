"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Signup_1 = require("../controllers/Users/Signup");
const login_1 = __importDefault(require("../controllers/Users/login"));
const userRouter = express_1.Router();
exports.default = userRouter;
userRouter.post('/signup', Signup_1.signupController);
userRouter.post('/login', login_1.default);
//# sourceMappingURL=userRouter.js.map