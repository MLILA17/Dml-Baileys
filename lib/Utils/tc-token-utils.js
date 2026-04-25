/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.buildTcTokenFromJid = void 0;
  const buildTcTokenFromJid = async ({ authState, jid, baseContent = [] }) => {
      try {
          const tcTokenData = await authState.keys.get('tctoken', [jid]);
          const tcTokenBuffer = tcTokenData?.[jid]?.token;
          if (!tcTokenBuffer) return baseContent.length > 0 ? baseContent : undefined;
          baseContent.push({
              tag: 'tctoken',
              attrs: {},
              content: tcTokenBuffer
          });
          return baseContent;
      } catch (error) {
          return baseContent.length > 0 ? baseContent : undefined;
      }
  };
  exports.buildTcTokenFromJid = buildTcTokenFromJid;
  