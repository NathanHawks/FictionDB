module.exports = {
  friendlyName: 'Dragdrop',
  description: 'Dragdrop common.',
  inputs: {
    draggedIDs: {
      type: 'ref',
      required: true
    },
    dropTargetID: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/dragdrop'
    }
  },
  fn: async function ({draggedIDs, dropTargetID}) {
    // console.log(draggedIDs);
    // console.log(dropTargetID);

    let [dropTargetType,dropTargetDBID] = dropTargetID.split('_');
    let typesArr = ['Story','Character','Event','Location','Setting'];
    let validDrops = [];
    let r = null;
    draggedIDs.map((dropped) => {
      let [dragTargetType,dragTargetDBID] = dropped.split('_');
      if (dragTargetType !== dropTargetType) {
        validDrops[validDrops.length] = {
          dragTargetType: dragTargetType,
          dragTargetDBID: dragTargetDBID
        };
      }
      switch (dropTargetType) {
        case 'Story':
          switch (dragTargetType) {
            case 'Character':
              r = StoryCharacter.linkRecords({
                story: dropTargetDBID, character: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = StoryEvent.linkRecords({
                story: dropTargetDBID, event: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = StorySetting.linkRecords({
                story: dropTargetDBID, setting: dragTargetDBID
              });
              r = Promise.resolve(r);
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
              r = StoryCharacter.linkRecords({
                character: dropTargetDBID, story: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = EventCharacter.linkRecords({
                character: dropTargetDBID, event: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = SettingCharacter.linkRecords({
                character: dropTargetDBID, setting: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Location':
              r = LocationCharacter.linkRecords({
                character: dropTargetDBID, location: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
          }
        break;
        case 'Event':
          switch (dragTargetType) {
            case 'Story':
              r = StoryEvent.linkRecords({
                event: dropTargetDBID, story: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Character':
              r = EventCharacter.linkRecords({
                event: dropTargetDBID, character: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Location':
              r = EventLocation.linkRecords({
                event: dropTargetDBID, location: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = SettingEvent.linkRecords({
                event: dropTargetDBID, setting: dragTargetDBID
              });
              r = Promise.resolve(r);
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
              r = LocationCharacter.linkRecords({
                location: dropTargetDBID, character: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = EventLocation.linkRecords({
                location: dropTargetDBID, event: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = SettingLocation.linkRecords({
                location: dropTargetDBID, setting: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
          }
        break;
        case 'Setting':
          switch (dragTargetType) {
            case 'Story':
              r = StorySetting.linkRecords({
                setting: dropTargetDBID, story: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Character':
              r = SettingCharacter.linkRecords({
                setting: dropTargetDBID, character:dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = SettingEvent.linkRecords({
                setting: dropTargetDBID, event: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
            case 'Location':
              r = SettingLocation.linkRecords({
                setting: dropTargetDBID, location: dragTargetDBID
              });
              r = Promise.resolve(r);
            break;
          }
        break;
      }
    });
    // console.log(`${validDrops.length} drops were valid`);
    return {response: 'OK', dropTargetID: dropTargetID};
  }
};
