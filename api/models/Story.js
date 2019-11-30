module.exports = {
  attributes: {
    mainTitle: { model: 'Title', required: true, unique: true },
    elevatorPitch: { model: 'Note' },
    summary: { model: 'Note' }
  }
};
