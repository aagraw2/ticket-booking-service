module.exports = {
  ApiKeyValidation(key) {
    return new Promise((resolve, reject) => {
      if (key == null) {
        reject(new Error('Missing Api Key'));
      } else if (key === 'test') {
        resolve();
      } else {
        reject(new Error('Invalid Api Key'));
      }
    });
  },
};
