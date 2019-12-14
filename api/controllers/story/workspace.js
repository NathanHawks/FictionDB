module.exports = {
  friendlyName: 'Story Workspace',
  description: 'Workspace for a specific story.',
  inputs: {
    storyID: {
      type: 'number',
      required: true
    },
    backBtnUrl: {
      type: 'string',
      required: false
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

  fn: async function (inputs) {
    var storyID = inputs.storyID;
    var backBtnUrl = inputs.backBtnUrl;
    var s = await Story.get(storyID);

    // populate Navigator
    var characters = await StoryCharacter.getCharacters(storyID);
    var settings = await StorySetting.getSettings(storyID);
    var events = await StoryEvent.getEvents(storyID);

    // populate Navigator - locations
    // var storyLocations = await StoryLocation.find({story: storyID});
    // locationDBIDs = [];
    // storyLocations.map((sl) => {
    //   locationDBIDs[locationDBIDs] = sl.location;
    // });
    // var locations = await Location.find({id: locationDBIDs});

    // populate Navigator - events

    return {
      storyID: storyID,
      story: s,
      characters: characters,
      settings: settings,
      events: events,
      // locations: locations,
      settings: settings,
      stories: [s],
      backBtnUrl: backBtnUrl,
    };
  }
};
