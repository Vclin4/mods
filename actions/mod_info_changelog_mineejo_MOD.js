module.exports = {
  name: 'Changelog - MineEjo Mods',
  section: '#Mod Information',

  subtitle() {
    return 'Does nothing - Click "Edit" for more information'
  },

  fields: [],

  html() {
    return `
<div>
<div id ="wrexdiv" style="width: 550px; height: 350px; overflow-y: scroll;">
  <p>
  <h2>Discord Server</h2>
  <a href="#" onclick="DBM.openLink('https://discord.gg/SPAa5YchXQ')">● MineEjo Mods</a>
  </p>
</div>`
  },

  init() {},

  action() {},

  mod() {}
}