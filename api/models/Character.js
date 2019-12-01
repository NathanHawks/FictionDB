module.exports = {
  attributes: {
    realName: { model: 'Title', required: true },
    codeName: { model: 'Title' },
    traits: { model: 'Note' },
    backstory: { model: 'Note' }
  }
};
