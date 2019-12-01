module.exports = {
  friendlyName: 'New Character Wizard',
  description: 'New character wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-character'
    }
  },
  fn: async function (inputs) {
    let name = await sails.helpers.getUntitledString();
    try {
      var n = await Title.create({roleLabel: 'realName', content: name}).fetch();
      var c = await Character.create({realName: n.id}).fetch();
      return {character: c, realName: n};
    } catch (e) { console.log(e); }

  }
};
