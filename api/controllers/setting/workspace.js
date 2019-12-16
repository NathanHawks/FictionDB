module.exports = {
  friendlyName: 'Setting Workspace',
  description: 'Setting workspace.',
  inputs: {
    settingID: {
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
      description: 'Couldn\'t find that settingId.',
      responseType: 'notFound'
    }
  },
  fn: async function (inputs) {
    var settingID = inputs.settingID;
    var s = await Setting.get(settingID);
    var titleNames = Setting.getTitleFieldNames();
    var noteNames = Setting.getNoteFieldNames();
    var linkedID = s.id;
  // populate Navigator
    var characters = await SettingCharacter.getCharacters(settingID);
    var locations = await SettingLocation.getLocations(settingID);
    var events = await SettingEvent.getEvents(settingID);
    var stories = await StorySetting.getStories(settingID);

    var locals = {
      settingID: settingID,
      linkedItem: s,
      characters: characters,
      locations: locations,
      events: events,
      stories: stories,
      settings: [s],
      linkedType: 'setting',
      ucfirstType: 'Setting',
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
