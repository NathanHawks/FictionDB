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
    return [[
      'Land Plot',
      'District',
      'City',
      'County',
      'State',
      'Country',
      'Continent',
      'Hemisphere',
      'Planet',
      'Planetary System',
      'Solar System',
      'Galaxy',
      'Universe',
      'Multiverse',
    ]];
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
