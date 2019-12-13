module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    settingID: {
      type: 'number'
    },
    contentType: {
      type: 'string',
      required: true
    },
    assocID: {
      type: 'number'
    },
    content: {
      type: 'string',
      required: false
    },
    fieldName: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'setting/save-content'
    }
  },
  fn: async function ({settingID, contentType, assocID, content, fieldName}) {
    // console.log(` settingID: ${settingID}\n contentType: ${contentType}\n`
    //   +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
    try {
      let n = await sails.helpers.saveContent(
        assocID, contentType, content, fieldName
      );
      let s = null;
      let q = {}; q[fieldName] = n.id;
      s = await Setting.update({id: settingID}).set(q).fetch();
    } catch (e) { console.log(e); }
    return;
  }
};
