module.exports = {
  friendlyName: 'New setting',
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
      var t = await Title.create({roleLabel:'authorTitle',content:inputs.name}).fetch();
      var s = await Setting.create({ authorTitle: t.id }).fetch();
      return { setting: s, title: t };
    } catch (e) { console.log(e); }
  }
};
