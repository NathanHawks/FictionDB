module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    locationID: {
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
      viewTemplatePath: 'location/save-content'
    }
  },
  fn: async function ({locationID, contentType, assocID, content, fieldName}) {
    // console.log(` locationID: ${locationID}\n contentType: ${contentType}\n`
    //   +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
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
