module.exports = {
  friendlyName: 'Location Workspace',
  description: 'Location workspace.',
  inputs: {
    locationID: {
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
      description: 'Couldn\'t find that locationId.',
      responseType: 'notFound'
    }
  },
  fn: async function (inputs) {
    var locationID = inputs.locationID;
    var s = await Location.get(locationID);
    if (!s) { throw 'notFound'; }
  var titleNames = Location.getTitleFieldNames();
    var noteNames = Location.getNoteFieldNames();
    var linkedID = s.id;
    // populate Navigator
    var characters = await LocationCharacter.getCharacters(locationID);
    var events = await EventLocation.getEvents(locationID);
    var settings = await SettingLocation.getSettings(locationID);

    var locals = {
      locationID: locationID,
      linkedItem: s,
      characters: characters,
      locations: [s],
      settings: settings,
      stories: [],
      events: events,
      linkedType: 'location',
      ucfirstType: 'Location',
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
