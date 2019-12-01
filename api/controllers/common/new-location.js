module.exports = {
  friendlyName: 'New Location Wizard',
  description: 'New location wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-location',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    try {
      var t = await Title.create({roleLabel:'authorTitle',content:title}).fetch();
      var l = await Location.create({ authorTitle: t.id }).fetch();
      return { location: l, title: t };
    } catch (e) { console.log(e); }
  }
};
