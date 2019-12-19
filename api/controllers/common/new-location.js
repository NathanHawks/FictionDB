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
    let r = await sails.helpers.newLocation(title);
    let id = r.location.id;
    let type = 'location';
    return {
      id: id,
      type: type,
    }

  }
};
