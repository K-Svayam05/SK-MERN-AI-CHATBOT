"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./database/connection");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, connection_1.connectToDatabase)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log('Server Open & Connected To Database 🤟');
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map