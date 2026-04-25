/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.emitSyncActionResults = exports.processContactAction = void 0;
  const WAProto_1 = require("../../WAProto");
  const WABinary_1 = require("../WABinary");
  const processContactAction = (action, id, logger) => {
      const results = [];
      if (!id) {
          logger?.warn(
              { hasFullName: !!action.fullName, hasLidJid: !!action.lidJid, hasPnJid: !!action.pnJid },
              'contactAction sync: missing id in index'
          );
          return results;
      }
      const lidJid = action.lidJid;
      const idIsPn = (0, WABinary_1.isPnUser)(id);
      const phoneNumber = idIsPn ? id : action.pnJid || undefined;
      results.push({
          event: 'contacts.upsert',
          data: [
              {
                  id,
                  name: action.fullName || action.firstName || action.username || undefined,
                  lid: lidJid || undefined,
                  phoneNumber
              }
          ]
      });
      if (lidJid && (0, WABinary_1.isLidUser)(lidJid) && idIsPn) {
          results.push({
              event: 'lid-mapping.update',
              data: { lid: lidJid, pn: id }
          });
      }
      return results;
  };
  exports.processContactAction = processContactAction;
  const emitSyncActionResults = (ev, results) => {
      for (const result of results) {
          if (result.event === 'contacts.upsert') {
              ev.emit('contacts.upsert', result.data);
          } else {
              ev.emit('lid-mapping.update', result.data);
          }
      }
  };
  exports.emitSyncActionResults = emitSyncActionResults;
  