module.exports = {
	name: 'Sends Stats to SDC',
	section: 'Other Stuff',

	subtitle(data) {
		const info = ['Send stats to SDC!']
		return `Send stats to SDC!`
	},

	fields: ['sdcToken', 'shardsCount', 'clientID', 'packageList'],

	html() {
		return `
<div id="modinfo">
	<div style="float: left; width: 99%; padding-top: 8px;">
	<p>
    Author: MineEjo#6143 | https://github.com/MineEjo
  </p>
	</div>
  <div style="float: left; width: 99%; padding-top: 8px;">
    Your SDC Token:<br>
    <input id="sdcToken" class="round" type="text">
  </div><br>
  <div style="float: left; width: 99%; padding-top: 8px;">
    Shards Count:<br>
    <input id="shardsCount" class="round" type="text">
  </div><br>
	<div style="float: left; width: 99%; padding-top: 8px;">
    Client ID:<br>
    <input id="clientID" class="round" type="text">
  </div><br>
	<div style="float: left; width: 99%; padding-top: 8px;">
	<p>
    - Make sure you put a delay between sending statistics.
  </p>
	<p>
    - Specify 0 shards if you don't have any.
  </p>
	<p>
    - To send, you need the npm package - node-fetch.
  </p>
	</div>
  </div>
</div>`
	},

	init() { },

	async action(cache) {
		const data = cache.actions[cache.index]
		const token = this.evalMessage(data.sdcToken, cache)
		const shard = this.evalMessage(data.shardsCount, cache)
		const clientID = this.evalMessage(data.clientID, cache)
		const Mods = this.getMods()
		const client = this.getDBM().Bot.bot
		const fetch = Mods.require('node-fetch')
		await fetch(`https://api.server-discord.com/v2/bots/${clientID}/stats`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `SDC ${token}`,
			},
			body: JSON.stringify({ servers: client.guilds.cache.size, shards: shard }),
		}).catch((err) => console.error(`#${cache.index + 1} ${this.name}: ${err.stack}`));
		this.callNextAction(cache)
	},

	mod() { }
}