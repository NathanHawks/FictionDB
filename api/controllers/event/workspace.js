module.exports = {
  friendlyName: 'Event Workspace',
  description: 'Event workspace.',
  inputs: {
    eventID: {
      type: 'number',
      required: true
    },
    navigatorOnly: {
      type: 'boolean',
      required: false
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/workspace'
    },
    navigatorOnly: {
      responseType: 'view',
      viewTemplatePath: 'partials/common/navigator-items'
    },
    notFound: {
      description: 'Couldn\'t find that eventId.',
      responseType: 'notFound'
    }
  },
  fn: async function (inputs) {
    var eventID = inputs.eventID;
    var s = await Event.get(eventID);
    var linkedID = s.id;
    var titleNames = Event.getTitleFieldNames();
    var noteNames = Event.getNoteFieldNames();
    // populate Navigator
    var characters = await EventCharacter.getCharacters(eventID);
    var locations = await EventLocation.getLocations(eventID);
    var settings = await SettingEvent.getSettings(eventID);
    var stories = await StoryEvent.getStories(eventID);

    var locals = {
      eventID: eventID,
      linkedItem: s,
      characters: characters,
      locations: locations,
      settings: settings,
      stories: stories,
      events: [s],
      linkedType: 'event',
      ucfirstType: 'Event',
      linkedID: linkedID,
      titleNames: titleNames,
      noteNames: noteNames,
    }
    if (inputs.navigatorOnly === true) {
      throw { navigatorOnly: locals};
    }
    else return locals;
  }
};
