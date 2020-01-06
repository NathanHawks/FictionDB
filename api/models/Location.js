module.exports = {
  attributes: {
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    scale: { type: 'number' },
    locativeJSON: { model: 'Note' },
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
      'Precise Spot',
      'Room',
      'Area of Building',
      'Building',
      'Complex',
      'Land Plot',
      'District',
      'City',
      'County',
      'State',
      'Country',
      'Continent',
      'Planet',
      'Planetary System',
      'Solar System',
      'Galaxy',
      'Universe',
    ]];
  },
  get: async (locationID) => {
    return await Location.findOne({id: locationID})
      .populate('authorTitle')
      .populate('newsTitle')
      .populate('colloqTitle')
      .populate('authorNote')
      .populate('publicNote');
  },
};
