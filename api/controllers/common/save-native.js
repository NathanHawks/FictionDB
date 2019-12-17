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
  fn: async function ({linkedID, linkedType, content, fieldName}) {
    // console.log(` linkedID: ${linkedID}\n contentType: ${contentType}\n`
    //   +` assocID: ${assocID}\n content: ${content}\n fieldName: ${fieldName}`);
    // if (content === '') { content = ' '; }
    var modelRef = null;
    switch (linkedType) {
      case 'Character':   modelRef = Character; break;
      case 'Event':       modelRef = Event;     break;
      case 'Location':    modelRef = Location;  break;
      case 'Setting':     modelRef = Setting;   break;
      case 'Story':       modelRef = Story;     break;
    }
    let q = {};
    q[fieldName] = content;
    s = await modelRef.update({id: linkedID}).set(q).fetch();
    return;
  }
};
