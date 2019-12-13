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
      viewTemplatePath: 'character/save-content'
    }
  },
  fn: async function ({characterID, contentType, assocID, content, fieldName}) {
    // console.log(` characterID: ${characterID}\n contentType: ${contentType}\n`
    //   +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
    if (content === '') { content = ' '; }
    try {
      let n = await sails.helpers.saveContent(
        assocID, contentType, content, fieldName
      );
      let s = null;
      let q = {}; q[fieldName] = n.id;
      s = await Character.update({id: characterID}).set(q).fetch();
    } catch (e) { console.log(e); }
    return;
  }
};
