module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    linkedID: {
      type: 'number',
      required: true
    },
    linkedType: {
      type: 'string',
      required: true,
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
  fn: async function ({linkedID, linkedType, contentType, assocID, content, fieldName}) {
    // console.log(` linkedID: ${linkedID}\n contentType: ${contentType}\n`
    //   +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
    if (content === '') { content = ' '; }
    var modelRef = null;
    switch (linkedType) {
      case 'character':   modelRef = Character; break;
      case 'event':       modelRef = Event;     break;
      case 'location':    modelRef = Location;  break;
      case 'setting':     modelRef = Setting;   break;
      case 'story':       modelRef = Story;     break;
    }

    let ucfirstType = await sails.helpers.uppercaseFirst(linkedType);
    try {
      let n = await sails.helpers.saveContent(
        assocID, contentType, content, fieldName
      );
      let s = null;
      let q = {}; q[fieldName] = n.id;
      s = await modelRef.update({id: linkedID}).set(q).fetch();
    } catch (e) { console.log(e); }
    return;
  }
};
