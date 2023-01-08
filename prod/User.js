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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const client_1 = require("@prisma/client");
class User {
    constructor(userName) {
        this.userName = userName;
        this.prisma = new client_1.PrismaClient();
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.prisma.user.findFirst({
                where: {
                    userName: this.userName
                }
            });
            if (user == null) {
                user = yield this.prisma.user.create({
                    data: {
                        userName: this.userName
                    }
                });
            }
            return user;
        });
    }
    createTheme(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.load();
        });
    }
}
exports.User = User;
