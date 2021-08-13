module.exports = {
  name: 'Check Update - MineEjo Mods',
  section: '#Mod Information',

  subtitle: function (data) {
    return `Set this action to event: Bot Initialization`
  },

  fields: ['updatecount'],


  html: function (isEvent, data) {
    return `
<div>
  <div style="width: 100%; float: left;">
    <span style="float: left; margin-top: 3px;">Number of updates:</span>
    <input style="background-color: transparent; float: left; width: 10%; color: gray;" id="updatecount" class="round" type="text" value="0" disabled />
  </div>
  <div>
</div>`
  },

  init: function () { },

  async action(cache) {
    const Mods = this.getMods()
    const fetch = Mods.require('node-fetch')
    const data = cache.actions[cache.index]
    let updatecount = this.evalMessage(data.updatecount, cache);
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
  },

  mod: function (DBM) {}
}
