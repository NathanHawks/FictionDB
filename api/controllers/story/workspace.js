module.exports = {
  friendlyName: 'Story Workspace',
  description: 'Workspace for a specific story.',
  inputs: {
    storyID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'story/workspace'
    },
    notFound: {
      description: 'Couldn\'t find that storyId.',
      responseType: 'notFound'
    }
  },

  fn: async function ({storyID}) {
    var s = await Story.findOne({id: storyID})
      .populate('mainTitle')
      .populate('summary')
      .populate('elevatorPitch');
    // need this to stay in scope
    var x = 0;
    // populate Navigator - characters
    var storyCharacters = await StoryCharacter.find({
      where: {story: storyID}, sort: 'sequence ASC'});
    var characters = [];
    // store the functions or the promises will be broken
    var f1 = [];
    for (x = 0; x < storyCharacters.length; x++) {
      let charID = storyCharacters[x].character;
      f1[x] = async (x, charID, characters) => {
        characters[x] = await Character.findOne({id: charID})
          .populate('realName').populate('codeName');
        return Promise.resolve(characters[x]);
      }
      characters[x] = await f1[x](x, charID, characters);
    }
    // populate Navigator - settings
    var storySettings = await StorySetting.find({
      where: {story: storyID}, sort: 'sequence ASC'});
    var settings = [];
    // store another batch of functions
    var f2 = [];
    for (x = 0; x < storySettings.length; x++) {
      let settID = storySettings[x].setting
      f2[x] = async (x, settID, settings) => {
        settings[x] = await Setting.findOne({id: settID})
          .populate('authorTitle').populate('newsTitle').populate('colloqTitle');
        return Promise.resolve(settings[x]);
      }
      settings[x] = await f2[x](x, settID, settings);
    }

    // populate Navigator - locations
    // var storyLocations = await StoryLocation.find({story: storyID});
    // locationDBIDs = [];
    // storyLocations.map((sl) => {
    //   locationDBIDs[locationDBIDs] = sl.location;
    // });
    // var locations = await Location.find({id: locationDBIDs});

    // populate Navigator - events
    var storyEvents = await StoryEvent.find({
      where: {story: storyID}, sort: 'sequence ASC'
    });
    events = [];
    f3 = [];
    for (x = 0; x < storyEvents.length; x++) {
      evntID = storyEvents[x].event;
      f3[x] = async (x,evntID,events) => {
        events[x] = await Event.findOne({id: evntID})
          .populate('authorTitle').populate('newsTitle').populate('colloqTitle');
        return Promise.resolve(events[x]);
      }; events[x] = await f3[x](x, evntID, events);
    }

    return {
      storyID: storyID,
      story: s,
      characters: characters,
      settings: settings,
      events: events,
      // locations: locations,
      settings: settings
    };
  }
};
