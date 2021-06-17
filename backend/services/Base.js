class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  validId(id) {
    return Mongoose.Types.ObjectId.isValid(id);
  }


  

}