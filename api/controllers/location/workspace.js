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
    var s = await Location.get(locationID);
    // populate Navigator
    var characters = await LocationCharacter.getCharacters(locationID);
    var events = await EventLocation.getEvents(locationID);
    var settings = await SettingLocation.getSettings(locationID);

    return {
      locationID: locationID,
      location: s,
      characters: characters,
      locations: [s],
      settings: settings,
      stories: [],
      events: events
    }
  }
};
