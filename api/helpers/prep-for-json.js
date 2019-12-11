module.exports = {
  friendlyName: 'Prep for json',
  description: '',
  inputs: {
    val : {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function ({val}) {
    return val.replace(/'/g, '&apos;').replace(/\\/g, '\\\\');
  }
};
