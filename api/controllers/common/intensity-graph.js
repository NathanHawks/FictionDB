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
    },
    eventID: {
      type: 'number',
      required: false
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
    let eventID = (inputs.eventID) ? inputs.eventID : -1;
    let linkedType = inputs.linkedType;
    let selected = await StoryEvent.getEvents(storyID);
    let r = await Story.get(storyID);
    // while (r.mainTitle === undefined) {}
    let storyTitle = r.mainTitle.content;
    return {
      storyTitle: storyTitle,
      storyID: storyID,
      eventID: eventID,
      events: selected,
      linkedType: linkedType,
    }
  }
};
