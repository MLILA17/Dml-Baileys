

````markdown
<div align="center">

# DML-BAILEYS ⭐

<p align="center">
  <img src="https://img.shields.io/npm/v/dml-baileys.svg?style=for-the-badge" alt="npm version" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/npm/dm/dml-baileys.svg?style=for-the-badge" alt="npm downloads" />
  <a href="https://github.com/MLILA17/Dml-Baileys">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

<h3>Professional WhatsApp Automation Library Built on Baileys</h3>

<p>
  A powerful, developer-focused enhancement of the <b>Baileys WhatsApp Web API</b>, designed for
  modern WhatsApp automation, stability, flexibility, and production-ready workflows.
</p>

<p>
  <b>Maintainer:</b> Dml [Dev]
</p>

</div>

---

## ✨ Overview

**DML-BAILEYS** is a professionally enhanced implementation of the Baileys WhatsApp Web API.  
It is built for developers who need a clean development experience, robust automation features, and flexible integration options for WhatsApp-based applications.

Whether you are creating:

- WhatsApp bots
- automated responders
- notification systems
- business workflows
- support tools
- internal integrations

DML-BAILEYS gives you a strong and practical foundation for building them efficiently.

---

## 🚀 Highlights

- ⚡ **Fast and modern architecture**
- 🔐 **Secure multi-device WhatsApp support**
- 📩 **Comprehensive messaging capabilities**
- 👥 **Advanced group management tools**
- 🛠️ **Developer-friendly API design**
- 💾 **Flexible authentication handling**
- 🔄 **Reliable reconnection workflows**
- 📚 **Well-structured examples and usage patterns**

---

