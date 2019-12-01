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
      .populate('summary').populate('elevatorPitch');
    var t = await Title.findOne({id: s.mainTitle});

    // populate Navigator - characters
    var storyCharacters = await StoryCharacter.find({story: storyID});
    var characterDBIDs = [];
    storyCharacters.map((sc) => {
      characterDBIDs[characterDBIDs.length] = sc.character;
    });
    var characters = await Character.find({id: characterDBIDs})
      .populate('realName').populate('codeName');

    // populate Navigator - settings
    var storySettings = await StorySetting.find({story: storyID});
    settingDBIDs = [];
    storySettings.map((ss) => {
      settingDBIDs[settingDBIDs.length] = ss.setting;
    });
    var settings = await Setting.find({id: settingDBIDs})
      .populate('authorTitle');

    // populate Navigator - locations
    // var storyLocations = await StoryLocation.find({story: storyID});
    // locationDBIDs = [];
    // storyLocations.map((sl) => {
    //   locationDBIDs[locationDBIDs] = sl.location;
    // });
    // var locations = await Location.find({id: locationDBIDs});

    // populate Navigator - events
    var storyEvents = await StoryEvent.find({story: storyID});
    eventDBIDs = [];
    storyEvents.map((se) => {
      eventDBIDs[eventDBIDs.length] = se.event;
    });
    var events = await Event.find({id: eventDBIDs});
    return {
      storyID: storyID,
      story: s,
      title: t.content,
      characters: characters,
      settings: settings,
      events: events,
      // locations: locations,
      settings: settings
    };
  }
};
