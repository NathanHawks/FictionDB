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
      viewTemplatePath: 'common/unlink'
    }
  },
  fn: async function ({subjectType, subjectID, objectType, objectID}) {
    let model = null;
    switch (subjectType) {
      case 'Story':
        switch (objectType) {
          case 'Character':

          break;
          case 'Event':

          break;
          case 'Setting':

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

          break;
          case 'Event':

          break;
          case 'Setting':

          break;
          case 'Location':

          break;
        }
      break;
      case 'Event':
        switch (objectType) {
          case 'Story':

          break;
          case 'Character':
            model = EventCharacter;
          break;
          case 'Location':

          break;
          case 'Setting':

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

          break;
          case 'Event':

          break;
          case 'Setting':

          break;
        }
      break;
      case 'Setting':
        switch (objectType) {
          case 'Story':

          break;
          case 'Character':

          break;
          case 'Event':

          break;
          case 'Location':

          break;
        }
      break;
    }
    q = {}
    q[objectType.toLowerCase()] = objectID;
    q[subjectType.toLowerCase()] = subjectID;
    console.log(q);
    await model.destroy(q);
    return;
  }
};
