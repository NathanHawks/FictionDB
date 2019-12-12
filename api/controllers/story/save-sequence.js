module.exports = {
  friendlyName: 'Save sequence',
  description: '',
  inputs: {
    items: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'story/save-sequence'
    }
  },
  fn: async function ({items}) {
    //items = JSON.parse(items);
    for (let x = 0; x < items.length; x++) {
      let r = [];
      let f = [];
      f[x] = async (item, x) => {
        let id = item.id;
        let type = item.type;
        let seq = item.sequence;
        let sID = item.linkedID;
        switch (type) {
          case 'Character':
            r[x] = Promise.resolve(await StoryCharacter.update(
              {character: id, story: sID})
              .set({sequence: seq}).fetch());
          break;
          case 'Event':
            r[x] = Promise.resolve(await StoryEvent.update({
              event: id, story: sID})
              .set({sequence: seq}).fetch());
          break;
          case 'Setting':
            r[x] = Promise.resolve(await StorySetting.update({
              setting: id, story: sID})
              .set({sequence: seq}).fetch());
          break;
          // case 'Location':
          //   r[x] = Promise.resolve(await Location.update({id: id})
          //     .set({sequence: seq}).fetch());
          // break;
        }
      }; f[x](items[x], x);
    }
    return;

  }


};
