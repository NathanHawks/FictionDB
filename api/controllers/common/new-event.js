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
    let r = await sails.helpers.newEvent(title);
    let id = r.event.id;
    let type = 'event';
    return {
      id: id,
      type: type,
    }

  }
};
