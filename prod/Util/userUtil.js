"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDiscordUser = void 0;
function toDiscordUser(member) {
    let url = member.displayAvatarURL();
    return {
        id: member.id,
        userName: member.user.username,
        avatarUrl: url,
        nickname: member.displayName
    };
}
exports.toDiscordUser = toDiscordUser;
