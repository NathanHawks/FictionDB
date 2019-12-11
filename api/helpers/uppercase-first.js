module.exports = {
  friendlyName: 'Uppercase first',
  description: '',
  inputs: {
    s: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function ({s}) {
    return s.replace(/^[a-z]/,m=>m.toUpperCase());
  }
};
