module.exports = {
  friendlyName: 'New Story Wizard',
  description: 'New story wizard',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/new-story',
    },
  },
  fn: async function (inputs) {
    let title = await sails.helpers.getUntitledString();
    let r = await sails.helpers.newStory(title);
    let id = r.story.id;
    let type = 'story';
    return {
      id: id,
      type: type,
    }

  }
};
