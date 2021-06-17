const Mongoose = require("mongoose");

class BaseRepository {
  constructor(Model) {
    this.Model = Model;
  }

 

  create(element) {
    const elementToStore = new this.Model(element);
    return elementToStore.save();
  }

  list(name) {
    return this.Model.find({
      name: new RegExp(name, "i"),
    });
  }

  update(id, element) {
    return this.Model.findByIdAndUpdate(id, element, { new: true });
  }

  disable(id, element) {
    const elementToUpdate = new this.Model(element);
    elementToUpdate.active = false;
    return this.Model.findByIdAndUpdate(id, elementToUpdate, { new: true });
  }

  findById(id) {
    return this.Model.findById(id);
  }

  findOne(name) {
    return this.Model.findOne({ name: name });
  }

  delete(id) {
    return this.Model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
