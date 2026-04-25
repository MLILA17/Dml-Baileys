/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectRepository = void 0;
class ObjectRepository {
    constructor(entities = {}) {
        this.entityMap = new Map(Object.entries(entities));
    }
    findById(id) {
        return this.entityMap.get(id);
    }
    findAll() {
        return Array.from(this.entityMap.values());
    }
    upsertById(id, entity) {
        return this.entityMap.set(id, { ...entity });
    }
    deleteById(id) {
        return this.entityMap.delete(id);
    }
    count() {
        return this.entityMap.size;
    }
    toJSON() {
        return this.findAll();
    }
}
exports.ObjectRepository = ObjectRepository;
