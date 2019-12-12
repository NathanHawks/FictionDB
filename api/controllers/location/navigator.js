module.exports = {
  friendlyName: 'Character Workspace',
  description: 'workspace.',
  inputs: {
    locationID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'partials/location/navigator-items'
    },
    notFound: {
      description: 'Couldn\'t find that characterId.',
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
