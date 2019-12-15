module.exports = {
  friendlyName: 'Make character icons',
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
      var characters = await Character.find({where:{trash: false}});
      for (let x = 0; x < characters.length; x++) {
        let c = characters[x];
        let id = c.id;
        let t = await Title.findOne({id: c.realName});
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        output += `<div id="Character_${id}" class="${cssClass} character-icon">`
        + `<a onclick="${clickHandler}('character/${id}');" associd="${t.id}" `
        + ` href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
