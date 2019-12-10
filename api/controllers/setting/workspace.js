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
    var s = await Setting.findOne({id: settingID})
      .populate('authorTitle')
      .populate('newsTitle')
      .populate('colloqTitle')
      .populate('authorNote')
      .populate('publicNote');
    // need this to stay in scope
    var x = 0;
    // populate Navigator - characters
    var settingCharacters = await SettingCharacter.find({
      where: {setting: settingID}, sort: 'sequence ASC'});
    var characters = [];
    // store the functions or the promises will be broken
    var f1 = [];
    for (x = 0; x < settingCharacters.length; x++) {
      let charID = settingCharacters[x].character;
      f1[x] = async (x, charID, characters) => {
        characters[x] = await Character.findOne({id: charID})
          .populate('realName').populate('codeName');
        return Promise.resolve(characters[x]);
      }
      characters[x] = await f1[x](x, charID, characters);
    }
    // populate Navigator - locations
    var settingLocations = await SettingLocation.find({
      where: {setting: settingID}, sort: 'sequence ASC'});
    var locations = [];
    // store another batch of functions
    var f2 = [];
    for (x = 0; x < settingLocations.length; x++) {
      let locID = settingLocations[x].location
      f2[x] = async (x, locID, locations) => {
        locations[x] = await Location.findOne({id: locID})
          .populate('authorTitle').populate('newsTitle').populate('colloqTitle');
        return Promise.resolve(locations[x]);
      }
      locations[x] = await f2[x](x, locID, locations);
    }

    // populate Navigator - events
    var settingEvents = await SettingEvent.find({
      where: {setting: settingID}, sort: 'sequence ASC'
    });
    events = [];
    f3 = [];
    for (x = 0; x < settingEvents.length; x++) {
      evntID = settingEvents[x].event;
      f3[x] = async (x,evntID,events) => {
        events[x] = await Event.findOne({id: evntID})
          .populate('authorTitle').populate('newsTitle').populate('colloqTitle');
        return Promise.resolve(events[x]);
      }; events[x] = await f3[x](x, evntID, events);
    }

    return {
      settingID: settingID,
      setting: s,
      characters: characters,
      locations: locations,
      events: events,
    };
  }
};
