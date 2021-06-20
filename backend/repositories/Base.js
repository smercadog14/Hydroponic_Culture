const Mongoose = require("mongoose");

class BaseRepository {
  constructor(Model) {
    this.Model = Model;
  }

  validId(id) {
    return Mongoose.Types.ObjectId.isValid(id);
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

  getAll(params = {}) {
    return this.Model.find(params);
  }

  update(id, element) {
    return this.Model.findByIdAndUpdate(id, element, { new: true });
  }

  findById(id) {
    return this.Model.findById(id);
  }

  findOne(element) {
    return this.Model.findOne(element);
  }

  remove(id) {
    return this.Model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
