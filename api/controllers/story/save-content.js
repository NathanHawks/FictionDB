module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    storyID: {
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
      viewTemplatePath: 'story/save-content'
    }
  },
  fn: async function ({storyID, contentType, assocID, content, fieldName}) {
    // console.log(` storyID: ${storyID}\n contentType: ${contentType}\n`
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
        let s = null;
        let q = {}; q[fieldName] = n.id;
        s = await Story.update({id: storyID}).set(q).fetch();
        while (s === undefined) {}
      }
    } catch (e) { console.log(e); }
    return;
  }
};
