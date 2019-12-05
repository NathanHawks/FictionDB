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
      required: true
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
      let n = null;
      if (assocID !== -1) {
        switch (contentType) {
          case 'Note':
            n = await Note.update({
              id: assocID}).set({content: content}).fetch();
          break;
          case 'Title':
            n = await Title.update({
              id: assocID}).set({content: content}).fetch();
          break;
        }
      } else {
        switch (contentType) {
          case 'Note':
            n = await Note.create({
              roleLabel: fieldName, content: content}).fetch();
          break;
          case 'Title':
            n = await Title.create({
              roleLabel: fieldName, content: content}).fetch();
          break;
        }
        while (n === undefined) {}
        let s = null;
        let q = {}; q[fieldName] = n.id;
        s = await Setting.update({id: settingID}).set(q).fetch();
        while (s === undefined) {}
      }
    } catch (e) { console.log(e); }
    return;
  }
};
