module.exports = {
  attributes: {
    story: { model: 'Story' },
    character: { model: 'Character' },
    importanceGroup: { type: 'string' },
    outline: { model: 'Note' },
    role: { model: 'Title' }
  }
};
