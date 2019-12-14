module.exports = {
  friendlyName: 'New Event Wizard',
  description: 'New event wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-event',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    return await sails.helpers.newEvent(title);
  }
};
