module.exports = {
  friendlyName: 'Location Workspace',
  description: 'Location workspace.',
  inputs: {
    locationID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'location/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that locationId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({locationID}) {
    return {locationID: locationID};
  }
};
