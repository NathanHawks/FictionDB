module.exports = {
  friendlyName: 'New Story Wizard',
  description: 'New story wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-story',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    try {
      var t = await Title.create({roleLabel:'mainTitle',content:title}).fetch();
      var s = await Story.create({ mainTitle: t.id }).fetch();
      return { story: s, title: t };
    } catch (e) { console.log(e); }
  }
};
