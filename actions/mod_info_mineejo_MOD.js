module.exports = {
    name: 'MineEjo Mods',
    section: '#Mod Information',

    subtitle(data) {
        return `Set this action to event: Bot Initialization`
    },

    fields: ['updatecount', 'updatecheck', 'update'],


    html(isEvent, data) {
        return `
<div>
  <div>
    <h3 style="color: #fff">Discord:</h3>
    Join the Discord Guild to stay updated and be able to suggest things.<br> <a class="discord_channel" href="#" onclick="DBM.openLink('https://discord.gg/SPAa5YchXQ')">discord.gg/SPAa5YchXQ</a>
    <a style="margin-left: 1%" class="discord_channel" href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM/mods/archive/refs/heads/main.zip')">Download Mods</a>
    <p style="margin-top: 3%">
    Your version:
    <input style="width: 10%; margin-left: 1%" id="updatecount" class="discord_code_blocks" type="text" value="2" disabled /><br><br>
    <span>Update check:</span><select id="updatecheck" class="discord_code_blocks" style="margin-left: 1%">
    <option value="0">Yes</option>
    <option value="1">No</option>
    </select><br><br>
    <span>Update:</span><select id="update" class="discord_code_blocks" style="margin-left: 1%">
    <option value="0">Automatically</option>
    <option value="1">Manually</option>
    </select><br>
    <p>Set this action to event: Bot Initialization, to check for updates when the bot starts.</p>
    </p>

    <style>
    a.discord_channel {border-radius: 3px; background-color: rgba(114, 137, 218, .1);color: #7289da;cursor: pointer;font-family: sans-serif;padding: 2px;}
    a.discord_channel:hover {background-color: rgba(114, 137, 218, .7);color: #fff;}
    .discord_code_blocks {cursor: pointer; background: #2f3136;border: 1px solid #2b2c31;border-radius: 7px;box-sizing: border-box;overflow: hidden;padding: 4px 10px;color: #839496;font-family: Consolas,serif;}
    </style>
  <div>
</div>`
    },

    init() {
    },

    async action(cache) {
        const Mods = this.getMods();
        const fetch = Mods.require('node-fetch');
        const data = cache.actions[cache.index];
        let updatecount = this.evalMessage(data.updatecount, cache);
        const updatecheck = parseInt(data.updatecheck, cache);
        let update = parseInt(data.update, cache);
        if (updatecheck === 0) {
            try {
                let html = await fetch('https://raw.githubusercontent.com/MinEjo-DBM/mods/main/README.md').then((r) => r.text());
                let startpos = html.indexOf('Number of updates:');
                let updatecount_github = html.slice(startpos, 50).trim().replace('Number of updates: ', '');
                if (updatecount === updatecount_github) {
                } else if (update === 1) {
                    console.log("DBM MineEjo: The mod repository has been updated! Please update it. https://github.com/MinEjo-DBM/mods");
                }
                if (update === 0) {
                    let actionhtml = await fetch('https://raw.githubusercontent.com/MinEjo-DBM/mods/main/actions/README.md').then((r) => r.text());
                    let startposactionid = actionhtml.indexOf('Actions File ID:');
                    let actionid = actionhtml.slice(startposactionid, 50).trim().replace('Actions File ID: ', '');
                    const fs = require('fs');

                    function download() {
                        const url = `https://cdn.discordapp.com/attachments/874780634822901841/${actionid}/actions.zip`
                        const https = require('https')
                        https.get(url, resp => resp.pipe(fs.createWriteStream(`./resources/mods.zip`)));
                    }

                    fs.access('./resources/mods.zip', function (error) {
                        if (error) {
                            download();
                        } else {
                            fs.unlinkSync('./resources/mods.zip');
                            download();
                        }
                    });
                    let DecompressZip = require('decompress-zip');
                    let unzipper = new DecompressZip('./resources/mods.zip')
                    unzipper.extract({
                        path: 'actions',
                        filter(file) {
                            return file.type !== "SymbolicLink";
                        }
                    });
                    fs.unlinkSync('./resources/mods.zip');
                    update = parseInt(data.updatecount_github, cache);
                }
                this.callNextAction(cache)
            } catch (err) {
                console.error(err)
            }
        } else {
            this.callNextAction(cache)
        }
    },

    mod(DBM) {
    }
}
