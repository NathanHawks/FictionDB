module.exports = {
  friendlyName: 'Link records',
  description: '',
  inputs: {
    dragTargetType: {
      type: 'string',
      required: true
    },
    dragTargetDBID: {
      type: 'number',
      required: true
    },
    dropTargetType: {
      type: 'string',
      required: true
    },
    dropTargetDBID: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    let dragTargetType = inputs.dragTargetType;
    let dragTargetDBID = inputs.dragTargetDBID;
    let dropTargetType = inputs.dropTargetType;
    let dropTargetDBID = inputs.dropTargetDBID;
    switch (dropTargetType) {
      case 'Story':
        switch (dragTargetType) {
          case 'Character':
            r = await StoryCharacter.linkRecords({
              story: dropTargetDBID, character: dragTargetDBID
            });
          break;
          case 'Event':
            r = await StoryEvent.linkRecords({
              story: dropTargetDBID, event: dragTargetDBID
            });
          break;
          case 'Setting':
            r = await StorySetting.linkRecords({
              story: dropTargetDBID, setting: dragTargetDBID
            });
          break;
          case 'Location':
            // get the story's setting, if it has one

            // if no setting, flow: prompt user to choose or make one

            // TODO via StorySetting <> SettingLocation

          break;
        }
      break;
      case 'Character':
        switch (dragTargetType) {
          case 'Story':
            r = await StoryCharacter.linkRecords({
              character: dropTargetDBID, story: dragTargetDBID
            });
          break;
          case 'Event':
            r = await EventCharacter.linkRecords({
              character: dropTargetDBID, event: dragTargetDBID
            });
          break;
          case 'Setting':
            r = await SettingCharacter.linkRecords({
              character: dropTargetDBID, setting: dragTargetDBID
            });
          break;
          case 'Location':
            r = await LocationCharacter.linkRecords({
              character: dropTargetDBID, location: dragTargetDBID
            });
          break;
        }
      break;
      case 'Event':
        switch (dragTargetType) {
          case 'Story':
            r = await StoryEvent.linkRecords({
              event: dropTargetDBID, story: dragTargetDBID
            });
          break;
          case 'Character':
            r = await EventCharacter.linkRecords({
              event: dropTargetDBID, character: dragTargetDBID
            });
          break;
          case 'Location':
            r = await EventLocation.linkRecords({
              event: dropTargetDBID, location: dragTargetDBID
            });
          break;
          case 'Setting':
            r = await SettingEvent.linkRecords({
              event: dropTargetDBID, setting: dragTargetDBID
            });
          break;
        }
      break;
      case 'Location':
        switch (dragTargetType) {
          case 'Story':
          // get the story's setting, if it has one

          // if no setting, flow: prompt user to choose or make one

          // TODO via StorySetting <> SettingLocation
          break;
          case 'Character':
            r = await LocationCharacter.linkRecords({
              location: dropTargetDBID, character: dragTargetDBID
            });
          break;
          case 'Event':
            r = await EventLocation.linkRecords({
              location: dropTargetDBID, event: dragTargetDBID
            });
          break;
          case 'Setting':
            r = await SettingLocation.linkRecords({
              location: dropTargetDBID, setting: dragTargetDBID
            });
          break;
        }
      break;
      case 'Setting':
        switch (dragTargetType) {
          case 'Story':
            r = await StorySetting.linkRecords({
              setting: dropTargetDBID, story: dragTargetDBID
            });
          break;
          case 'Character':
            r = await SettingCharacter.linkRecords({
              setting: dropTargetDBID, character:dragTargetDBID
            });
          break;
          case 'Event':
            r = await SettingEvent.linkRecords({
              setting: dropTargetDBID, event: dragTargetDBID
            });
          break;
          case 'Location':
            r = await SettingLocation.linkRecords({
              setting: dropTargetDBID, location: dragTargetDBID
            });
          break;
        }
      break;
    }
  }
};
