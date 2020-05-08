module.exports = {
    ApiKeyValidation: function (key) {
        return new Promise((resolve, reject) => {
            if (key == null) {
                reject({ message: 'Missing Api Key' });
            } else {
                if (key == 'test') {
                    resolve();
                } else {
                    reject({ message: 'Invalid Api Key' });
                }
            }
        })

    }
}