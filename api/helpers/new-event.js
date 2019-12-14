module.exports = {
  friendlyName: 'New event',
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
      var r = await Event.create({ authorTitle: t.id }).fetch();
      return { event: r, title: t };
    } catch (e) { console.log(e); }
  }
};
