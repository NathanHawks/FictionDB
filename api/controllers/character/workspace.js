module.exports = {
  friendlyName: 'Character Workspace',
  description: 'Character workspace.',
  inputs: {
    characterID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'character/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that characterId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({characterID}) {
    var s = await Character.get(characterID);
    // populate Navigator
    var settings = await SettingCharacter.getSettings(characterID);
    var locations = await LocationCharacter.getLocations(characterID);
    var events = await EventCharacter.getEvents(characterID);
    var stories = await StoryCharacter.getStories(characterID);

    return {
      characterID: characterID,
      character: s,
      settings: settings,
      locations: locations,
      events: events,
      stories: stories,
      characters: [],
      
    };
  }
};
