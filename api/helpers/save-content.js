module.exports = {
  friendlyName: 'Save content',
  description: '',
  inputs: {
    assocID: {
      type: 'number',
      required: true
    },
    contentType: {
      type: 'string',
      required: true
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
      description: 'All done.',
    },

  },
  fn: async function ({assocID,contentType,content,fieldName}) {
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
    }
    return n;
  }
};
