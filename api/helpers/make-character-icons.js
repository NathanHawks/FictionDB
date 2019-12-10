module.exports = {
  friendlyName: 'Make character icons',
  description: '',
  inputs: {
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
      while (characters === undefined) {}
      for (let x = 0; x < characters.length; x++) {
        let c = characters[x];
        let id = c.id;
        let t = await Title.findOne({id: c.realName});
        while (t===undefined) {}
        let title = t.content;
        output += `<div id="Character_${id}" class="deskicon character-icon"><a onclick="requestPage('character/${id}');" associd="${t.id}" href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
