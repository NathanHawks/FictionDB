module.exports = {
  friendlyName: 'New character',
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
      var n = await Title.create({roleLabel: 'realName', content: inputs.name}).fetch();
      var c = await Character.create({realName: n.id}).fetch();
      return {character: c, realName: n};
    } catch (e) { console.log(e); }
  }
};
