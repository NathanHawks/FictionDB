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
    return [['Universe', 'Galaxy', 'Solar System', 'Planetary System', 'Planet',
    'Continent', 'Country', 'State', 'County', 'City', 'District', 'Land Plot',
    'Complex', 'Building', 'Area of Building', 'Room', 'Precise Spot']];
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
