module.exports = {
  friendlyName: 'Character Workspace',
  description: 'Character workspace.',
  inputs: {
    characterID: {
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
      viewTemplatePath: 'character/workspace'
    },
    navigatorOnly: {
      responseType: 'view',
      viewTemplatePath: 'partials/common/navigator-items'
    },
    notFound: {
      description: 'Couldn\'t find that characterId.',
      responseType: 'notFound'
    }
  },
  fn: async function (inputs) {
    var characterID = inputs.characterID;
    var s = await Character.get(characterID);
    var linkedID = s.id;
    // populate Navigator
    var settings = await SettingCharacter.getSettings(characterID);
    var locations = await LocationCharacter.getLocations(characterID);
    var events = await EventCharacter.getEvents(characterID);
    var stories = await StoryCharacter.getStories(characterID);
    var locals = {
      characterID: characterID,
      character: s,
      settings: settings,
      locations: locations,
      events: events,
      stories: stories,
      characters: [s],
      linkedType: 'character',
      ucfirstType: 'Character',
      linkedID: linkedID,
    };
    if (inputs.navigatorOnly === true) {
      throw { navigatorOnly: locals};
    }
    else return locals;
  }
};
