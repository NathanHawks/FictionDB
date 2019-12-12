module.exports = {
  friendlyName: 'Character Workspace',
  description: 'workspace.',
  inputs: {
    settingID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'partials/setting/navigator-items'
    },
    notFound: {
      description: 'Couldn\'t find that characterId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({settingID}) {
    var s = await Setting.get(settingID);
    // populate Navigator
    var characters = await SettingCharacter.getCharacters(settingID);
    var locations = await SettingLocation.getLocations(settingID);
    var events = await SettingEvent.getEvents(settingID);
    var stories = await StorySetting.getStories(settingID);

    return {
      settingID: settingID,
      setting: s,
      characters: characters,
      locations: locations,
      events: events,
      stories: stories,
      settings: [s]
    };
  }
};
