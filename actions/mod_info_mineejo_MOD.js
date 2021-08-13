module.exports = {
  name: 'MineEjo Mods',
  section: '#Mod Information',

  subtitle: function (data) {
    return `Set this action to event: Bot Initialization`
  },

  fields: ['updatecount', 'updatecheck'],


  html: function (isEvent, data) {
    return `
<div>
  <div>
    <h1 style="color: #fff">Welcome!</h1>
    Thank you for using the DBM Mod Collection!<br>
    If you want to tell us something, join the Discord Guild below.
    And if something doesn't work feel free to create an issue on GitHub
    or open <a class="discord_channel" href="#" onclick="DBM.openLink('https://discord.com/channels/865028774206505000/866332406976872448/875833885580214272')">#support</a> and describe your problem.
    <h3 style="color: #fff">Discord:</h3>
    Join the Discord Guild to stay updated and be able to suggest things.<br> <a class="discord_channel" href="#" onclick="DBM.openLink('https://discord.gg/SPAa5YchXQ')">discord.gg/SPAa5YchXQ</a>
    <p style="margin-top: 3%">
    Your version:
    <input style="width: 10%; padding-left: 4%; padding-right: 4%; margin-left: 1%" id="updatecount" class="discord_code_blocks" type="text" value="1" disabled />
    <span style="margin-left: 1%">Update check:</span><select id="updatecheck" class="discord_code_blocks" style="margin-left: 1%">
    <option value="0">Automatically</option>
    <option value="1">None</option>
    </select>
    <p>Set this action to event: Bot Initialization, to check for updates when the bot starts.</p>
    </p>

    <style>
    a.discord_channel {border-radius: 3px; background-color: rgba(114, 137, 218, .1);color: #7289da;cursor: pointer;font-family: sans-serif;padding: 2px;}
    a.discord_channel:hover {background-color: rgba(114, 137, 218, .7);color: #fff;}
    .discord_code_blocks {background: #2f3136;border: 1.5px solid #2b2c31;border-radius: 7px;box-sizing: border-box;overflow: hidden;padding: 4px 10px;color: #839496;font-family: Consolas;}
    </style>
  <div>
</div>`
  },

  init: function () { },

  async action(cache) {
    const Mods = this.getMods()
    const fetch = Mods.require('node-fetch')
    const data = cache.actions[cache.index]
    let updatecount = this.evalMessage(data.updatecount, cache);
    const updatecheck = parseInt(data.updatecheck, cache);
    if (updatecheck == 0) {
      try {
        let html = await fetch('https://raw.githubusercontent.com/MinEjo-DBM/mods/main/README.md').then((r) => r.text());
        let startpos = html.indexOf('Number of updates:');
        let updatecount_github = html.slice(startpos, 50).trim().replace('Number of updates: ', '');
        if (updatecount == updatecount_github) { }
        else { console.log("DBM MineEjo: The mod repository has been updated! Please update it. https://github.com/MinEjo-DBM/mods"); }
        this.callNextAction(cache)
      } catch (err) {
        console.error(err)
      }
    }
    else {
      this.callNextAction(cache)
    }
  },

  mod: function (DBM) {}
}
