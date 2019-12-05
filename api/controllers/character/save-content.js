module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    characterID: {
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
      viewTemplatePath: 'character/save-content'
    }
  },
  fn: async function ({characterID, contentType, assocID, content, fieldName}) {
    console.log(` characterID: ${characterID}\n contentType: ${contentType}\n`
      +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
    try {
      let n = null;
      if (assocID !== -1) {
        switch (contentType) {
          case 'Note':
            n = await Note.update({
              id: assocID}).set({content: content}).fetch();
          break;
          case 'Title':
            console.log('got here');
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
        let s = null;
        let q = {}; q[fieldName] = n.id;
        s = await Character.update({id: characterID}).set(q).fetch();
      }
    } catch (e) { console.log(e); }
    return;
  }
};
