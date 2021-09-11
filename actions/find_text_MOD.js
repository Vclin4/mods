module.exports = {
    name: 'Find Text',
    section: 'Other Stuff',

    subtitle(data) {
        return `Find "${data.toFind}"`;
    },

    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        return [data.varName, 'Fined Text'];
    },
    fields: ['text', 'toFind', 'option', 'storage', 'varName'],

    html(isEvent, data) {
        return `
<div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Find Text Mod Description</summary>
        [Version 1.0] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Text search, text positioning, and all together. 
        <div style="padding: 0 15px 18px 15px; background: rgba(0,0,0,0.13); border-radius: 3px">
            <br><p>
                The text position of type <span style="color: #3374d7; padding-left: 3px; padding-right: 3px;">1,4</span> is an array, and <span style="color: #3374d7; padding-left: 3px; padding-right: 3px;">1</span> is the <span style="color: #3374d7; padding-left: 3px; padding-right: 3px;">starting point</span> and <span style="color: #3374d7; padding-left: 3px; padding-right: 3px;">4</span> is the<span style="color: #3374d7; padding-left: 3px; padding-right: 3px;"> end point</span>.
            <br></p>
        </div>
    </details>
</div>
    <div style="float: left; width: 65%; padding-top: 8px;">
      Source Text:
      <input id="text" class="round" placeholder="Insert text here..." type="text"/>
    </div>
    <div style="float: right; width: 29%; padding-top: 8px;">
      Option:<br>
      <select id="option" class="round">
        <option value="0" selected>Word</option>
        <option value="1">Word position</option>
        <option value="2">Word + position</option>
    </select>
    </div>
    <div style="float: left; width: 99%; padding-top: 8px;">
      Text to Find:
      <textarea id="toFind" rows="3" style="width: 100%; white-space: nowrap; resize: vertical;" placeholder="Insert text here..."/></textarea>
    </div>
    <div style="float: left; width: 35%; padding-top: 8px;">
      Store Result In:<br>
      <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
        ${data.variables[0]}
      </select>
    </div>
    <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
      Variable Name:<br>
      <input id="varName" class="round" type="text" >
    </div>
</div>`;
    },

    init() {
        const {glob, document} = this;
        glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },

    action(cache) {
        const data = cache.actions[cache.index];
        const text = this.evalMessage(data.text, cache);
        const toFind = this.evalMessage(data.toFind, cache);
        const option = parseInt(data.option, 10);

        if (!toFind) return console.log('Find Text MOD: Text to find is missing!');
        if (!text) return console.log('Find Text MOD: Source text is missing!');

        let result;
        switch (option) {
            case 0:
                result = text.slice(text.indexOf(toFind), toFind.length + text.indexOf(toFind));
                break;
            case 1:
                result = [text.indexOf(toFind), toFind.length + text.indexOf(toFind)];
                break;
            case 2:
                result = [text.slice(text.indexOf(toFind), toFind.length + text.indexOf(toFind)), text.indexOf(toFind), toFind.length + text.indexOf(toFind)];
                break;
        }
        if (!text.includes(toFind)) result = 'undefined';

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);
        this.callNextAction(cache);
    },

    mod() {
    },
};
