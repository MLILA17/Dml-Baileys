/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CiphertextMessage = void 0;
class CiphertextMessage {
    constructor() {
        this.UNSUPPORTED_VERSION = 1;
        this.CURRENT_VERSION = 3;
        this.WHISPER_TYPE = 2;
        this.PREKEY_TYPE = 3;
        this.SENDERKEY_TYPE = 4;
        this.SENDERKEY_DISTRIBUTION_TYPE = 5;
        this.ENCRYPTED_MESSAGE_OVERHEAD = 53;
    }
}
exports.CiphertextMessage = CiphertextMessage;
