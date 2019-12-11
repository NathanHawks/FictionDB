module.exports = {
  friendlyName: 'Setting Workspace',
  description: 'Setting workspace.',
  inputs: {
    settingID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'setting/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that settingId.',
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
      settings: []
    };
  }
};
