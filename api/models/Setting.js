module.exports = {
  attributes: {
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    scale: { type: 'string' },
    trash: { type: 'boolean' }
  },
  getTitleFieldNames: () => {
    return ['authorTitle', 'newsTitle', 'colloqTitle'];
  },
  getTitleFieldRefs: () => {
    return [Title, Title, Title];
  },
  getNoteFieldNames: () => { return ['authorNote', 'publicNote']; },
  getNativeFieldNames: () => {
    return ['scale'];
  },
  getNativeFieldTypes: () => {
    return ['string'];
  },
  getNativeFieldUI: () => {
    return ['select'];
  },
  getNativeFieldValues: () => {
    return [['Multiverse', 'Universe', 'Galaxy', 'Solar System',
    'Planetary System', 'Planet', 'Continent', 'Country', 'State', 'County',
    'City', 'District', 'Land Plot']];
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
