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
exports.GetCurrentTheme = exports.GetThemeHistory = exports.UpdateCurrentTheme = exports.CreateNewTheme = void 0;
const __1 = require("..");
function CreateNewTheme(name, serverIconUrl, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentTheme = yield GetCurrentTheme();
        if (currentTheme != null) {
            yield EndTheme(currentTheme);
        }
        const theme = yield __1.prisma.theme.create({
            data: {
                name: name,
                imageUrl: serverIconUrl,
                user: {
                    connectOrCreate: {
                        where: {
                            userId: user.id
                        },
                        create: {
                            userId: user.id,
                            userName: user.userName
                        }
                    }
                }
            }
        });
        return theme;
    });
}
exports.CreateNewTheme = CreateNewTheme;
function UpdateCurrentTheme(updatedName, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentTheme = yield GetCurrentTheme();
        if (currentTheme == null)
            return null;
        const updatedTheme = yield __1.prisma.theme.update({
            data: {
                updateDate: new Date(),
                name: updatedName
            },
            where: {
                id: currentTheme.id
            }
        });
        return updatedTheme;
    });
}
exports.UpdateCurrentTheme = UpdateCurrentTheme;
function GetThemeHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const themes = yield __1.prisma.theme.findMany({
            orderBy: {
                startDate: 'desc'
            }
        });
        return themes;
    });
}
exports.GetThemeHistory = GetThemeHistory;
function GetCurrentTheme() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentTheme = yield __1.prisma.theme.findFirst({
            orderBy: {
                startDate: 'desc'
            },
            include: {
                entries: true
            }
        });
        return currentTheme;
    });
}
exports.GetCurrentTheme = GetCurrentTheme;
function EndTheme(theme) {
    return __awaiter(this, void 0, void 0, function* () {
        yield __1.prisma.theme.update({
            data: {
                endDate: new Date()
            },
            where: {
                id: theme.id
            }
        });
    });
}
