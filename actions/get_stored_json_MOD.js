module.exports = {
  name: 'Get Stored Json',
  section: 'JSON Things',
  subtitle: function (data) {
    return `${data.path}`
  },

  variableStorage: function (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    const dataType = 'JSON'
    return ([data.varName, dataType])
  },

  fields: ['path', 'format', 'code', 'storage', 'varName'],

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
    <div style="width: 20%; float: left; margin-top: 15px;">
    Format:<br>
    <select class="round" id="format">
    <option value="0">Json</option>
    <option value="1">String</option></select>
    </div>
    <div style="width: 75%; float: right; margin-top: 15px;">
    Js Code:<br>
    <input id="code" class="round" type="text" placeholder="json.item-name">
    </div>
<div>
  <div style="float: left; width: 35%; margin-top: 15px;">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%; margin-top: 15px;">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`
  },
  init: function () { },
  
  action: function (cache) {
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const path = this.evalMessage(data.path, cache)
    const code = this.evalMessage(data.code, cache)
    const format = parseInt(data.format, cache)
    let json = require(require("path").join(process.cwd(), path));
    if (code.length > 0) json = eval(code);
    if (format == 1) json = JSON.stringify(json);

    this.storeValue(json, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod: function (DBM) {}
}
