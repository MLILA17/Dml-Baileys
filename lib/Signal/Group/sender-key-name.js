/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenderKeyName = void 0;
function isNull(str) {
    return str === null || str === '';
}
function intValue(num) {
    const MAX_VALUE = 0x7fffffff;
    const MIN_VALUE = -0x80000000;
    if (num > MAX_VALUE || num < MIN_VALUE) {
        return num & 0xffffffff;
    }
    return num;
}
function hashCode(strKey) {
    let hash = 0;
    if (!isNull(strKey)) {
        for (let i = 0; i < strKey.length; i++) {
            hash = hash * 31 + strKey.charCodeAt(i);
            hash = intValue(hash);
        }
    }
    return hash;
}
class SenderKeyName {
    constructor(groupId, sender) {
        this.groupId = groupId;
        this.sender = sender;
    }
    getGroupId() {
        return this.groupId;
    }
    getSender() {
        return this.sender;
    }
    serialize() {
        return `${this.groupId}::${this.sender.id}::${this.sender.deviceId}`;
    }
    toString() {
        return this.serialize();
    }
    equals(other) {
        if (other === null)
            return false;
        return this.groupId === other.groupId && this.sender.toString() === other.sender.toString();
    }
    hashCode() {
        return hashCode(this.groupId) ^ hashCode(this.sender.toString());
    }
}
exports.SenderKeyName = SenderKeyName;
