let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
    before: `╭────────────────╮
          💫  *ᴍᴅ-ʙᴏᴛ* 💫           
╰────────────────╯
       
  `.trimStart(),
  header: '┌─〔 %category 〕',
  body: '├ %cmd',
  footer: '└────\n',
  after: `
   ᴍᴅ-ʙᴏᴛ
   ᴹᴼᴰᵁᴸᴬᴿ ᵂᴴᴬᵀᔆᴬᴾᴾ ᴮᴼᵀ
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['git', 'game', 'xp', 'stiker','quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools','anime','videomaker', 'fun', 'database', 'audio','info','owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Main',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'anime': 'Anime',
    'sticker': 'Stiker',
    'shell': 'Magic Shells',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Disabled)'}`,
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'Video Maker':'videomaker',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'audio': 'Voice Changer',
    'info': 'Info',
    '': 'No Category',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'shell') tags = {
    'shell': 'Magic Shells'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Disabled)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'videomaker') tags = {
    'videomaker': 'Video Maker'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'audio') tags = {
    'audio': 'Voice Changer'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `HI,
╭━━━━━━ᆫ ᴍᴇɴᴜ ᄀ━━━━━━
┃ 🎈  Oi ${ucapan()}
┃ 🎈  *𝙽𝙰𝙼𝙴* : ${name}
┃ 🎈  *𝙱𝙾𝚃*   : ᴍᴅ-ʙᴏᴛ
┃ 🎈  *𝙾𝚆𝙽𝙴𝚁* :  ᴍᴜɴᴀᴠɪʀ
┃ 🎈  *𝙿𝚁𝙴𝙵𝙸𝚇* : ᴍᴜʟᴛɪ ᴘʀᴇғɪx 
┃ 🎈  *𝚆𝙴𝙴𝙺* : ${week},
┃ 🎈  *𝙳𝙰𝚃𝙴* : ${date},
╰━━━━━━━━━━━━━━━━━━━━━━━ \n`
          
           .trim(),
           "description": "*𝙳𝚘𝚗'𝚝 𝚂𝚙𝚊𝚖*",
          "buttonText": "Click  Here",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `ᴍᴅ-ʙᴏᴛ`,
                  "description": "ᴍᴜɴᴀᴠɪʀ",
                  "rowId": ".? owner"
                }, {
                  "title": "𝚐𝚊𝚖𝚎𝚜",
                  "description": "",
                  "rowId": ".? game"

                }, {
                  "title": "𝚡𝚙",
                  "description": "",
                  "rowId": ".? xp"

                },  {
                  "title": "𝚅𝚒𝚍𝚎𝚘 𝙼𝚊𝚔𝚎𝚛",
                  "description": "",
                  "rowId": ".? videomaker"

                },{
                  "title": "𝚜𝚝𝚒𝚌𝚔𝚎𝚛",
                  "description": "",
                  "rowId": ".? stiker"
                }, { 
                "title": "𝙰𝚗𝚒𝚖𝚎",
                "description": "",
                "rowId": ".? anime"
              },  {
                  "title": "𝚀𝚞𝚘𝚝𝚎𝚜",
                  "description": "",
                  "rowId": ".? quote"
                }, {
                  "title": "𝙰𝚍𝚖𝚒𝚗",
                  "description": "",
                  "rowId": ".? admin"
                }, {
                  "title": "𝙶𝚛𝚞𝚙",
                  "description": "",
                  "rowId": ".? grup"
                }, {
                  "title": "𝙿𝚛𝚎𝚖𝚒𝚞𝚖",
                  "description": "",
                  "rowId": ".? premium"
                }, {
                  "title": "𝙸𝚗𝚝𝚎𝚛𝚗𝚎𝚝",
                  "description": "",
                  "rowId": ".? internet"
                }, {
                  "title": "𝙰𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜",
                  "description": "",
                  "rowId": ".? anonymous"
                }, {
                  "title": "𝙼𝚊𝚐𝚒𝚌 𝚂𝚎𝚕𝚕",
                  "description": "",
                  "rowId": ".? magicshell"
                }, {
                  "title": "𝙽𝚞𝚕𝚒𝚜 & 𝙻𝚘𝚐𝚘",
                  "description": "",
                  "rowId": ".? nulis"
                }, {
                  "title": "𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛",
                  "description": "",
                  "rowId": ".? downloader"
                }, {
                  "title": "𝚃𝚘𝚘𝚕𝚜",
                  "description": "",
                  "rowId": ".? tools"
                }, {
                  "title": "𝚅𝚘𝚒𝚌𝚎 𝚌𝚑𝚊𝚗𝚐𝚎𝚛",
                  "description": "",
                  "rowId": `.? audio`
                }, {
                  "title": "𝙵𝚞𝚗",
                  "description": "",
                  "rowId": ".? fun"
                }, {
                  "title": "𝙳𝚊𝚝𝚊𝚋𝚊𝚜𝚎",
                  "description": "",
                  "rowId": ".? database"
                },{
                  "title": "𝙾𝚠𝚗𝚎𝚛",
                  "description": "",
                  "rowId": ".? owner"
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // use this if you use business whatsapp
    //   throw `
    // ┌〔 LIST MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Presented by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Ready for *${_p}levelup*` : `${max - exp} More XP for levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonImg(m.chat, await (await fetch("https://raw.githubusercontent.com/Neeraj-x0/Millie/main/Millie/mills.jpeg")).buffer(), text.trim(), '© ᴍɪʟʟɪᴇ ©', 'Owner Bot', '.owner', 'All Commands', '.listt', m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry, Try Again', m)
    throw e
  }
}
handler.help = ['menu', 'help','list','millie', '?']
handler.tags = ['main']
handler.command = /^(list|menu|help|millie|bot|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false


module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  res = "Good Morning 🌄"
  if (time >= 4) {
    res = "Good Morning 🌞"
  }
  if (time > 10) {
    res = "Good afternoon 🌅"
  }
  if (time >= 15) {
    res = "Good Evening 🌆"
  }
  if (time >= 18) {
    res = "Good Night 🌌"
  }
  return res
}
