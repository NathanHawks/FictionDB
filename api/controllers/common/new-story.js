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
    content = 'Untitled #' + Math.floor((Math.random() * 100000000000) + 1);
    try {
      var t = await Title.create({
        roleLabel: 'mainTitle', content: content
      }).fetch();
      while (t===undefined) {}
      var s = await Story.create({ mainTitle: t.id }).fetch();
      while (t===undefined) {}
      var rt = await Title.findOne({content: content });
      var rs = await Story.findOne({mainTitle: rt.id});
    } catch (e) { console.log(e); }
    return { story: rs, title: rt };
  }
};
