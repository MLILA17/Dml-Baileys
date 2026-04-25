/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.buildAckStanza = void 0;
  const buildAckStanza = (node, errorCode, meId) => {
      const { tag, attrs } = node;
      const stanza = {
          tag: 'ack',
          attrs: {
              id: attrs.id,
              to: attrs.from,
              class: tag
          }
      };
      if (errorCode) {
          stanza.attrs.error = errorCode.toString();
      }
      if (attrs.participant) {
          stanza.attrs.participant = attrs.participant;
      }
      if (attrs.recipient) {
          stanza.attrs.recipient = attrs.recipient;
      }
      if (attrs.type) {
          stanza.attrs.type = attrs.type;
      }
      if (tag === 'message' && meId) {
          stanza.attrs.from = meId;
      }
      return stanza;
  };
  exports.buildAckStanza = buildAckStanza;
  