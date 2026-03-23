<div align="center">

# DML-BAILEYS

Professional WhatsApp automation library built on Baileys (multi-device).

<p align="center">
  <img src="https://img.shields.io/npm/v/dml-baileys.svg?style=for-the-badge" alt="npm version" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/npm/dm/dml-baileys.svg?style=for-the-badge" alt="npm downloads" />
  <a href="https://github.com/MLILA17/Dml-Baileys">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

<p align="center">
  Maintainer: <b>Dml [Dev]</b>
</p>

</div>

---

## Overview

**DML-BAILEYS** is a developer-focused enhancement of the **Baileys WhatsApp Web API** built for modern WhatsApp automation: stability, clean integration, and production-ready workflows.

Use it to build:

- WhatsApp bots
- automated responders
- notification systems
- business workflows
- support tools
- internal integrations

---

## Highlights

- **Modern event-driven architecture**
- **WhatsApp multi-device support**
- **Messaging support** (text, media, reactions, polls, etc.)
- **Group management** (create, participants, settings, invite links)
- **Flexible auth strategies** (multi-file, custom DB)
- **Production-friendly patterns** (reconnect handling, stores, caching)

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Connection & Configuration](#connection--configuration)
- [Authentication State](#authentication-state)
- [Sending Messages](#sending-messages)
- [Chat & Message Management](#chat--message-management)
- [Group Management](#group-management)
- [User & Profile Management](#user--profile-management)
- [Privacy & Block Management](#privacy--block-management)
- [Data Store](#data-store)
- [Utilities](#utilities)
- [Best Practices](#best-practices)
- [Legal Notice](#legal-notice)
- [Support](#support)
- [License](#license)
- [Contributing](#contributing)

---

## Features

### Core capabilities
- Full support for **WhatsApp multi-device**
- Reliable event-based workflows
- Compatibility with Baileys-based projects

### Messaging
- Text, images, video, audio/PTT, documents
- Contacts (vCard), locations
- Polls, reactions
- Mentions, replies, forwarding
- Edit/delete (where supported)

### Groups
- Create & manage groups
- Add/remove/promote/demote participants
- Update subject/description
- Group settings (announcement/locked)
- Invite links & metadata

### Developer/Integration
- Flexible auth storage strategies
- Works with custom databases / stores
- Helpers for JIDs and message content

---

## Installation

### Option A: Install from npm (recommended)

```bash
npm install dml-baileys
```

### Option B: Use as an alias for `@whiskeysockets/baileys`

**Using npm alias**
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:dml-baileys@latest"
  }
}
```

Then:
```bash
npm install
```

### Option C: Install directly from GitHub

```bash
npm install https://github.com/MLILA17/Dml-Baileys1.git
```

### Yarn

```bash
yarn add dml-baileys
# or
yarn add https://github.com/MLILA17/Dml-Baileys1.git
```

---

## Quick Start

<details>
<summary><b>Click to expand: Basic connection example</b></summary>

```js
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["Ubuntu", "Chrome", "125"],
    logger: console
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log('Connection closed:', lastDisconnect?.error);

      if (shouldReconnect) connectToWhatsApp();
    }

    if (connection === 'open') {
      console.log('Connected to WhatsApp');

      const selfJid = sock.user.id;
      sock.sendMessage(selfJid, { text: 'Hello! I am online using dml-baileys.' });
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const m of messages) {
      if (!m.message) continue;

      if (m.message.conversation) {
        await sock.sendMessage(m.key.remoteJid, {
          text: `You said: "${m.message.conversation}"`
        });
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

connectToWhatsApp().catch(console.error);
```

</details>

<details>
<summary><b>Click to expand: Pairing code example</b></summary>

```js
const { makeWASocket } = require('@whiskeysockets/baileys');

async function pair() {
  const sock = makeWASocket({ printQRInTerminal: false });

  if (!sock.authState.creds.registered) {
    const phoneNumber = '1234567890'; // include country code
    const pairingCode = await sock.requestPairingCode(phoneNumber);
    console.log('Pairing Code:', pairingCode);
  }
}

pair().catch(console.error);
```

</details>

---

## Connection & Configuration

<details>
<summary><b>Click to expand: Browser presets</b></summary>

```js
const { makeWASocket, Browsers } = require('@whiskeysockets/baileys');

const sock = makeWASocket({
  browser: Browsers.ubuntu('MyApp'),
  // browser: Browsers.macOS('MyApp'),
  // browser: Browsers.windows('MyApp'),
  printQRInTerminal: true,
  syncFullHistory: true
});
```

</details>

<details>
<summary><b>Click to expand: Advanced socket configuration</b></summary>

```js
const NodeCache = require('node-cache');
const groupCache = new NodeCache({ stdTTL: 300, useClones: false });

const sock = makeWASocket({
  cachedGroupMetadata: async (jid) => groupCache.get(jid),

  getMessage: async (key) => {
    // return await yourDatabase.getMessage(key);
  },

  markOnlineOnConnect: false,
  connectTimeoutMs: 60000,
  defaultQueryTimeoutMs: 60000
});

sock.ev.on('groups.update', async ([event]) => {
  const metadata = await sock.groupMetadata(event.id);
  groupCache.set(event.id, metadata);
});
```

</details>

---

## Authentication State

<details>
<summary><b>Click to expand: Multi-file auth (development)</b></summary>

```js
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_directory');
  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);
}
```

</details>

<details>
<summary><b>Click to expand: Custom database auth (production)</b></summary>

```js
const { makeWASocket, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');

async function connect() {
  const myAuthState = {
    creds: await yourDatabase.getAuthCreds(),
    keys: makeCacheableSignalKeyStore(
      await yourDatabase.getSignalKeys(),
      console.log
    )
  };

  const sock = makeWASocket({ auth: myAuthState });

  sock.ev.on('creds.update', async (creds) => {
    await yourDatabase.saveAuthCreds(creds);
  });
}
```

</details>

---

## Sending Messages

<details>
<summary><b>Click to expand: Text / mentions / replies</b></summary>

```js
await sock.sendMessage(jid, { text: 'Hello World!' });

await sock.sendMessage(jid, {
  text: 'Hello @12345678901!',
  mentions: ['12345678901@s.whatsapp.net']
});

await sock.sendMessage(
  jid,
  { text: 'This is a reply!' },
  { quoted: originalMessage }
);
```

</details>

<details>
<summary><b>Click to expand: Forward / edit / delete</b></summary>

```js
await sock.sendMessage(jid, { forward: messageToForward });

const sentMsg = await sock.sendMessage(jid, { text: 'This will be deleted' });
await sock.sendMessage(jid, { delete: sentMsg.key });

const response = await sock.sendMessage(jid, { text: 'Original text' });
await sock.sendMessage(jid, { text: 'Updated text!', edit: response.key });
```

</details>

<details>
<summary><b>Click to expand: Media messages</b></summary>

```js
await sock.sendMessage(jid, {
  image: { url: './path/to/image.jpg' },
  caption: 'Check out this image!',
  mimetype: 'image/jpeg'
});

await sock.sendMessage(jid, {
  video: { url: './path/to/video.mp4' },
  caption: 'Watch this video',
  gifPlayback: true
});

await sock.sendMessage(jid, {
  audio: { url: './path/to/audio.ogg' },
  mimetype: 'audio/ogg; codecs=opus',
  ptt: true
});

await sock.sendMessage(jid, {
  document: { url: './path/to/document.pdf' },
  fileName: 'ImportantDocument.pdf',
  mimetype: 'application/pdf'
});
```

</details>

<details>
<summary><b>Click to expand: Interactive (location / contacts / polls / reactions)</b></summary>

```js
await sock.sendMessage(jid, {
  location: {
    degreesLatitude: 40.7128,
    degreesLongitude: -74.0060,
    name: 'New York City'
  }
});

const vcard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Example Corp;
TEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890
EMAIL:john@example.com
END:VCARD`;

await sock.sendMessage(jid, {
  contacts: {
    displayName: 'John Doe',
    contacts: [{ vcard }]
  }
});

await sock.sendMessage(jid, {
  poll: {
    name: 'Favorite Programming Language?',
    values: ['JavaScript', 'Python', 'TypeScript', 'Go', 'Rust'],
    selectableCount: 1
  }
});

await sock.sendMessage(jid, {
  react: {
    text: '👍',
    key: targetMessage.key
  }
});
```

</details>

---

## Chat & Message Management

<details>
<summary><b>Click to expand: Chat operations</b></summary>

```js
await sock.chatModify({ archive: true }, jid);
await sock.chatModify({ archive: false }, jid);

await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid);
await sock.chatModify({ mute: null }, jid);

await sock.chatModify({ pin: true }, jid);
await sock.chatModify({ pin: false }, jid);

await sock.chatModify({ markRead: true }, jid);
await sock.chatModify({ markRead: false }, jid);

await sock.chatModify({ delete: true }, jid);
```

</details>

<details>
<summary><b>Click to expand: Message operations</b></summary>

```js
const sentMsg = await sock.sendMessage(jid, { text: 'This will be deleted' });
await sock.sendMessage(jid, { delete: sentMsg.key });

await sock.readMessages([messageKey1, messageKey2]);
```

</details>

---

## Group Management

<details>
<summary><b>Click to expand: Group operations</b></summary>

```js
const group = await sock.groupCreate('My New Group', [
  '12345678901@s.whatsapp.net',
  '09876543210@s.whatsapp.net'
]);

await sock.groupParticipantsUpdate(
  group.id,
  ['12345678901@s.whatsapp.net'],
  'add'
);

await sock.groupUpdateSubject(group.id, 'New Group Name');
await sock.groupUpdateDescription(group.id, 'New group description');

await sock.groupSettingUpdate(group.id, 'announcement');
await sock.groupSettingUpdate(group.id, 'not_announcement');
await sock.groupSettingUpdate(group.id, 'locked');
await sock.groupSettingUpdate(group.id, 'unlocked');

const inviteCode = await sock.groupInviteCode(group.id);
const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

const metadata = await sock.groupMetadata(group.id);
console.log(metadata);
```

</details>

---

## User & Profile Management

<details>
<summary><b>Click to expand: User/profile operations</b></summary>

```js
const [result] = await sock.onWhatsApp('12345678901@s.whatsapp.net');

if (result.exists) {
  console.log(`User exists with JID: ${result.jid}`);
}

const profilePic = await sock.profilePictureUrl('12345678901@s.whatsapp.net');
const status = await sock.fetchStatus('12345678901@s.whatsapp.net');
const businessProfile = await sock.getBusinessProfile('12345678901@s.whatsapp.net');

await sock.updateProfileName('Your New Name');
await sock.updateProfileStatus('Online');
```

</details>

---

## Privacy & Block Management

<details>
<summary><b>Click to expand: Privacy settings</b></summary>

```js
await sock.updateLastSeenPrivacy('contacts');
await sock.updateOnlinePrivacy('match_last_seen');
await sock.updateProfilePicturePrivacy('contacts');
await sock.updateStatusPrivacy('contacts');
await sock.updateReadReceiptsPrivacy('all');
await sock.updateGroupsAddPrivacy('contacts');

const privacySettings = await sock.fetchPrivacySettings(true);
```

</details>

<details>
<summary><b>Click to expand: Block management</b></summary>

```js
await sock.updateBlockStatus(jid, 'block');
await sock.updateBlockStatus(jid, 'unblock');

const blocklist = await sock.fetchBlocklist();
```

</details>

---

## Data Store

<details>
<summary><b>Click to expand: In-memory store</b></summary>

```js
const { makeWASocket, makeInMemoryStore } = require('@whiskeysockets/baileys');

const store = makeInMemoryStore({ logger: console });

store.readFromFile('./baileys_store.json');

setInterval(() => {
  store.writeToFile('./baileys_store.json');
}, 10000);

const sock = makeWASocket({});
store.bind(sock.ev);
```

</details>

<details>
<summary><b>Click to expand: Custom production store (example)</b></summary>

```js
class MyCustomStore {
  async saveMessage(key, message) {
    await yourDatabase.messages.insertOne({ key, message });
  }

  async loadMessage(key) {
    return await yourDatabase.messages.findOne({ key });
  }
}
```

</details>

---

## Utilities

<details>
<summary><b>Click to expand: Utility helpers</b></summary>

```js
const {
  getContentType,
  areJidsSameUser,
  isJidGroup,
  isJidBroadcast,
  isJidStatusBroadcast,
  jidNormalizedUser,
  generateMessageID,
  generateWAMessageContent,
  downloadContentFromMessage,
  getAggregateVotesInPollMessage,
  proto
} = require('@whiskeysockets/baileys');

const messageType = getContentType(message);

if (isJidGroup(jid)) {
  console.log('This is a group JID');
}
```

</details>

---

## Best Practices

- Cache group metadata where possible
- Use persistent storage in production
- Implement reconnection logic carefully
- Respect WhatsApp rate limits
- Never hardcode credentials (use env vars)
- Keep dependencies updated

---

## Legal Notice

DML-BAILEYS is **not affiliated with, endorsed by, or officially connected to WhatsApp LLC**.

“WhatsApp” and related names/logos/trademarks belong to their respective owners.

**Responsible use**
- Use only for lawful and ethical purposes
- Do not use for spam/abuse
- Respect privacy and consent
- Maintainer is not responsible for misuse

---

## Support

- Review this README first
- Check Baileys documentation (upstream)
- Open a GitHub issue for bugs/feature requests

**Direct Contact:** `+255713541112`

When reporting issues, include:
- Node.js version
- package version
- error logs
- reproduction steps

---

## License

MIT License — see `LICENSE`.

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m "Add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request
