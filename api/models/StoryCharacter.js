module.exports = {
  attributes: {
    story: { model: 'Story' },
    character: { model: 'Character' },
    group: { type: 'string' },
    outline: { model: 'Note' },
    role: { model: 'Title' },
    sequence: { type: 'number' }
  }
};
