module.exports = {
  attributes: {
    eraID: { model: 'Era' },
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    trash: { type: 'boolean' }
  }
};
