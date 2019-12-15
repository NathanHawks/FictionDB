module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    eventID: {
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
      viewTemplatePath: 'common/json-ok'
    }
  },
  fn: async function ({eventID, contentType, assocID, content, fieldName}) {
    // console.log(` eventID: ${eventID}\n contentType: ${contentType}\n`
    //   +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
    try {
      let n = await sails.helpers.saveContent(
        assocID, contentType, content, fieldName
      );
      let s = null;
      let q = {}; q[fieldName] = n.id;
      s = await Event.update({id: eventID}).set(q).fetch();
    } catch (e) { console.log(e); }
    return;
  }
};
