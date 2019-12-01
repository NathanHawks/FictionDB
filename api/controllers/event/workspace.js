module.exports = {
  friendlyName: 'Event Workspace',
  description: 'Event workspace.',
  inputs: {
    eventID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'event/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that eventId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({eventID}) {
    return {eventID: eventID};
  }
};
