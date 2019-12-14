module.exports = {
  friendlyName: 'New story',
  description: '',
  inputs: {
    name: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    try {
      var t = await Title.create({roleLabel:'mainTitle',content:inputs.name}).fetch();
      var s = await Story.create({ mainTitle: t.id }).fetch();
      return { story: s, title: t };
    } catch (e) { console.log(e); }
  }


};
