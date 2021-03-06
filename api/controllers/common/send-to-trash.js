module.exports = {
  friendlyName: 'Send to trash',
  description: 'We don\'t delete ',
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
    items = JSON.parse(items);
    let f = [];
    let r = [];
    let x = -1;
    items.map((item) => {
      switch (item.type) {
        case 'Story':
          f[x] = async function () {
            x++;
            r[x] = Promise.resolve(await Story.update({id: item.id}).set({trash: true}).fetch());
          }; f[x]();
        break;
        case 'Character':
          f[x] = async function () {
            x++;
            r[x] = Promise.resolve(await Character.update({id: item.id}).set({trash: true}).fetch());
          }; f[x]();
        break;
        case 'Event':
          f[x] = async function () {
            x++;
            r[x] = Promise.resolve(await Event.update({id: item.id}).set({trash: true}).fetch());
          }; f[x]();
        break;
        case 'Location':
          f[x] = async function () {
            x++;
            r[x] = Promise.resolve(await Location.update({id: item.id}).set({trash: true}).fetch());
          }; f[x]();
        break;
        case 'Setting':
          f[x] = async function () {
            x++;
            r[x] = Promise.resolve(await Setting.update({id: item.id}).set({trash: true}).fetch());
          }; f[x]();
        break;
      }
    });
    return;
  }
};
