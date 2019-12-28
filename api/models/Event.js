module.exports = {
  attributes: {
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    intensity: { type: 'number' },
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
    return ['intensity'];
  },
  getNativeFieldTypes: () => {
    return ['number'];
  },
  getNativeFieldUI: () => {
    return ['spinner'];
  },
  getNativeFieldValues: () => {
    let r = [];
    // intensity
    let i = [];
    for (let x = 1; x < 101; x++) { i[x-1] = x; }
    return [i];
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
