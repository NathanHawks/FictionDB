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
    let r = await sails.helpers.newRecord(Setting, 'Setting', title);
    let id = r.setting.id;
    let type = 'setting';
    return {
      id: id,
      type: type,
    }

  }
};
