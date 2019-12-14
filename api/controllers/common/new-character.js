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
    return await sails.helpers.newCharacter(name);
  }
};
