module.exports = {
  friendlyName: 'Story Workspace',
  description: 'Workspace for a specific story.',
  inputs: {
    storyID: {
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
      viewTemplatePath: 'story/workspace'
    },
    navigatorOnly: {
      responseType: 'view',
      viewTemplatePath: 'partials/common/navigator-items'
    },
    notFound: {
      description: 'Couldn\'t find that storyId.',
      responseType: 'notFound'
    }
  },

  fn: async function (inputs) {
    var storyID = inputs.storyID;
    var s = await Story.get(storyID);
    var linkedID = s.id;
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

    var locals = {
      storyID: storyID,
      story: s,
      characters: characters,
      settings: settings,
      events: events,
      locations: [], ///////////////////////////////
      // locations: locations,
      stories: [s],
      linkedType: 'story',
      ucfirstType: 'Story',
      linkedID: linkedID,
    };
    if (inputs.navigatorOnly === true) {
      throw { navigatorOnly: locals};
    }
    else return locals;
  }
};
