module.exports = {
  friendlyName: 'New location',
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
      var l = await Location.create({ authorTitle: t.id }).fetch();
      return { location: l, title: t };
    } catch (e) { console.log(e); }
  }
};
