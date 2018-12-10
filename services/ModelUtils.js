module.exports = {

  /**
  * Gets model array from request array.
  * idsArray: [{id:2}]    Each element must have an id key.
  * model:  Model where to search
  * Returns error if no model is found
  */
  findModelsByIds: (model, idsArray) => {
    return new Promise((resolve, reject) => {
      if (!idsArray || idsArray.length == 0) {
        resolve([]);
      }
      const query = {
        where: {id: idsArray.map((objectWithId) => {
          return objectWithId;})},
      };
      resolve(model.findAll(query));
    })
    .then(instances => {
      if (instances.length != idsArray.length) {
        idsFound = instances.map(elem => {return elem.id;});
        idsArray.forEach(id => {
          if (!(id in idsFound)) {
            throw new Error('notFound', 'notFound {{model}}', {model: modelName});
          }
        });
      }
      return instances;
    })
    .catch(err => {
      throw new Error('Err', err);
    });
  }
};
