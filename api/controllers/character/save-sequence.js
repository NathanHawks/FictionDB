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
      viewTemplatePath: 'character/save-sequence'
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
        let sID = item.characterID;
        switch (type) {
          case 'Location':
            r[x] = Promise.resolve(await LocationCharacter.update(
              {location: id, character: sID})
              .set({sequence: seq}).fetch());
          break;
          case 'Event':
            r[x] = Promise.resolve(await EventCharacter.update({
              event: id, character: sID})
              .set({sequence: seq}).fetch());
          break;
          case 'Setting':
            r[x] = Promise.resolve(await SettingCharacter.update({
              setting: id, character: sID})
              .set({sequence: seq}).fetch());
          break;
        }
      }; f[x](items[x], x);
    }
    return;

  }


};
