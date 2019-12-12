module.exports = {
  friendlyName: 'Event Workspace',
  description: 'Event workspace.',
  inputs: {
    storyID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'partials/story/navigator-items'
    },
    notFound: {
      description: 'Couldn\'t find that storyId.',
      responseType: 'notFound'
    }
  },
  fn: async function ({storyID}) {
    var s = await Story.get(storyID);
    // populate Navigator
    var characters = await StoryCharacter.getCharacters(storyID);
    var settings = await StorySetting.getSettings(storyID);
    var events = await StoryEvent.getEvents(storyID);

    return {
      storyID: storyID,
      story: s,
      characters: characters,
      settings: settings,
      events: events,
      stories: [s]
    }
  }
};
