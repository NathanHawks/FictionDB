module.exports = {
  attributes: {
    mainTitle: { model: 'Title', required: true, unique: true },
    elevatorPitch: { model: 'Note' },
    summary: { model: 'Note' },
    trash: { type: 'boolean' }
  },
  get: async (storyID) => {
    return await Story.findOne({id: storyID})
      .populate('mainTitle')
      .populate('summary')
      .populate('elevatorPitch');
  }
};
