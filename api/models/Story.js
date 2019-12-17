module.exports = {
  attributes: {
    mainTitle: { model: 'Title', required: true, unique: true },
    elevatorPitch: { model: 'Note' },
    summary: { model: 'Note' },
    trash: { type: 'boolean' }
  },
  getTitleFieldNames: () => {
    return ['mainTitle'];
  },
  getTitleFieldRefs: () => {
    return [Title];
  },
  getNoteFieldNames: () => { return ['elevatorPitch','summary']; },
  getNativeFieldNames: () => {
    return [];
  },
  getNativeFieldTypes: () => {
    return [];
  },
  getNativeFieldUI: () => {
    return [];
  },
  getNativeFieldValues: () => {
    return [];
  },
  get: async (storyID) => {
    return await Story.findOne({id: storyID})
      .populate('mainTitle')
      .populate('summary')
      .populate('elevatorPitch');
  }
};
