module.exports = {
  friendlyName: 'Home',
  description: 'Homepage',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/home'
    }
  },
  fn: async function (inputs) {
    var storyIcons = await sails.helpers.makeStoryIcons();
    var characterIcons = await sails.helpers.makeCharacterIcons();
    var eventIcons = await sails.helpers.makeEventIcons();
    var locationIcons = await sails.helpers.makeLocationIcons();
    var settingIcons = await sails.helpers.makeSettingIcons();
    return {storyIcons: storyIcons, characterIcons: characterIcons,
      eventIcons: eventIcons, locationIcons: locationIcons,
      settingIcons: settingIcons
    };
  }
};
