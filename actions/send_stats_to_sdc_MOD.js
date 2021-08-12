module.exports = {
	name: 'Sends Stats to SDC',
	section: 'Other Stuff',

	subtitle(data) {
		const info = ['Send stats to SDC!']
		return `Send stats to SDC!`
	},

	fields: ['sdcToken', 'shardsCount', 'serversCount', 'clientID', 'packageList'],

html() {
	return `
<div style="width: 99%; overflow: visible;">
<div style="width: 100%; float: left; padding-bottom: 7px;">
<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">Mode Info:</a>
<textarea id="descMODE" style="width: 100%; resize: none; background-color: #00000046; border-left: 3px #53585f solid; border-top: none; border-bottom: none; border-right: none; transition: 0.2s; overflow: hidden; color: gray" disabled>Hover me!
Send monitoring statistics to SDC https://bots.server-discord.com.
- Make sure you put a delay between sending statistics.
- Specify 0 shards if you don't have any.
- To send, you need the npm package - node-fetch.
Version 1.0;
</textarea>
<style>#descMODE {height: 25px;} #descMODE:hover {height: 120px;}</style>
</div>
  <div style="float: left; width: 49.5%;">
  SDC Token:<br>
    <input id="sdcToken" class="round" type="text" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...">
  </div>
  <div style="float: right; width: 45.5%;">
	Servers Count:<br>
	<input id="serversCount" class="round" type="text" placeholder="0">
  </div>
  <div style="float: left; width: 49.5%; margin-top: 15px;">
    Client ID:<br>
    <input id="clientID" class="round" type="text" placeholder="837359492685103114">
  </div>
  <div style="float: right; width: 45.5%; margin-top: 15px;">
  	Shards Count:<br>
  	<input id="shardsCount" class="round" type="text" placeholder="0">
  </div>
</div>`
	},

	init() { },

	async action(cache) {
		const data = cache.actions[cache.index]
		const token = this.evalMessage(data.sdcToken, cache)
		const shard = this.evalMessage(data.shardsCount, cache)
		const server = this.evalMessage(data.serversCount, cache)
		const clientID = this.evalMessage(data.clientID, cache)
		const Mods = this.getMods()
		const fetch = Mods.require('node-fetch')
		await fetch(`https://api.server-discord.com/v2/bots/${clientID}/stats`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `SDC ${token}`,
			},
			body: JSON.stringify({ servers: server, shards: shard }),
		}).catch((err) => console.error(`#${cache.index + 1} ${this.name}: ${err.stack}`));
		this.callNextAction(cache)
	},

	mod() { }
}