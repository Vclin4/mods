module.exports = {
  name: "Run Script - Improved",
  section: "Other Stuff",

  subtitle(data) {
    return `${data.code}`;
  },

  fields: ["code", "varName"],

  html(isEvent, data) {
    return `
        <div style="right: 53px;" class="helpDiv">
        <button
          class="helpButton icon"
          onclick="changeState('helpTextDiv');">
          <i class="help icon"></i>
          </button>
        </div>
        <div style="right: 53px;" id="helpTextDiv">
          <ul>
            <h3>Note</h3>
            <li>The mod was created for the <a href="#" onclick="DBM.openLink('https://github.com/MineEjo/DBM-Horizon-Theme')">Horizon theme</a>.</li>
            <li>Mod author - <a href="#" onclick="DBM.openLink('https://github.com/MineEjo')">MineEjo</a>.</li>
            <li>Discord Bot Maker <a href="#" onclick="DBM.openLink('https://silversunset.net/dbm/scripts?topic=How_do_scipts_work')">Script Docs</a>.</li>
            <h3>Variable Caching</h3>
            this.storeValue(jsVariable, 1, "variableName", cache);<br><br>
            So the first parameter, jsVariable should be changed to what ever js variable you want to save.<br>
            The second parameter, the 1 can be changed.<br>
            The number ranges from 1-3<br>
            1 = Temp Variable<br>
            2 = Server Variable<br>
            3 = Global Variable<br>
            The last parameter, the variableName can be changed to whatever you want the new DBM variable's name to be set to. </li>
            <h3>Other</h3>
            <li>Search Bind: Ctrl + F</li>
          </ul>
        </div>
        <div id="maximixeDiv">
          <button
          id="fullScreen"
          class="icon"
          onclick="changeScreen()">
          <i class="maximize icon"></i>
          </button>
        </div>
<div id="wrexdiv" style="width: 100%; height: 91vh;>
  <div style="width: 100%; height: 91vh;">
    <iframe id="JSEditor" style="visibility: hidden; width: 100%; height: 91vh;" frameBorder="0"></iframe>
    <textarea id="code" name="is-eval" style="display: none; width: 100%; height: 91vh; white-space: nowrap; resize: none;"></textarea>
  </div>
  </div>
</div>
<style>
  .action-input {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>`;
  },

  init() {
    const { document } = this;

    document.getElementById("JSEditor").src =
      "data:text/html," +
      `
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js" integrity="sha256-gkWBmkjy/8e1QUz5tv4CCYgEtjR8sRlGiXsMeebVeUo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ext-language_tools.js" integrity="sha256-PAtX04Rk2WBELn+z4CmyvM2E5bhFBNEplF8mrHBvMJc=" crossorigin="anonymous"></script>

<div id="editor"></div>
<textarea id="hideCode" style="display: none;"></textarea>

<script>
  var editor = ace.edit("editor", {
    mode: "ace/mode/javascript",
    theme: "ace/theme/monokai"
  });

  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    autoScrollEditorIntoView: true,
    showPrintMargin: false
  });

  document.getElementById("hideCode").addEventListener("_load", function() {
    editor.session.setValue(document.getElementById("hideCode").value);
  });

  editor.session.on('change', function() {
    document.getElementById("hideCode").value = editor.getValue();
  });
</script>
<style>
  #editor {
    position: absolute;
    color: #bbbbbb;
    background: #1c1e26;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 14.0px;
  }

  .ace-monokai {
    color: #bbbbbb;
    background: #1c1e26;
  }

  .ace-monokai .ace_gutter {
    background: #1c1e26;
    color: #4A4F5B;
    border-right: 1px solid #3B3F48;
  }

  .ace-monokai .ace_marker-layer .ace_selection {
    background: #22252f;
  }

  .ace-monokai.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 0 0 #black;
  }

  .ace-monokai .ace_marker-layer .ace_step {
    background: none;
  }

  .ace-monokai .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #3B3F48;
  }

  .ace-monokai .ace_marker-layer .ace_active-line {
    background: #22252f;
  }

  .ace-monokai .ace_gutter-active-line {
    background-color: #22252f;
    color: #bbbbbb;
  }

  .ace-monokai .ace_marker-layer .ace_selected-word {
    border: 1px solid #3B3F48;
  }

  .ace-monokai .ace_invisible {
    color: #22252f;
  }

  .ace-monokai .ace_cursor {
    color: #d34c6e;
  }

  .ace-monokai .ace_entity.ace_name.ace_tag,
  .ace-monokai .ace_keyword,
  .ace-monokai .ace_meta.ace_tag,
  .ace-monokai .ace_storage {
    color: #d55170;
  }

  .ace-monokai .ace_punctuation,
  .ace-monokai .ace_punctuation.ace_tag {
    color: #fff;
  }

  .ace-monokai .ace_constant.ace_character,
  .ace-monokai .ace_constant.ace_language,
  .ace-monokai .ace_constant.ace_numeric,
  .ace-monokai .ace_constant.ace_other {
    color: #24a2ae;
  }

  .ace-monokai .ace_invalid {
    color: #F8F8F0;
    background-color: #d55170;
  }

  .ace-monokai .ace_invalid.ace_deprecated {
    color: #F8F8F0;
    background-color: #24a2ae;
  }

  
  .ace-monokai .ace_support.ace_constant,
  .ace-monokai .ace_support.ace_function {
    color: #24a2a1;
  }

  .ace-monokai .ace_storage.ace_type,
  .ace-monokai .ace_support.ace_class,
  .ace-monokai .ace_support.ace_type {
    font-style: italic;
    color: #d55170;
  }

  .ace-monokai .ace_entity.ace_name.ace_function,
  .ace-monokai .ace_entity.ace_other,
  .ace-monokai .ace_entity.ace_other.ace_attribute-name,
  .ace-monokai .ace_variable {
    color: #896eca;
  }

  .ace-monokai .ace_variable.ace_parameter {
  font-style: italic;
  color: #FD971F
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  .ace-monokai .ace_string {
    color: #e49b60;
  }

  .ace-monokai .ace_comment {
    color: #4c4d4f;
  }

  ::-webkit-scrollbar-track {
    background: #1c1e26;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #22252f;
  }

  ::-webkit-scrollbar-thumb:hover {
  background-color: #44475d;
  }
</style>`;
    document.getElementById("JSEditor").addEventListener("load", function () {
      if (document.getElementById("code").value) {
        this.contentWindow.document.getElementById("hideCode").value =
          document.getElementById("code").value;
        // eslint-disable-next-line no-undef
        this.contentWindow.document
          .getElementById("hideCode")
          .dispatchEvent(new Event("_load"));
      }
      this.style.visibility = "visible";
    });

    document.getElementById("code").addEventListener("input", () => {
      document
        .getElementById("JSEditor")
        .contentWindow.document.getElementById("hideCode").value =
        document.getElementById("code").value;
      // eslint-disable-next-line no-undef
      document
        .getElementById("JSEditor")
        .contentWindow.document.getElementById("hideCode")
        .dispatchEvent(new Event("_load"));
    });

    document
      .getElementById("createAction")
      .setAttribute(
        "onclick",
        'if(document.getElementById("JSEditor").contentWindow.document.getElementById("hideCode").value) document.getElementById("code").value = document.getElementById("JSEditor").contentWindow.document.getElementById("hideCode").value; finish()'
      );

    element.innerHTML = "Default";

    document
      .getElementById("JSEditor")
      .contentWindow.document.getElementById("hideCode").value =
      document.getElementById("code").value;
    document
      .getElementById("JSEditor")
      .contentWindow.document.getElementById("hideCode")
      .dispatchEvent(new Event("_load"));

    document.getElementById("code").style.display = "none";
    document.getElementById("JSEditor").style.display = "initial";
  },

  action(cache) {
    const data = cache.actions[cache.index];

    let code;
    code = data.code;
    this.eval(code, cache);

    this.callNextAction(cache);
  },

  mod() {},
};
