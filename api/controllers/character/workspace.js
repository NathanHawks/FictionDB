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
      viewTemplatePath: 'common/workspace'
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
    var titleNames = Character.getTitleFieldNames();
    var noteNames = Character.getNoteFieldNames();
    // populate Navigator
    var settings = await SettingCharacter.getSettings(characterID);
    var events = await EventCharacter.getEvents(characterID);
    var locations = await LocationCharacter.getLocations(characterID);
    var stories = await StoryCharacter.getStories(characterID);
    var locals = {
      characterID: characterID,
      linkedItem: s,
      characters: [s],
      events: events,
      locations: locations,
      settings: settings,
      stories: stories,
      linkedType: 'character',
      ucfirstType: 'Character',
      linkedID: linkedID,
      titleNames: titleNames,
      noteNames: noteNames,
    };
    if (inputs.navigatorOnly === true) {
      throw { navigatorOnly: locals};
    }
    else return locals;
  }
};
