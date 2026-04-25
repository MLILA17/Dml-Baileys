/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenderChainKey = void 0;
const crypto_1 = require("libsignal/src/crypto");
const sender_message_key_1 = require("./sender-message-key");
class SenderChainKey {
    constructor(iteration, chainKey) {
        this.MESSAGE_KEY_SEED = Buffer.from([0x01]);
        this.CHAIN_KEY_SEED = Buffer.from([0x02]);
        this.iteration = iteration;
        if (chainKey instanceof Buffer) {
            this.chainKey = chainKey;
        }
        else {
            this.chainKey = Buffer.from(chainKey || []);
        }
    }
    getIteration() {
        return this.iteration;
    }
    getSenderMessageKey() {
        return new sender_message_key_1.SenderMessageKey(this.iteration, this.getDerivative(this.MESSAGE_KEY_SEED, this.chainKey));
    }
    getNext() {
        return new SenderChainKey(this.iteration + 1, this.getDerivative(this.CHAIN_KEY_SEED, this.chainKey));
    }
    getSeed() {
        return this.chainKey;
    }
    getDerivative(seed, key) {
        return (0, crypto_1.calculateMAC)(key, seed);
    }
}
exports.SenderChainKey = SenderChainKey;
