module.exports = {
  friendlyName: 'Setting Workspace',
  description: 'Setting workspace.',
  inputs: {
    settingID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'setting/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that settingId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({settingID}) {
    return {settingID: settingID};
  }
};
