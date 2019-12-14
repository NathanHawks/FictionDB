module.exports = {
  friendlyName: 'New Location Wizard',
  description: 'New location wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-location',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    return await sails.helpers.newLocation(title);
  }
};
