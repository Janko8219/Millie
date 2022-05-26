let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => u.jid)
    m.reply(`${text ? `${text}\n` : ''}┌─〔 𝚃𝙰𝙶 𝙰𝙻𝙻 〕\n` + users.map(v => '├ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
        contextInfo: { mentionedJid: users }
    })
}

handler.help = ['otagall']
handler.tags = ['owner']
handler.command = ['tagall']

handler.owner = true

module.exports = handler
