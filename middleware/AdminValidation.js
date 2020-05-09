const Auth = require('../models/Auth');

module.exports = {
  async ApiKeyValidation(key) {
    if (key == null) {
      throw new Error('Missing Api Key');
    }
    const authResponse = await Auth.find({ apiKey: key });

    if (authResponse.length > 0) {
      return true;
    }
    throw new Error('Invalid Api Key');
  },
};
