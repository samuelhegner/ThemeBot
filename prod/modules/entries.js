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
exports.GetEntry = exports.DeleteEntry = exports.UpdateEntry = exports.EnterTheme = void 0;
const __1 = require("..");
function EnterTheme(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const themeEntries = yield __1.prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });
        if (themeEntries == null) {
            return null;
        }
        if (themeEntries.entries.findIndex((entry) => entry.author === user.id) !== -1) {
            return null;
        }
        const entry = yield __1.prisma.entry.create({
            data: {
                name: user.nickname,
                imageUrl: user.avatarUrl,
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
                },
                theme: {
                    connect: {
                        id: themeEntries.id
                    }
                }
            }
        });
        return entry;
    });
}
exports.EnterTheme = EnterTheme;
function UpdateEntry(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const themeEntries = yield __1.prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });
        if (themeEntries == null) {
            return null;
        }
        const entryIndex = themeEntries.entries.findIndex((entry) => entry.author === user.id);
        if (entryIndex === -1) {
            return null;
        }
        const entry = themeEntries.entries[entryIndex];
        const updatedEntry = yield __1.prisma.entry.update({
            where: { id: entry.id },
            data: { name: user.nickname, imageUrl: user.avatarUrl, updateDate: new Date() }
        });
        return updatedEntry;
    });
}
exports.UpdateEntry = UpdateEntry;
function DeleteEntry(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const themeEntries = yield __1.prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });
        if (themeEntries == null) {
            return null;
        }
        const entryIndex = themeEntries.entries.findIndex((entry) => entry.author === user.id);
        if (entryIndex === -1) {
            return null;
        }
        const entry = themeEntries.entries[entryIndex];
        const deletedEntry = yield __1.prisma.entry.delete({
            where: { id: entry.id }
        });
        return deletedEntry;
    });
}
exports.DeleteEntry = DeleteEntry;
function GetEntry(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const themeEntries = yield __1.prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });
        if (themeEntries == null) {
            return null;
        }
        const entryIndex = themeEntries.entries.findIndex((entry) => entry.author === user.id);
        if (entryIndex === -1) {
            return null;
        }
        return themeEntries.entries[entryIndex];
    });
}
exports.GetEntry = GetEntry;
