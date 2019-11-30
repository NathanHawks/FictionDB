module.exports = {
  attributes: {
    location: { model: 'Location' },
    sequence: { type: 'number' },
    authorTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' }
  }
};
