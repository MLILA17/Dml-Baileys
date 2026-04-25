/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUSyncSocket = void 0;
const boom_1 = require("@hapi/boom");
const WABinary_1 = require("../WABinary");
const socket_1 = require("./socket");
const makeUSyncSocket = (config) => {
    const sock = (0, socket_1.makeSocket)(config);
    const { generateMessageTag, query, } = sock;
    const executeUSyncQuery = async (usyncQuery) => {
        if (usyncQuery.protocols.length === 0) {
            throw new boom_1.Boom('USyncQuery must have at least one protocol');
        }
        // todo: validate users, throw WARNING on no valid users
        // variable below has only validated users
        const validUsers = usyncQuery.users;
        const userNodes = validUsers.map((user) => {
            return {
                tag: 'user',
                attrs: {
                    jid: !user.phone ? user.id : undefined,
                },
                content: usyncQuery.protocols
                    .map((a) => a.getUserElement(user))
                    .filter(a => a !== null)
            };
        });
        const listNode = {
            tag: 'list',
            attrs: {},
            content: userNodes
        };
        const queryNode = {
            tag: 'query',
            attrs: {},
            content: usyncQuery.protocols.map((a) => a.getQueryElement())
        };
        const iq = {
            tag: 'iq',
            attrs: {
                to: WABinary_1.S_WHATSAPP_NET,
                type: 'get',
                xmlns: 'usync',
            },
            content: [
                {
                    tag: 'usync',
                    attrs: {
                        context: usyncQuery.context,
                        mode: usyncQuery.mode,
                        sid: generateMessageTag(),
                        last: 'true',
                        index: '0',
                    },
                    content: [
                        queryNode,
                        listNode
                    ]
                }
            ],
        };
        const result = await query(iq);
        return usyncQuery.parseUSyncQueryResult(result);
    };
    return {
        ...sock,
        executeUSyncQuery,
    };
};
exports.makeUSyncSocket = makeUSyncSocket;
