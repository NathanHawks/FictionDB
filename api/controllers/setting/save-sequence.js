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
      viewTemplatePath: 'common/json-ok'
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
          case 'Story':
          r[x] = Promise.resolve(await StorySetting.update(
            {story: id, setting: sID})
            .set({sequence: seq}).fetch());
          break;
          case 'Character':
            r[x] = Promise.resolve(await SettingCharacter.update(
              {character: id, setting: sID})
              .set({sequence: seq}).fetch());
          break;
          case 'Event':
            r[x] = Promise.resolve(await SettingEvent.update({
              event: id, setting: sID})
              .set({sequence: seq}).fetch());
          break;
          case 'Location':
            r[x] = Promise.resolve(await SettingLocation.update({
              location: id, setting: sID})
              .set({sequence: seq}).fetch());
          break;
        }
      }; f[x](items[x], x);
    }
    return;

  }


};
