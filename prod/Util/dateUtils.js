"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysBetweenDates = void 0;
function getDaysBetweenDates(date_1, date_2) {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.abs(TotalDays);
}
exports.getDaysBetweenDates = getDaysBetweenDates;
