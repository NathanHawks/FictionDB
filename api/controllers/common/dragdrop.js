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
              r = StoryCharacter.create({
                story: dropTargetDBID, character: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = StoryEvent.create({
                story: dropTargetDBID, event: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = StorySetting.create({
                story: dropTargetDBID, setting: dragTargetDBID
              }).fetch();
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
              r = StoryCharacter.create({
                character: dropTargetDBID, story: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = EventCharacter.create({
                character: dropTargetDBID, event: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = SettingCharacter.create({
                character: dropTargetDBID, setting: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Location':
              r = LocationCharacter.create({
                character: dropTargetDBID, location: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
          }
        break;
        case 'Event':
          switch (dragTargetType) {
            case 'Story':
              r = StoryEvent.create({
                event: dropTargetDBID, story: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Character':
              r = EventCharacter.create({
                event: dropTargetDBID, character: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Location':
              r = EventLocation.create({
                event: dropTargetDBID, location: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = SettingEvent.create({
                event: dropTargetDBID, setting: dragTargetDBID
              }).fetch();
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
              r = LocationCharacter.create({
                location: dropTargetDBID, character: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = EventLocation.create({
                location: dropTargetDBID, event: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Setting':
              r = SettingLocation.create({
                location: dropTargetDBID, setting: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
          }
        break;
        case 'Setting':
          switch (dragTargetType) {
            case 'Story':
              r = StorySetting.create({
                setting: dropTargetDBID, story: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Character':
              r = SettingCharacter.create({
                setting: dropTargetDBID, character:dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Event':
              r = SettingEvent.create({
                setting: dropTargetDBID, event: dragTargetDBID
              }).fetch();
              r = Promise.resolve(r);
            break;
            case 'Location':
              r = SettingLocation.create({
                setting: dropTargetDBID, location: dragTargetDBID
              }).fetch();
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
