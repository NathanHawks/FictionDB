module.exports = {
  attributes: {
    roleLabel: { type: 'string', required: true },
    content: { type: 'string', required: true, unique: true }
  }
};
