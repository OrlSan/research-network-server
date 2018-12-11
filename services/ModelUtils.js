module.exports = {

  /**
  * Gets model array from request array.
  * idsArray: [{id:2}]    Each element must have an id key.
  * model:  Model where to search
  * Returns error if no model is found
  */
 
  findModelsByIds: (model, idsArray) => {
    if (!idsArray || idsArray.length == 0) {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    } else {
      const query = {
        where: {id: idsArray.map((objectWithId) => {
          return objectWithId;})},
      };
      return model.findAll(query)
        .then(instances => {
          if (instances.length != idsArray.length) {
            idsFound = instances.map(elem => {return elem.id;});
            idsArray.forEach(id => {
              if (!(id in idsFound)) {
                throw new Error('NotFound');
              }
            });
          }
          return instances;
        })
    
    }
  }
};
