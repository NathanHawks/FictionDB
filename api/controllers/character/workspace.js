module.exports = {
  friendlyName: 'Character Workspace',
  description: 'Character workspace.',
  inputs: {
    characterID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'character/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that characterId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({characterID}) {
    return {characterID: characterID};
  }
};
