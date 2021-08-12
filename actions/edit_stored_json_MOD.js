module.exports = {
  name: 'Edit Stored Json',
  section: 'JSON Things',
  subtitle: function (data) {
    return `${data.path}`
  },

  fields: ['path', 'code'],

  html: function (isEvent, data) {
    return `
  <div style="width: 99%;">
<div style="width: 100%; float: left; padding-bottom: 7px;">
<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">Mode Info:</a>
<textarea id="descMODE" style="width: 100%; resize: none; background-color: #00000046; border-left: 3px #53585f solid; border-top: none; border-bottom: none; border-right: none; transition: 0.2s; overflow: hidden; color: gray" disabled>Hover me!
JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.
Some examples:
{ "homeTown": "Metro City", "active": true, "members": [
    { "power": ["Radiation resistance"] } ] }
Js Code:
json.homeTown - Metro City
json['active'] - true
json['members'][0]['power'][0] - Radiation resistance
Version 1.0;
</textarea>
<style>#descMODE {height: 25px;} #descMODE:hover {height: 230px;}</style>
</div>
 <div style="width: 100%; float: left">
  Path:<br>
  <input id="path" class="round" type="text" placeholder="./data/test.json">
  </div<
</div>
    <div style="width: 100%; float: right; margin-top: 15px;">
    Js Code:<br>
    <textarea style="resize: vertical; width: 100%;" rows="8" id="code" class="round" type="text" placeholder="json.item = 'Nice Item';"></textarea>
    </div>
<div>
</div>`
  },
  init: function () { },
  
  action: function (cache) {
    const data = cache.actions[cache.index];
    const path = this.evalMessage(data.path, cache);
    const code = this.evalMessage(data.code, cache);
    const fs = require("fs");
    let json = JSON.parse(fs.readFileSync(path, 'utf8'));
    if (code.length > 0) eval(code);
    else console.error("Edit Stored Json: no code is specified, the action is not used.");
    fs.writeFileSync(path, JSON.stringify(json));
    this.callNextAction(cache);
  },

  mod: function (DBM) {}
}
