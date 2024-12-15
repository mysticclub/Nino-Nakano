const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import(global.baileys);
import _0x476670 from 'qrcode';
import _0xfe89fb from 'node-cache';
import _0x2f6acc from 'fs';
import 'path';
import _0x592074 from 'pino';
import 'util';
import 'ws';
const {
  child,
  spawn,
  exec
} = await import("child_process");
import { makeWASocket } from './lib/simple.js';
let rtx = '' + lenguajeGB.smsIniJadi();
let rtx2 = '' + lenguajeGB.smsIniJadi2();
if (global.conns instanceof Array) {
  console.log();
} else {
  global.conns = [];
}
let handler = async (_0x2f812c, {
  conn: _0x55c8b2,
  args: _0x38d18b,
  usedPrefix: _0xbb4327,
  command: _0x4af6fe,
  isOwner: _0x26e934
}) => {
  if (!global.db.data.settings[_0x55c8b2.user.jid].jadibotmd) {
    return _0x2f812c.reply('' + lenguajeGB.smsSoloOwnerJB());
  }
  const _0x316188 = _0x38d18b[0x0] && /(--code|code)/.test(_0x38d18b[0x0].trim()) ? true : !!(_0x38d18b[0x1] && /(--code|code)/.test(_0x38d18b[0x1].trim()));
  let _0x2c487c;
  let _0x5af2b;
  let _0x3c9fde;
  let _0x12a877 = global.db.data.users[_0x2f812c.sender];
  let _0x57749b = _0x2f812c.mentionedJid && _0x2f812c.mentionedJid[0x0] ? _0x2f812c.mentionedJid[0x0] : _0x2f812c.fromMe ? _0x55c8b2.user.jid : _0x2f812c.sender;
  let _0x27dce8 = '' + _0x57749b.split`@`[0x0];
  if (_0x316188) {
    _0x38d18b[0x0] = _0x38d18b[0x0].replace(/^--code$|^code$/, '').trim();
    if (_0x38d18b[0x1]) {
      _0x38d18b[0x1] = _0x38d18b[0x1].replace(/^--code$|^code$/, '').trim();
    }
    if (_0x38d18b[0x0] == '') {
      _0x38d18b[0x0] = undefined;
    }
  }
  if (!_0x2f6acc.existsSync("./GataJadiBot/" + _0x27dce8)) {
    _0x2f6acc.mkdirSync("./GataJadiBot/" + _0x27dce8, {
      'recursive': true
    });
  }
  if (_0x38d18b[0x0] && _0x38d18b[0x0] != undefined) {
    _0x2f6acc.writeFileSync("./GataJadiBot/" + _0x27dce8 + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(_0x38d18b[0x0], 'base64').toString("utf-8")), null, "\t"));
  } else {
    '';
  }
  if (_0x2f6acc.existsSync("./GataJadiBot/" + _0x27dce8 + "/creds.json")) {
    let _0x2dc837 = JSON.parse(_0x2f6acc.readFileSync("./GataJadiBot/" + _0x27dce8 + "/creds.json"));
    if (_0x2dc837) {
      if (_0x2dc837.registered = false) {
        _0x2f6acc.unlinkSync('./GataJadiBot/' + _0x27dce8 + "/creds.json");
      }
    }
  }
  const _0x4a5968 = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", "base64");
  exec(_0x4a5968.toString("utf-8"), async (_0x5141c7, _0xf5da8a, _0xf93ec7) => {
    const _0x4c5e1c = Buffer.from("CkphZGlib3QsIEhlY2hvIHBvciBAQWlkZW5fTm90TG9naWM", "base64");
    async function _0x5ac6ef() {
      let _0x4fed2a = _0x2f812c.mentionedJid && _0x2f812c.mentionedJid[0x0] ? _0x2f812c.mentionedJid[0x0] : _0x2f812c.fromMe ? _0x55c8b2.user.jid : _0x2f812c.sender;
      let _0x35657a = '' + _0x4fed2a.split`@`[0x0];
      if (!_0x2f6acc.existsSync("./GataJadiBot/" + _0x35657a)) {
        _0x2f6acc.mkdirSync("./GataJadiBot/" + _0x35657a, {
          'recursive': true
        });
      }
      if (_0x38d18b[0x0]) {
        _0x2f6acc.writeFileSync("./GataJadiBot/" + _0x35657a + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(_0x38d18b[0x0], "base64").toString("utf-8")), null, "\t"));
      } else {
        '';
      }
      let {
        version: _0xf6176a,
        isLatest: _0x2e3b3e
      } = await fetchLatestBaileysVersion();
      const _0x2ec628 = _0x303332 => {};
      const _0x2ea19 = new _0xfe89fb();
      const {
        state: _0x4bcf85,
        saveState: _0x4dcd3b,
        saveCreds: _0x3ff988
      } = await useMultiFileAuthState("./GataJadiBot/" + _0x35657a);
      const _0x2f6ab9 = {
        'printQRInTerminal': false,
        'logger': _0x592074({
          'level': "silent"
        }),
        'auth': {
          'creds': _0x4bcf85.creds,
          'keys': makeCacheableSignalKeyStore(_0x4bcf85.keys, _0x592074({
            'level': "silent"
          }))
        },
        'msgRetry': _0x2ec628,
        'msgRetryCache': _0x2ea19,
        'version': [0x2, 0xbb8, 0x3c8d6c7b],
        'syncFullHistory': true,
        'browser': _0x316188 ? ['Ubuntu', "Chrome", "110.0.5585.95"] : ["GataBot-MD (Sub Bot)", "Chrome", '2.0.0'],
        'defaultQueryTimeoutMs': undefined,
        'getMessage': async _0x179797 => {
          if (store) {}
          return {
            'conversation': "GataBot-MD"
          };
        }
      };
      let _0x513e7c = makeWASocket(_0x2f6ab9);
      _0x513e7c.isInit = false;
      let _0x269615 = true;
      async function _0x41768d(_0x1d35a3) {
        const {
          connection: _0x150fc1,
          lastDisconnect: _0x5a341d,
          isNewLogin: _0x2d5792,
          qr: _0x2cf55a
        } = _0x1d35a3;
        if (_0x2d5792) {
          _0x513e7c.isInit = false;
        }
        if (_0x2cf55a && !_0x316188) {
          _0x3c9fde = await _0x55c8b2.sendMessage(_0x2f812c.chat, {
            'image': await _0x476670.toBuffer(_0x2cf55a, {
              'scale': 0x8
            }),
            'caption': rtx.trim() + "\n" + _0x4c5e1c.toString("utf-8")
          }, {
            'quoted': _0x2f812c
          });
          if (_0x3c9fde && _0x3c9fde.key) {
            setTimeout(() => {
              _0x55c8b2.sendMessage(_0x2f812c.sender, {
                'delete': _0x3c9fde.key
              });
            }, 0x7530);
          }
          return;
        }
        if (_0x2cf55a && _0x316188) {
          _0x2c487c = await _0x55c8b2.sendMessage(_0x2f812c.chat, {
            'image': {
              'url': 'https://qu.ax/wyUjT.jpg' || gataMenu.getRandom()
            },
            'caption': rtx2.trim() + "\n" + _0x4c5e1c.toString('utf-8')
          }, {
            'quoted': _0x2f812c
          });
          await sleep(0xbb8);
          let _0x3e59af = await _0x513e7c.requestPairingCode(_0x2f812c.sender.split`@`[0x0]);
          _0x5af2b = await _0x2f812c.reply(_0x3e59af);
        }
        if (_0x2c487c && _0x2c487c.key) {
          setTimeout(() => {
            _0x55c8b2.sendMessage(_0x2f812c.sender, {
              'delete': _0x2c487c.key
            });
          }, 0x7530);
        }
        if (_0x5af2b && _0x5af2b.key) {
          setTimeout(() => {
            _0x55c8b2.sendMessage(_0x2f812c.sender, {
              'delete': _0x5af2b.key
            });
          }, 0x7530);
        }
        const _0x4c33e6 = _0x5a341d?.["error"]?.["output"]?.['statusCode'] || _0x5a341d?.['error']?.['output']?.["payload"]?.["statusCode"];
        console.log(_0x4c33e6);
        const _0x514585 = async _0x39db58 => {
          if (!_0x39db58) {
            try {
              _0x513e7c.ws.close();
            } catch {}
            _0x513e7c.ev.removeAllListeners();
            let _0x4889e7 = global.conns.indexOf(_0x513e7c);
            if (_0x4889e7 < 0x0) {
              return;
            }
            delete global.conns[_0x4889e7];
            global.conns.splice(_0x4889e7, 0x1);
          }
        };
        const _0x5df83e = _0x5a341d?.["error"]?.["output"]?.["statusCode"] || _0x5a341d?.["error"]?.["output"]?.["payload"]?.["statusCode"];
        if (_0x150fc1 === "close") {
          console.log(_0x5df83e);
          if (_0x5df83e == 0x195) {
            await _0x2f6acc.unlinkSync("./GataJadiBot/" + _0x35657a + '/creds.json');
            return await _0x2f812c.reply(lenguajeGB.smsreenvia());
          }
          if (_0x5df83e === DisconnectReason.restartRequired) {
            _0x5ac6ef();
            return console.log(lenguajeGB.smsConexionreem());
          } else {
            if (_0x5df83e === DisconnectReason.loggedOut) {
              sleep(0xfa0);
              return _0x2f812c.reply(lenguajeGB.smsJBConexionClose2());
            } else {
              if (_0x5df83e == 0x1ac) {
                await _0x514585(false);
                return _0x2f812c.reply(lenguajeGB.smsJBConexion());
              } else {
                if (_0x5df83e === DisconnectReason.connectionLost) {
                  await _0x5ac6ef();
                  return console.log(lenguajeGB.smsConexionperdida());
                } else {
                  if (_0x5df83e === DisconnectReason.badSession) {
                    return await _0x2f812c.reply(lenguajeGB.smsJBConexionClose());
                  } else {
                    if (_0x5df83e === DisconnectReason.timedOut) {
                      await _0x514585(false);
                      return console.log(lenguajeGB.smsConexiontiem());
                    } else {
                      console.log(lenguajeGB.smsConexiondescon());
                    }
                  }
                }
              }
            }
          }
        }
        if (global.db.data == null) {
          loadDatabase();
        }
        if (_0x150fc1 == "open") {
          _0x513e7c.isInit = true;
          global.conns.push(_0x513e7c);
          await _0x55c8b2.sendMessage(_0x2f812c.chat, {
            'text': _0x38d18b[0x0] ? '' + lenguajeGB.smsJBCargando(_0xbb4327) : '' + lenguajeGB.smsJBConexionTrue2() + (" " + (_0xbb4327 + _0x4af6fe))
          }, {
            'quoted': _0x2f812c
          });
          let _0x1d2c58 = ("\n👤 *Usuario:* " + (_0x2f812c.pushName || 'Anónimo') + "\n🗃️ *Registrado:* " + (_0x12a877.registered ? 'Si' : 'No') + "\n✅ *Verificación:* " + (_0x12a877.registered ? _0x12a877.name : 'No') + "\n🔑 *Método de conexión:* " + (_0x316188 ? "Código de 8 dígitos" : "Código QR") + "\n💻 *Browser:* " + (_0x316188 ? "Ubuntu" : "Chrome") + "\n🐈 *Bot:* " + gt + "\n⭐ *Versión del bot:* `" + vs + "`\n💫 *Versión sub bot:* `" + vsJB + "`\n\n> *¡Conviértete en sub-bot ahora!*\nwa.me/" + _0x2f812c.sender.split`@`[0x0] + "?text=" + (_0xbb4327 + _0x4af6fe) + "%20code\n").trim();
          let _0x5d8c2c = await _0x513e7c.profilePictureUrl(_0x4fed2a, 'image')['catch'](_0x425581 => gataMenu);
          await sleep(0xbb8);
          if (global.conn.user.jid.split`@`[0x0] != _0x513e7c.user.jid.split`@`[0x0]) {
            await _0x55c8b2.sendMessage(ch.ch1, {
              'text': _0x1d2c58,
              'contextInfo': {
                'externalAdReply': {
                  'title': "【 🔔 Notificación General 🔔 】",
                  'body': "🙀 ¡Nuevo sub-bot encontrado!",
                  'thumbnailUrl': _0x5d8c2c,
                  'sourceUrl': accountsgb,
                  'mediaType': 0x1,
                  'showAdAttribution': false,
                  'renderLargerThumbnail': false
                }
              }
            }, {
              'quoted': null
            });
          }
          await sleep(0xbb8);
          await joinChannels(_0x513e7c);
          if (!_0x38d18b[0x0]) {
            _0x55c8b2.sendMessage(_0x2f812c.sender, {
              'text': _0xbb4327 + _0x4af6fe + " " + Buffer.from(_0x2f6acc.readFileSync('./GataJadiBot/' + _0x35657a + "/creds.json"), "utf-8").toString("base64")
            }, {
              'quoted': _0x2f812c
            });
          }
        }
      }
      setInterval(async () => {
        if (!_0x513e7c.user) {
          try {
            _0x513e7c.ws.close();
          } catch (_0x1cd5a7) {
            console.log(await _0x2bed89(true)['catch'](console.error));
          }
          _0x513e7c.ev.removeAllListeners();
          let _0x5b5e91 = global.conns.indexOf(_0x513e7c);
          if (_0x5b5e91 < 0x0) {
            return;
          }
          delete global.conns[_0x5b5e91];
          global.conns.splice(_0x5b5e91, 0x1);
        }
      }, 0xea60);
      let _0x436920 = await import('../handler.js');
      let _0x2bed89 = async function (_0x1a4e92) {
        try {
          const _0x20fe4f = await import("../handler.js?update=" + Date.now())['catch'](console.error);
          if (Object.keys(_0x20fe4f || {}).length) {
            _0x436920 = _0x20fe4f;
          }
        } catch (_0x2ab0a7) {
          console.error(_0x2ab0a7);
        }
        if (_0x1a4e92) {
          const _0x1d90ea = _0x513e7c.chats;
          try {
            _0x513e7c.ws.close();
          } catch {}
          _0x513e7c.ev.removeAllListeners();
          _0x513e7c = makeWASocket(_0x2f6ab9, {
            'chats': _0x1d90ea
          });
          _0x269615 = true;
        }
        if (!_0x269615) {
          _0x513e7c.ev.off('messages.upsert', _0x513e7c.handler);
          _0x513e7c.ev.off("group-participants.update", _0x513e7c.participantsUpdate);
          _0x513e7c.ev.off('groups.update', _0x513e7c.groupsUpdate);
          _0x513e7c.ev.off('message.delete', _0x513e7c.onDelete);
          _0x513e7c.ev.off("call", _0x513e7c.onCall);
          _0x513e7c.ev.off('connection.update', _0x513e7c.connectionUpdate);
          _0x513e7c.ev.off("creds.update", _0x513e7c.credsUpdate);
        }
        _0x513e7c.welcome = lenguajeGB.smsWelcome();
        _0x513e7c.bye = lenguajeGB.smsBye();
        _0x513e7c.spromote = lenguajeGB.smsSpromote();
        _0x513e7c.sdemote = lenguajeGB.smsSdemote();
        _0x513e7c.sDesc = lenguajeGB.smsSdesc();
        _0x513e7c.sSubject = lenguajeGB.smsSsubject();
        _0x513e7c.sIcon = lenguajeGB.smsSicon();
        _0x513e7c.sRevoke = lenguajeGB.smsSrevoke();
        _0x513e7c.handler = _0x436920.handler.bind(_0x513e7c);
        _0x513e7c.participantsUpdate = _0x436920.participantsUpdate.bind(_0x513e7c);
        _0x513e7c.groupsUpdate = _0x436920.groupsUpdate.bind(_0x513e7c);
        _0x513e7c.onDelete = _0x436920.deleteUpdate.bind(_0x513e7c);
        _0x513e7c.onCall = _0x436920.callUpdate.bind(_0x513e7c);
        _0x513e7c.connectionUpdate = _0x41768d.bind(_0x513e7c);
        _0x513e7c.credsUpdate = _0x3ff988.bind(_0x513e7c, true);
        const _0x43e2de = new Date();
        const _0x230c56 = new Date(_0x513e7c.ev * 0x3e8);
        if (_0x43e2de.getTime() - _0x230c56.getTime() <= 0x493e0) {
          console.log("Leyendo mensaje entrante:", _0x513e7c.ev);
          Object.keys(_0x513e7c.chats).forEach(_0x25e0e9 => {
            _0x513e7c.chats[_0x25e0e9].isBanned = false;
          });
        } else {
          console.log(_0x513e7c.chats, "Omitiendo mensajes en espera.", _0x513e7c.ev);
          Object.keys(_0x513e7c.chats).forEach(_0x35281b => {
            _0x513e7c.chats[_0x35281b].isBanned = true;
          });
        }
        _0x513e7c.ev.on('messages.upsert', _0x513e7c.handler);
        _0x513e7c.ev.on('group-participants.update', _0x513e7c.participantsUpdate);
        _0x513e7c.ev.on("groups.update", _0x513e7c.groupsUpdate);
        _0x513e7c.ev.on("message.delete", _0x513e7c.onDelete);
        _0x513e7c.ev.on('call', _0x513e7c.onCall);
        _0x513e7c.ev.on('connection.update', _0x513e7c.connectionUpdate);
        _0x513e7c.ev.on("creds.update", _0x513e7c.credsUpdate);
        _0x269615 = false;
        return true;
      };
      _0x2bed89(false);
    }
    _0x5ac6ef();
  });
};
handler.help = ['jadibot', "serbot", "getcode", "rentbot"];
handler.tags = ['jadibot'];
handler.command = /^(jadibot|getcode|rentbot)/i;
handler.register = true;
export default handler;
function sleep(_0x2c7751) {
  return new Promise(_0x5021ba => setTimeout(_0x5021ba, _0x2c7751));
}
async function joinChannels(_0xa6b82) {
  for (const _0x420b65 of Object.values(global.ch)) {
    await _0xa6b82.newsletterFollow(_0x420b65)["catch"](() => {});
  }
}