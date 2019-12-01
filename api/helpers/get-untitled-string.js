module.exports = {
  friendlyName: 'Get an Untitled #XYZ string',
  description: '',
  inputs: {
  },
  exits: {
    success: {
      outputFriendlyName: 'Untitled string',
    },
  },
  fn: async function (inputs) {
    return 'Untitled #' + Math.floor((Math.random() * 100000000000) + 1);
  }
};
