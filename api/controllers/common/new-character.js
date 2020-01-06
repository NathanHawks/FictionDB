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
    let r = await sails.helpers.newRecord(Character, 'Character', name);
    let id = r.character.id;
    let type = 'character';
    return {
      id: id,
      type: type,
    }
  }
};
