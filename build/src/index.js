"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bandRoutes_1 = __importDefault(require("./routes/bandRoutes"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const showRouter_1 = __importDefault(require("./routes/showRouter"));
const cors_1 = __importDefault(require("cors"));
const createTables_1 = __importDefault(require("./data/createTables"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/user', userRouter_1.default);
app.use('/band', bandRoutes_1.default);
app.use('/show', showRouter_1.default);
app.post('/tables', createTables_1.default);
app.listen(3003, () => {
    console.log("Server is running port 3003");
});
//# sourceMappingURL=index.js.map