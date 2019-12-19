module.exports = {
  friendlyName: 'Intensity graph',
  description: '',
  inputs: {
    storyID: {
      type: 'number',
      required: true
    },
    linkedType: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/intensity-graph'
    }
  },
  fn: async function (inputs) {
    let storyID = inputs.storyID;
    let linkedType = inputs.linkedType;
    let selected = await StoryEvent.getEvents(storyID);
    let r = await Story.get(storyID);
    // while (r.mainTitle === undefined) {}
    let storyTitle = r.mainTitle.content;
    return {
      storyTitle: storyTitle,
      storyID: storyID,
      events: selected,
      linkedType: linkedType,
    }
  }
};
