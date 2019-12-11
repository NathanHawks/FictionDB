module.exports = {
  attributes: {
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    trash: { type: 'boolean' }
  },
  getTitleFieldNames: () => {
    return ['authorTitle', 'newsTitle', 'colloqTitle'];
  },
  getTitleFieldRefs: () => {
    return [Title, Title, Title];
  },
  get: async (eventID) => {
    return await Event.findOne({id: eventID})
      .populate('authorTitle')
      .populate('newsTitle')
      .populate('colloqTitle')
      .populate('authorNote')
      .populate('publicNote');
  },
};