## 📚 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Highlights](#-highlights)
- [🔥 Features](#-features)
- [📦 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [🔌 Connection and Configuration](#-connection-and-configuration)
- [💾 Authentication State Management](#-authentication-state-management)
- [📤 Sending Messages](#-sending-messages)
- [📁 Chat and Message Management](#-chat-and-message-management)
- [👥 Group Management](#-group-management)
- [👤 User and Profile Management](#-user-and-profile-management)
- [🔒 Privacy and Block Management](#-privacy-and-block-management)
- [🗄️ Data Store Implementation](#️-data-store-implementation)
- [🛠️ Utility Functions](#️-utility-functions)
- [💡 Best Practices](#-best-practices)
- [⚠️ Legal Notice](#️-legal-notice)
- [🆘 Getting Help](#-getting-help)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)

---

## 🔥 Features

### Core Capabilities

- ✅ Full support for **WhatsApp multi-device**
- ✅ Enhanced developer experience with clean APIs
- ✅ Reliable event-based architecture
- ✅ Easy integration into bots and automation tools
- ✅ Strong compatibility with existing Baileys-based projects

### Messaging Support

- ✅ Text messages
- ✅ Image messages
- ✅ Video messages
- ✅ Audio and voice notes
- ✅ Documents
- ✅ Contacts
- ✅ Locations
- ✅ Polls
- ✅ Reactions
- ✅ Mentions and replies
- ✅ Message forwarding

### Group Features

- ✅ Create and manage groups
- ✅ Add, remove, promote, and demote participants
- ✅ Update subject and description
- ✅ Control group settings
- ✅ Handle invite links
- ✅ Group status support

### Developer Features

- ✅ Flexible auth storage strategies
- ✅ Support for custom stores and databases
- ✅ Utility helpers for JIDs and content
- ✅ Debugging and event inspection tools
- ✅ Production-friendly patterns and examples

---

## 📦 Installation

Choose the method that best fits your workflow.

### 1. Install from npm

Recommended for most users:

```bash
npm install dml-baileys
````

---

### 2. Use as an alias for `@whiskeysockets/baileys`

This lets you continue importing `@whiskeysockets/baileys` while resolving to **DML-BAILEYS**.

#### Using GitHub

```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "github:MLILA17/Dml-Baileys1.git"
  }
}
```

#### Using npm alias

```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:dml-baileys@latest"
  }
}
```

Then run:

```bash
npm install
```

---

### 3. Install directly from GitHub

```bash
npm install https://github.com/MLILA17/Dml-Baileys1.git
```

---

### 4. Using Yarn

```bash
yarn add dml-baileys
```

Or from GitHub:

```bash
yarn add https://github.com/MLILA17/Dml-Baileys1.git
```

---

### 5. Local development setup

```bash
git clone https://github.com/MLILA17/Dml-Baileys1.git
cd your-project
npm install /path/to/cloned/Dml-Baileys1
```

---

## 🚀 Quick Start

### Basic connection example

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["Ubuntu", "Chrome", "125"],
        logger: console,
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('Connection closed:', lastDisconnect?.error);

            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('✅ Successfully connected to WhatsApp');

            const selfJid = sock.user.id;
            sock.sendMessage(selfJid, {
                text: 'Hello! I am online using dml-baileys 🤖'
            });
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

---

### Pairing code example

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const { makeWASocket } = require('@whiskeysockets/baileys');

const sock = makeWASocket({
    printQRInTerminal: false
});

if (!sock.authState.creds.registered) {
    const phoneNumber = '1234567890'; // country code included
    const pairingCode = await sock.requestPairingCode(phoneNumber);

    console.log('🔑 Pairing Code:', pairingCode);
}
```

</details>

---

## 🔌 Connection and Configuration

### Browser presets

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const { makeWASocket, Browsers } = require('@whiskeysockets/baileys');

const sock = makeWASocket({
    browser: Browsers.ubuntu('MyApp'),
    // browser: Browsers.macOS('MyApp'),
    // browser: Browsers.windows('MyApp'),
    printQRInTerminal: true,
    syncFullHistory: true,
});
```

</details>

---

### Advanced socket configuration

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const NodeCache = require('node-cache');
const groupCache = new NodeCache({ stdTTL: 300, useClones: false });

const sock = makeWASocket({
    cachedGroupMetadata: async (jid) => groupCache.get(jid),

    getMessage: async (key) => {
        return await yourDatabase.getMessage(key);
    },

    markOnlineOnConnect: false,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 60000,
});

sock.ev.on('groups.update', async ([event]) => {
    const metadata = await sock.groupMetadata(event.id);
    groupCache.set(event.id, metadata);
});
```

</details>

---

## 💾 Authentication State Management

### Multi-file auth state

Recommended for development.

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function connect() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_directory');
    const sock = makeWASocket({ auth: state });

    sock.ev.on('creds.update', saveCreds);
}
```

</details>

---

### Custom database auth state

Recommended for production.

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const { makeWASocket, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');

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
```

</details>

---

## 📤 Sending Messages

### Basic messages

<details>
<summary><b>Click to expand code</b></summary>

```javascript
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

await sock.sendMessage(jid, { forward: messageToForward });
```

</details>

---

### Media messages

<details>
<summary><b>Click to expand code</b></summary>

```javascript
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

---

### Interactive content

<details>
<summary><b>Click to expand code</b></summary>

```javascript
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

## 📁 Chat and Message Management

### Chat operations

<details>
<summary><b>Click to expand code</b></summary>

```javascript
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

---

### Message operations

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const sentMsg = await sock.sendMessage(jid, { text: 'This will be deleted' });
await sock.sendMessage(jid, { delete: sentMsg.key });

const response = await sock.sendMessage(jid, { text: 'Original text' });
await sock.sendMessage(jid, {
    text: 'Updated text!',
    edit: response.key
});

await sock.readMessages([messageKey1, messageKey2]);
```

</details>

---

## 👥 Group Management

### Group operations

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const group = await sock.groupCreate('My New Group', [
    '12345678901@s.whatsapp.net',
    '09876543210@s.whatsapp.net'
]);

await sock.groupParticipantsUpdate(
    groupJid,
    ['12345678901@s.whatsapp.net'],
    'add'
);

await sock.groupUpdateSubject(groupJid, 'New Group Name');
await sock.groupUpdateDescription(groupJid, 'New group description');

await sock.groupSettingUpdate(groupJid, 'announcement');
await sock.groupSettingUpdate(groupJid, 'not_announcement');
await sock.groupSettingUpdate(groupJid, 'locked');
await sock.groupSettingUpdate(groupJid, 'unlocked');

const inviteCode = await sock.groupInviteCode(groupJid);
const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

const metadata = await sock.groupMetadata(groupJid);
console.log(metadata);
```

</details>

---

## 👤 User and Profile Management

### User operations

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const [result] = await sock.onWhatsApp('12345678901@s.whatsapp.net');

if (result.exists) {
    console.log(`User exists with JID: ${result.jid}`);
}

const profilePic = await sock.profilePictureUrl('12345678901@s.whatsapp.net');
const status = await sock.fetchStatus('12345678901@s.whatsapp.net');
const businessProfile = await sock.getBusinessProfile('12345678901@s.whatsapp.net');
```

</details>

---

### Profile operations

<details>
<summary><b>Click to expand code</b></summary>

```javascript
await sock.updateProfileName('Your New Name');
await sock.updateProfileStatus('Online and coding! 🚀');
```

</details>

---

## 🔒 Privacy and Block Management

### Privacy settings

<details>
<summary><b>Click to expand code</b></summary>

```javascript
await sock.updateLastSeenPrivacy('contacts');
await sock.updateOnlinePrivacy('match_last_seen');
await sock.updateProfilePicturePrivacy('contacts');
await sock.updateStatusPrivacy('contacts');
await sock.updateReadReceiptsPrivacy('all');
await sock.updateGroupsAddPrivacy('contacts');

const privacySettings = await sock.fetchPrivacySettings(true);
```

</details>

---

### Block management

<details>
<summary><b>Click to expand code</b></summary>

```javascript
await sock.updateBlockStatus(jid, 'block');
await sock.updateBlockStatus(jid, 'unblock');

const blocklist = await sock.fetchBlocklist();
```

</details>

---

## 🗄️ Data Store Implementation

### In-memory store

<details>
<summary><b>Click to expand code</b></summary>

```javascript
const { makeInMemoryStore } = require('@whiskeysockets/baileys');

const store = makeInMemoryStore({ logger: console });

store.readFromFile('./baileys_store.json');

setInterval(() => {
    store.writeToFile('./baileys_store.json');
}, 10000);

const sock = makeWASocket({});
store.bind(sock.ev);
```

</details>

---

### Custom production store

<details>
<summary><b>Click to expand code</b></summary>

```javascript
class MyCustomStore {
    async saveMessage(key, message) {
        await yourDatabase.messages.insertOne({ key, message });
    }

    async loadMessage(key) {
        return await yourDatabase.messages.findOne({ key });
    }
}

const myStore = new MyCustomStore();
```

</details>

---

## 🛠️ Utility Functions

<details>
<summary><b>Click to expand code</b></summary>

```javascript
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

## 💡 Best Practices

### Performance

* Cache group metadata whenever possible
* Use persistent storage for production
* Implement reconnection logic carefully
* Respect WhatsApp rate limits
* Handle errors in every critical operation

### Security

* Never hardcode credentials
* Use environment variables
* Store auth data securely
* Validate all incoming input
* Keep dependencies updated

### Recommended production mindset

* Use structured logs
* Add retry logic where necessary
* Monitor failures and disconnections
* Keep a backup strategy for auth/session data
* Test messaging flows with small volumes first

---

## ⚠️ Legal Notice

**DML-BAILEYS is not affiliated with, endorsed by, authorized by, or officially connected to WhatsApp LLC.**

“WhatsApp” and all related names, logos, and trademarks belong to their respective owners.

### Responsible Use

* Use this library only for lawful and ethical purposes
* Do not use it for spam, harassment, or abuse
* Respect user privacy and consent
* Follow WhatsApp platform expectations and rate limits
* The maintainer is not responsible for misuse

---

## 🆘 Getting Help

If you need support:

* Review this README first
* Check the official Baileys documentation
* Open an issue on GitHub for bugs or feature requests
* Contact directly for serious support needs

**Direct Contact:** `+255713541112`

When reporting issues, include:

* Node.js version
* package version
* error logs
* reproduction steps

---

## 📄 License

This project is distributed under the **MIT License**.
See the [LICENSE](LICENSE) file for full details.

### Credits

Special thanks to:

* **Baileys** by WhiskeySockets
* the open-source community
* contributors and testers supporting this project

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

For large changes, open an issue first so the idea can be discussed properly.

---

<div align="center">

## 🌟 Support the Project

If you find **DML-BAILEYS** useful, please consider:

⭐ Starring the repository
🍴 Forking the project
📢 Sharing it with other developers

### Crafted with ❤️ by Dml [Dev]

**Empowering developers with modern WhatsApp automation tools**

</div>
```
