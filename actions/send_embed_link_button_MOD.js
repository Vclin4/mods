module.exports = {
  name: "Send Embed Link Button Message",
  section: "Embed Message",

  subtitle(data) {
    const info = ["Links Buttons"];
    return `Links Buttons`;
  },

  fields: [
    "channelID",
    "serverID",
    "color",
    "title",
    "author",
    "authorUrl",
    "authorIcon",
    "desc",
    "imageUrl",
    "thumbUrl",
    "footer",
    "footerIcon",
    "buttonsCount",
    "firstButtonLink",
    "firstButtonText",
    "secondButtonLink",
    "secondButtonText",
    "thirdButtonLink",
    "thirdButtonText",
    "fourthButtonLink",
    "fourthButtonText",
    "fifthButtonLink",
    "fifthButtonText",
  ],

  html() {
    return `
<div id ="modinfo" style="width: 550px; height: 350px; overflow-y: scroll; overflow-x: scroll;">
	<p>
    Author: MineEjo#6143 | https://github.com/MineEjo
	</p>
	<div style="float: left; width: 50%; padding-top: 8px;">
	Author Name:<br>
  <input id="author" class="round" type="text" placeholder="Leave blank for none!"><br>
	Author URL:<br>
  <input id="authorUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
	Author Icon URL:<br>
  <input id="authorIcon" class="round" type="text" placeholder="Leave blank for none!"><br>
	Buttons Count:<br>
  <input id="buttonsCount" class="round" type="text" placeholder="1-5"><br>
	</div>
	<div style="float: right; width: 50%; padding-top: 8px;">
  Color:<br>
  <input id="color" class="round" type="text" placeholder="Leave blank for none!"><br>
  Title:<br>
  <input id="title" class="round" type="text" placeholder="Leave blank for none!"><br>
	Thumbnail URL:<br>
  <input id="thumbUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
	Image URL:<br>
  <input id="imageUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
	</div>
	<div style="padding-top: 8px;">
	Description:<br>
	<textarea id="desc" rows="3" placeholder="Insert message here..." style="width: 95%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
	</div>
	<div style="padding-top: 8px;">
	Footer:<br>
	<textarea id="footer" rows="3" placeholder="Leave blank for none!" style="width: 95%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
	</div>
	<div style="padding-top: 8px;">
	Footer Icon URL:<br>
  <input id="footerIcon" class="round" style="width: 95%;" type="text" placeholder="Leave blank for none!">
	</div>
	<div style="float: left; width: 50%; padding-top: 16px;">
	1. Button:<br>
	<input id="firstButtonLink" class="round" style="margin-top: 8px" type="text" placeholder="Link">
	<input id="firstButtonText" class="round" style="margin-top: 4px" type="text" placeholder="Text"><br>
	3. Button:<br>
	<input id="thirdButtonLink" class="round" style="margin-top: 8px" type="text" placeholder="Link">
	<input id="thirdButtonText" class="round" style="margin-top: 4px" type="text" placeholder="Text"><br>
	5. Button:<br>
	<input id="fifthButtonLink" class="round" style="margin-top: 8px" type="text" placeholder="Link">
	<input id="fifthButtonText" class="round" style="margin-top: 4px" type="text" placeholder="Text"><br>
	</div>
	<div style="float: right; width: 50%; padding-top: 16px;">
	2. Button:<br>
	<input id="secondButtonLink" class="round" style="margin-top: 8px" type="text" placeholder="Link">
	<input id="secondButtonText" class="round" style="margin-top: 4px" type="text" placeholder="Text"><br>
	4. Button:<br>
	<input id="fourthButtonLink" class="round" style="margin-top: 8px" type="text" placeholder="Link">
	<input id="fourthButtonText" class="round" style="margin-top: 4px" type="text" placeholder="Text"><br>
	Send to the Channel:<br>
  <input id="channelID" class="round" style="margin-top: 8px" type="text" placeholder="Channel ID">
  <input id="serverID" class="round"style="margin-top: 4px" type="text" placeholder="Server ID"><br>
	</div>
	<p>
		- This mod does not use djs, only node-fetch.
  </p>
  </div>
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const client = this.getDBM().Bot.bot;

    let channelid = this.evalMessage(data.channelID, cache);
    let serverid = this.evalMessage(data.serverID, cache);
    let embedcolor = this.evalMessage(data.color, cache);
    let embedtitle = this.evalMessage(data.title, cache);
    let embeddecs = this.evalMessage(data.desc, cache);
    let embedimage = this.evalMessage(data.imageUrl, cache);
    let imageheight = "1000";
    let imagewidth = "1000";
    let thumbnailimage = this.evalMessage(data.thumbUrl, cache);
    let thumbnailheight = "1000";
    let thumbnailwidth = "1000";
    let footertext = this.evalMessage(data.footer, cache);
    let footericonurl = this.evalMessage(data.footerIcon, cache);
    let authorname = this.evalMessage(data.author, cache);
    let authoricon = this.evalMessage(data.authorIcon, cache);
    let authorurl = this.evalMessage(data.authorUrl, cache);
    let buttonsCount = this.evalMessage(data.buttonsCount, cache);
    let firstButtonLink = this.evalMessage(data.firstButtonLink, cache);
    let firstButtonText = this.evalMessage(data.firstButtonText, cache);
    let secondButtonLink = this.evalMessage(data.secondButtonLink, cache);
    let secondButtonText = this.evalMessage(data.secondButtonText, cache);
    let thirdButtonLink = this.evalMessage(data.thirdButtonLink, cache);
    let thirdButtonText = this.evalMessage(data.thirdButtonText, cache);
    let fourthButtonLink = this.evalMessage(data.fourthButtonLink, cache);
    let fourthButtonText = this.evalMessage(data.fourthButtonText, cache);
    let fifthButtonLink = this.evalMessage(data.fifthButtonLink, cache);
    let fifthButtonText = this.evalMessage(data.fifthButtonText, cache);

    if (buttonsCount == 0) {
      console.error("Send Embed Button Message: Specify the number of buttons.");
      return;
    }
    if (buttonsCount > 5) {
      console.error("Send Embed Button Message: Too many buttons are specified.");
      return;
    }
    if (channelid.length < 3) {
      console.error("Send Embed Button Message: There is an error in the channel ID field.");
      return;
    }
    if (serverid.length < 3) {
      console.error("Send Embed Button Message: There is an error in the server ID field.");
      return;
    }

    embedcolor = embedcolor.replace("#", "");
    embedcolor = parseInt(embedcolor, 16);

    switch (buttonsCount) {
      case "1":
        buttons = [{
          type: 2,
          style: 5,
          url: firstButtonLink,
          label: firstButtonText
        }, ];
        break;
      case "2":
        buttons = [{
            type: 2,
            style: 5,
            url: firstButtonLink,
            label: firstButtonText
          },
          {
            type: 2,
            style: 5,
            url: secondButtonLink,
            label: secondButtonText
          },
        ];
        break;
      case "3":
        buttons = [{
            type: 2,
            style: 5,
            url: firstButtonLink,
            label: firstButtonText
          },
          {
            type: 2,
            style: 5,
            url: secondButtonLink,
            label: secondButtonText
          },
          {
            type: 2,
            style: 5,
            url: thirdButtonLink,
            label: thirdButtonText
          },
        ];
        break;
      case "4":
        buttons = [{
            type: 2,
            style: 5,
            url: firstButtonLink,
            label: firstButtonText
          },
          {
            type: 2,
            style: 5,
            url: secondButtonLink,
            label: secondButtonText
          },
          {
            type: 2,
            style: 5,
            url: thirdButtonLink,
            label: thirdButtonText
          },
          {
            type: 2,
            style: 5,
            url: fourthButtonLink,
            label: fourthButtonText
          },
        ];
        break;
      case "5":
        buttons = [{
            type: 2,
            style: 5,
            url: firstButtonLink,
            label: firstButtonText
          },
          {
            type: 2,
            style: 5,
            url: secondButtonLink,
            label: secondButtonText
          },
          {
            type: 2,
            style: 5,
            url: thirdButtonLink,
            label: thirdButtonText
          },
          {
            type: 2,
            style: 5,
            url: fourthButtonLink,
            label: fourthButtonText
          },
          {
            type: 2,
            style: 5,
            url: fifthButtonLink,
            label: fifthButtonText
          },
        ];
        break;
    }

    switch (buttonsCount) {
      case "0":
        embedtitle = "";
        break;
    }

    if (embedcolor == 0) {
      embedcolor = "2895667";
    }

    switch (embeddecs) {
      case "0":
        embeddecs = "";
        break;
    }
    switch (embedimage) {
      case "0":
        embedimage = "";
        break;
    }
    switch (thumbnailimage) {
      case "0":
        thumbnailimage = "";
        break;
    }
    switch (footertext) {
      case "0":
        footertext = "";
        break;
    }
    switch (footericonurl) {
      case "0":
        footericonurl = "";
        break;
    }
    switch (authorname) {
      case "0":
        authorname = "";
        break;
    }
    switch (authoricon) {
      case "0":
        authoricon = "";
        break;
    }
    switch (authorurl) {
      case "0":
        authorurl = "";
        break;
    }

    const embed = {
      title: embedtitle,
      description: embeddecs,
      color: embedcolor,
      image: {
        url: embedimage,
        height: imageheight,
        width: imagewidth,
      },
      thumbnail: {
        url: thumbnailimage,
        height: thumbnailheight,
        width: thumbnailwidth,
      },
      footer: {
        text: footertext,
        icon_url: footericonurl,
      },
      author: {
        name: authorname,
        icon_url: authoricon,
        url: authorurl,
      },
    };

    client.ws.on("INTERACTION_CREATE", async (interaction) => {
      let member = await client.guilds.cache
        .get(serverid)
        .members.fetch(interaction.member.user.id);
      if (!member) return;

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: returnText,
            flags: "64",
          },
        },
      });
    });

    client.api.channels(channelid).messages.post({
      data: {
        embeds: [embed],
        components: [{
          type: 1,
          components: buttons,
        }, ],
      },
    });

    this.callNextAction(cache);
  },

  mod() {},
};