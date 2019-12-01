module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    storyID: {
      type: 'number'
    },
    noteID: {
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
  fn: async function ({storyID, noteID, content, fieldName}) {
    try {
      if (noteID !== -1) {
        let n = await Note.update({id: noteID}).set({content: content}).fetch();
      } else {
        let n = await Note.create({
          roleLabel: fieldName, content: content}).fetch();
        let s = null;
        let q = {}; q[fieldName] = n.id;
        s = await Story.update({id: storyID}).set(q).fetch();
      }
    } catch (e) { console.log(e); }
    return;
  }
};
