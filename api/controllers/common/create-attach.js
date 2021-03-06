module.exports = {
  friendlyName: 'Create attach',
  description: '',
  inputs: {
    createType: {
      type: 'string',
      required: true
    },
    linkedType: {
      type: 'string',
      required: true
    },
    linkedID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/json-ok'
    }
  },
  fn: async function (inputs) {
    let createType = await sails.helpers.uppercaseFirst(inputs.createType);
    let linkedType = await sails.helpers.uppercaseFirst(inputs.linkedType);
    let linkedID = inputs.linkedID;
    let info = {};
    let createdID = -1;
    let name = await sails.helpers.getUntitledString();
    switch (createType) {
      case 'Character':
        info = await sails.helpers.newRecord(Character, 'Character', name);
        createdID = info.character.id;
      break;
      case 'Event':
        info = await sails.helpers.newRecord(Event, 'Event', name);
        createdID = info.event.id;
      break;
      case 'Location':
        info = await sails.helpers.newRecord(Location, 'Location', name);
        createdID = info.location.id;
      break;
      case 'Setting':
        info = await sails.helpers.newRecord(Setting, 'Setting', name);
        createdID = info.setting.id
      break;
      case 'Story':
        info = await sails.helpers.newRecord(Story, 'Story', name);
        createdID = info.story.id;
      break;
    }
    if (createdID > -1) {
      return await sails.helpers.linkRecords(createType, createdID, linkedType, linkedID);
    } else return;
  }
};
