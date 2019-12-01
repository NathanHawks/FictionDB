module.exports = {
  friendlyName: 'New Event Wizard',
  description: 'New event wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-event',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    try {
      var t = await Title.create({roleLabel:'authorTitle',content:title}).fetch();
      var r = await Event.create({ authorTitle: t.id }).fetch();
      return { event: r, title: t };
    } catch (e) { console.log(e); }
  }
};
