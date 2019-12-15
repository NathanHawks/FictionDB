module.exports = {
  friendlyName: 'Unlink',
  description: 'Unlink common.',
  inputs: {
    objectType: {
      type: 'string',
      required: true
    },
    objectID: {
      type: 'number',
      required: true
    },
    subjectType: {
      type: 'string',
      required: true
    },
    subjectID: {
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
  fn: async function ({subjectType, subjectID, objectType, objectID}) {
    let model = null;
    switch (subjectType) {
      case 'Story':
        switch (objectType) {
          case 'Character':
            model = StoryCharacter;
          break;
          case 'Event':
            model = StoryEvent;
          break;
          case 'Setting':
            model = StorySetting;
          break;
          case 'Location':
            // get the story's setting, if it has one

            // if no setting, flow: prompt user to choose or make one

            // TODO via StorySetting <> SettingLocation

          break;
        }
      break;
      case 'Character':
        switch (objectType) {
          case 'Story':
            model = StoryCharacter;
          break;
          case 'Event':
            model = EventCharacter;
          break;
          case 'Setting':
            model = SettingCharacter;
          break;
          case 'Location':
            model = LocationCharacter;
          break;
        }
      break;
      case 'Event':
        switch (objectType) {
          case 'Story':
            model = StoryEvent;
          break;
          case 'Character':
            model = EventCharacter;
          break;
          case 'Location':
            model = EventLocation;
          break;
          case 'Setting':
            model = SettingEvent;
          break;
        }
      break;
      case 'Location':
        switch (objectType) {
          case 'Story':
          // get the story's setting, if it has one

          // if no setting, flow: prompt user to choose or make one

          // TODO via StorySetting <> SettingLocation
          break;
          case 'Character':
            model = LocationCharacter
          break;
          case 'Event':
            model = LocationEvent;
          break;
          case 'Setting':
            model = SettingLocation;
          break;
        }
      break;
      case 'Setting':
        switch (objectType) {
          case 'Story':
            model = StorySetting;
          break;
          case 'Character':
            model = SettingCharacter;
          break;
          case 'Event':
            model = SettingEvent;
          break;
          case 'Location':
            model = SettingLocation;
          break;
        }
      break;
    }
    q = {}
    q[objectType.toLowerCase()] = objectID;
    q[subjectType.toLowerCase()] = subjectID;
    await model.destroy(q);
    return;
  }
};
