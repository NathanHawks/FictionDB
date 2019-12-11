module.exports = {
  attributes: {
    eraID: { model: 'Era' },
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    trash: { type: 'boolean' }
  },
  get: async (settingID) => {
    return await Setting.findOne({id: settingID})
      .populate('authorTitle')
      .populate('newsTitle')
      .populate('colloqTitle')
      .populate('authorNote')
      .populate('publicNote');
  }
};
