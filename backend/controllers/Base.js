class BaseController {
  constructor(Service) {
    this.service = new Service();
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.list = this.list.bind(this);
    this.getOne = this.getOne.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create(req, res) {
    try {
      const result = await this.service.create(req.body);
      return res.status(201).json({ result });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const results = await this.service.update(req.params.id, req.body);
      console.log("BaseController ~ results", results);

      return res.status(202).json({ results });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async list(req, res) {
    let results;
    try {
      if (req.query.name) {
        results = await this.service.list(req.query.name);
      } else {
        results = await this.service.getAll(req.query);
      }

      return res.status(200).json({ results });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const element = await this.service.get(req.params.id);
      return res.status(200).json({ element });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const results = await this.service.remove(req.params.id);
      return res.status(202).json({ results });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

module.exports = BaseController;
