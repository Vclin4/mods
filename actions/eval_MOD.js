module.exports = {
  name: "Eval",
  section: "Tools",

  subtitle(data) {
    return `Evaluate: ${data.evaluate}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return [data.varName, "List"];
  },

  fields: ["storage", "varName", "evaluate", "token_option"],

  html(isEvent, data) {
    return `
<div style="width: 99%; overflow: visible;">
<div style="width: 100%; float: left; padding-bottom: 7px;">
<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">Mode Info:</a>
<textarea id="descMODE" style="width: 100%; resize: none; background-color: #00000046; border-left: 3px #53585f solid; border-top: none; border-bottom: none; border-right: none; transition: 0.2s; overflow: hidden; color: gray;" disabled>Hover me!
The eval() function evaluates JavaScript code represented as a string.
Warning: Executing JavaScript from a string is an enormous security risk. It is far too easy for a bad actor to runarbitrary code when you use eval()
Version 1.0;
</textarea>
<style>#descMODE {height: 25px;} #descMODE:hover {height: 140px;}</style>
</div>
  <div style="float: left; width: 100%;">
  Evaluate:<br>
    <textarea style="resize: vertical; width: 100%; height: 100px;" id="evaluate"></textarea>
  </div>
  <div style="float: left; width: 35%; margin-top: 15px;">
  Output Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%; margin-top: 15px;"">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
  <div style="float: left; width: 35%; margin-top: 15px;">
  Token:<br>
    <select id="token_option" class="round"">
      <option value="0">Hide</option>
      <option value="1">Visible</option>
    </select>
  </div>
</div>`;
  },

  init() {},

  action(cache) {
    const Mods = this.getMods()
    const data = cache.actions[cache.index];
    let evaluate = this.evalMessage(data.evaluate, cache);
    const token_option = parseInt(data.token_option, cache);
    if (token_option == 0) {
      for (let index = 0; index != evaluate.length; index++) {
        evaluate = evaluate.replace('token', Math.random());
      }
    }
    let query = evaluate;
    const type = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    const { inspect } = Mods.require('util');

    let output = '';
    let output_type = '';

    if (evaluate == "undefined") { output = 'Error: Arguments not found'; }
    else {
      try {
        const evald = eval(evaluate)
        let res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 })

        output = res;

        if (!Boolean(res) || (!Boolean(evald) && evald !== 0)) output = 'undefined';
        else {
          output_type = typeof evald;
        }
      } catch (error) {
        output += error;
      }
    }

    output = [output, output_type, query]
    this.storeValue(output, type, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
