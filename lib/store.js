import { readFileSync, writeFileSync, existsSync } from 'fs';
const { initAuthCreds, BufferJSON, proto } = (await import('@whiskeysockets/baileys')).default;

function bind(conn) {
    if (!conn.chats) conn.chats = {};

    function updateNameToDb(contacts) {
        if (!contacts) return;
        try {
            contacts = contacts.contacts || contacts;
            for (const contact of contacts) {
                const id = conn.decodeJid(contact.id);
                if (!id || id === 'status@broadcast') continue;

                let chats = conn.chats[id] || (conn.chats[id] = { id });
                conn.chats[id] = {
                    ...chats,
                    ...({
                        ...contact,
                        id,
                        ...(id.endsWith('@g.us')
                            ? { subject: contact.subject || contact.name || chats.subject || '' }
                            : { name: contact.notify || contact.name || chats.name || chats.notify || '' })
                    } || {})
                };
            }
        } catch (e) {
            console.error("❌ Error en updateNameToDb:", e);
        }
    }

    conn.ev.on('contacts.upsert', updateNameToDb);
    conn.ev.on('groups.update', updateNameToDb);
    conn.ev.on('contacts.set', updateNameToDb);

    conn.ev.on('chats.set', async ({ chats }) => {
        try {
            for (let { id, name, readOnly } of chats) {
                id = conn.decodeJid(id);
                if (!id || id === 'status@broadcast') continue;

                let chats = conn.chats[id] || (conn.chats[id] = { id });
                chats.isChats = !readOnly;
                if (name) chats[id.endsWith('@g.us') ? 'subject' : 'name'] = name;

                if (id.endsWith('@g.us')) {
                    if (!conn.ws || conn.ws.readyState !== 1) continue;

                    const metadata = await Promise.race([
                        conn.groupMetadata(id),
                        new Promise((_, reject) => setTimeout(() => reject(new Error("⚠️ Timeout al obtener metadata")), 5000))
                    ]).catch(err => {
                        console.error(`❌ Error obteniendo metadata del grupo ${id}:`, err);
                        return null;
                    });

                    if (metadata) {
                        chats.metadata = metadata;
                        chats.subject = name || metadata.subject;
                    }
                }
            }
        } catch (e) {
            console.error("❌ Error en chats.set:", e);
        }
    });

    conn.ev.on('group-participants.update', async function ({ id, participants, action }) {
        try {
            id = conn.decodeJid(id);
            if (!id || id === 'status@broadcast') return;

            let chats = conn.chats[id] || (conn.chats[id] = { id });
            chats.isChats = true;

            if (!conn.ws || conn.ws.readyState !== 1) return;
            const groupMetadata = await conn.groupMetadata(id).catch(() => null);
            if (!groupMetadata) return;

            chats.subject = groupMetadata.subject;
            chats.metadata = groupMetadata;
        } catch (e) {
            console.error("❌ Error en group-participants.update:", e);
        }
    });

    conn.ev.on('groups.update', async function (groupsUpdates) {
        try {
            for (const update of groupsUpdates) {
                const id = conn.decodeJid(update.id);
                if (!id || id === 'status@broadcast' || !id.endsWith('@g.us')) continue;

                let chats = conn.chats[id] || (conn.chats[id] = { id });
                chats.isChats = true;

                if (!conn.ws || conn.ws.readyState !== 1) continue;

                const metadata = await Promise.race([
                    conn.groupMetadata(id),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("⚠️ Timeout al obtener metadata")), 5000))
                ]).catch(err => {
                    console.error(`❌ Error obteniendo metadata del grupo ${id}:`, err);
                    return null;
                });

                if (metadata) {
                    chats.metadata = metadata;
                    chats.subject = update.subject || metadata.subject;
                }
                await new Promise(res => setTimeout(res, 2000)); // Espera 2s entre solicitudes
            }
        } catch (e) {
            console.error("❌ Error en groups.update:", e);
        }
    });

    conn.ev.on('chats.upsert', function ({ id, name }) {
        try {
            if (!id || id === 'status@broadcast') return;
            conn.chats[id] = { ...(conn.chats[id] || {}), id, name, isChats: true };
        } catch (e) {
            console.error("❌ Error en chats.upsert:", e);
        }
    });

    conn.ev.on('presence.update', async function ({ id, presences }) {
        try {
            const sender = Object.keys(presences)[0] || id;
            const _sender = conn.decodeJid(sender);
            const presence = presences[sender]['lastKnownPresence'] || 'composing';

            let chats = conn.chats[_sender] || (conn.chats[_sender] = { id: sender });
            chats.presences = presence;

            if (id.endsWith('@g.us')) {
                let chats = conn.chats[id] || (conn.chats[id] = { id });
            }
        } catch (e) {
            console.error("❌ Error en presence.update:", e);
        }
    });
}

const KEY_MAP = {
    'pre-key': 'preKeys',
    'session': 'sessions',
    'sender-key': 'senderKeys',
    'app-state-sync-key': 'appStateSyncKeys',
    'app-state-sync-version': 'appStateVersions',
    'sender-key-memory': 'senderKeyMemory'
};

function useSingleFileAuthState(filename, logger) {
    let creds, keys = {}, saveCount = 0;

    const saveState = (forceSave) => {
        logger?.trace('Guardando estado de autenticación...');
        saveCount++;
        if (forceSave || saveCount > 5) {
            writeFileSync(filename, JSON.stringify({ creds, keys }, BufferJSON.replacer, 2));
            saveCount = 0;
        }
    };

    if (existsSync(filename)) {
        const result = JSON.parse(
            readFileSync(filename, { encoding: 'utf-8' }),
            BufferJSON.reviver
        );
        creds = result.creds;
        keys = result.keys;
    } else {
        creds = initAuthCreds();
        keys = {};
    }

    return {
        state: {
            creds,
            keys: {
                get: (type, ids) => {
                    const key = KEY_MAP[type];
                    return ids.reduce((dict, id) => {
                        let value = keys[key]?.[id];
                        if (value && type === 'app-state-sync-key') {
                            value = proto.AppStateSyncKeyData.fromObject(value);
                        }
                        if (value) dict[id] = value;
                        return dict;
                    }, {});
                },
                set: (data) => {
                    for (const _key in data) {
                        const key = KEY_MAP[_key];
                        keys[key] = keys[key] || {};
                        Object.assign(keys[key], data[_key]);
                    }
                    saveState();
                }
            }
        },
        saveState
    };
}

export default {
    bind,
    useSingleFileAuthState
};
