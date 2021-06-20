function BaseControllers(Service) {
  const service = new Service();

  async function create(req, res) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json({ result });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async function update(req, res) {
    try {
      const results = await service.update(req.body._id, req.body);
      return res.status(204).json({ results });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async function list(req, res) {
    try {
      const results = await service.list(req.body);
      return res.status(200).json({ results });
    } catch (error) {
      //error.status || 500
      return res.status(500).json({ message: error.message });
    }
  }

  async function getOne(req, res) {
    try {
      const results = await service.get(req.params._id);
      return res.status(200).json({ results });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async function remove(req, res) {
    try {
      console.log("req.params", req.params);

      const results = await service.remove(req.params._id);

      return res.status(202).json({ results });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  return {
    create,
    list,
    getOne,
    remove,
    disable,
    update,
  };
}

module.exports = BaseControllers;
