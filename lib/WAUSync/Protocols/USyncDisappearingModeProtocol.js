/*
# toxic-baileys™
# By 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧 ✓
!- do not delete this credit

*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USyncDisappearingModeProtocol = void 0;
const WABinary_1 = require("../../WABinary");
class USyncDisappearingModeProtocol {
    constructor() {
        this.name = 'disappearing_mode';
    }
    getQueryElement() {
        return {
            tag: 'disappearing_mode',
            attrs: {},
        };
    }
    getUserElement() {
        return null;
    }
    parser(node) {
        if (node.tag === 'status') {
            (0, WABinary_1.assertNodeErrorFree)(node);
            const duration = +(node === null || node === void 0 ? void 0 : node.attrs.duration);
            const setAt = new Date(+((node === null || node === void 0 ? void 0 : node.attrs.t) || 0) * 1000);
            return {
                duration,
                setAt,
            };
        }
    }
}
exports.USyncDisappearingModeProtocol = USyncDisappearingModeProtocol;
