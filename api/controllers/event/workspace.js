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
    var s = await Event.get(eventID);
    // populate Navigator
    var characters = await EventCharacter.getCharacters(eventID);
    var locations = await EventLocation.getLocations(eventID);
    var settings = await SettingEvent.getSettings(eventID);
    var stories = await StoryEvent.getStories(eventID);

    return {
      eventID: eventID,
      event: s,
      characters: characters,
      locations: locations,
      settings: settings,
      stories: stories,
      events: []
    }
  }
};
