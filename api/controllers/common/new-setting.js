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
    try {
      var t = await Title.create({roleLabel:'authorTitle',content:title}).fetch();
      var s = await Setting.create({ authorTitle: t.id }).fetch();
      return { setting: s, title: t };
    } catch (e) { console.log(e); }
  }
};
