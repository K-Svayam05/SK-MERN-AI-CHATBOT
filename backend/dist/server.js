"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const options = {
    key: fs_1.default.readFileSync('certs/private-key.pem'),
    cert: fs_1.default.readFileSync('certs/certificate.pem')
};
https_1.default.createServer(options, app_1.default).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map