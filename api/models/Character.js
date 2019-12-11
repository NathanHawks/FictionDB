module.exports = {
  attributes: {
    realName: { model: 'Title', required: true },
    codeName: { model: 'Title' },
    traits: { model: 'Note' },
    backstory: { model: 'Note' },
    trash: { type: 'boolean' }
  },
  get: async (characterID) => {
    return await Character.findOne({id: characterID})
      .populate('realName')
      .populate('codeName')
      .populate('traits')
      .populate('backstory');
  },
};
