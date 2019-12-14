module.exports = {
  friendlyName: 'New Setting Wizard',
  description: 'New setting wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-setting',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    return await sails.helpers.newSetting(title);
  }
};
