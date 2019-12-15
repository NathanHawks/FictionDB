module.exports = {
  friendlyName: 'Make story icons',
  description: '',
  inputs: {
    cssClass: {
      type: 'string',
      required: false
    },
    clickHandler: {
      type: 'string',
      required: false
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    var output = '';
    try {
      var stories = await Story.find({where:{trash: false}});
      while (stories === undefined) {}
      for (let x = 0; x < stories.length; x++) {
        let s = stories[x];
        let id = s.id;
        let t = await Title.findOne({id: s.mainTitle});
        while (t===undefined) {}
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        output += `<div id="Story_${id}" class="${cssClass} story-icon">`
        + `<a onclick="${clickHandler}('story/${id}');" associd="${t.id}" `
        + ` href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
