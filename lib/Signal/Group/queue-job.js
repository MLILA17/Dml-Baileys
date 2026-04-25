/*
╭━〔 𝐃𝐌𝐋-𝐁𝐀𝐈𝐋𝐄𝐘𝐒𝟏 〕━╮
┃  ⚡ 𝘌𝘯𝘩𝘢𝘯𝘤𝘦𝘥 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘉𝘢𝘪𝘭𝘦𝘺𝘴 𝘓𝘪𝘣𝘳𝘢𝘳𝘺
┃  👑 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘥 𝘣𝘺 𝘋𝘮𝘭-𝘵𝘦𝘤𝘩
┃  🔒 𝘊𝘳𝘦𝘥𝘪𝘵 𝘮𝘶𝘴𝘵 𝘳𝘦𝘮𝘢𝘪𝘯 𝘶𝘯𝘵𝘰𝘶𝘤𝘩𝘦𝘥
╰━━━━━━━━━━━━╯
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = queueJob;
const _queueAsyncBuckets = new Map();
const _gcLimit = 10000;
async function _asyncQueueExecutor(queue, cleanup) {
    let offt = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const limit = Math.min(queue.length, _gcLimit);
        for (let i = offt; i < limit; i++) {
            const job = queue[i];
            try {
                job.resolve(await job.awaitable());
            }
            catch (e) {
                job.reject(e);
            }
        }
        if (limit < queue.length) {
            if (limit >= _gcLimit) {
                queue.splice(0, limit);
                offt = 0;
            }
            else {
                offt = limit;
            }
        }
        else {
            break;
        }
    }
    cleanup();
}
function queueJob(bucket, awaitable) {
    // Skip name assignment since it's readonly in strict mode
    if (typeof bucket !== 'string') {
        console.warn('Unhandled bucket type (for naming):', typeof bucket, bucket);
    }
    let inactive = false;
    if (!_queueAsyncBuckets.has(bucket)) {
        _queueAsyncBuckets.set(bucket, []);
        inactive = true;
    }
    const queue = _queueAsyncBuckets.get(bucket);
    const job = new Promise((resolve, reject) => {
        queue.push({
            awaitable,
            resolve: resolve,
            reject
        });
    });
    if (inactive) {
        _asyncQueueExecutor(queue, () => _queueAsyncBuckets.delete(bucket));
    }
    return job;
}
