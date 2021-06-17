class BaseController {
  constructor(repository) {
    this.repository = repository;
  }

  async create(req, res) {
    const existingRecord = await this.repository.findOne(req.body.name);

    if (existingRecord)
      return res.status(400).send("Process failed: entity already exists");

    const result = await this.repository.create(req.body);

    if (!result) return res.status(401).send("Failed to register role");
    return res.status(200).send({ result });
  }

  async list(req, res) {
    const list = await this.repository.list(req.params.name);
    if (!list) return res.status(200).send("No data were found.");
    return res.status(200).send({ results: list });
  }

  async update(req, res) {
    const validId = await repository.validId(req.body._id);
    if (!validId) return res.status(401).send("Error: Invalid id");

    const result = await repository.update(req.body);
    if (!result) return res.status(400).send("Error: Could not update.");
    return res.status(200).send({ message: "Updated successfully", role });
  }

  async disable(req, res) {
    const validId = await repository.validId(req.body._id);
    if (!validId) return res.status(401).send("Error: Invalid id");

    let result = await repository.update(req.body);

    if (!result)
      return res.status(400).send("Process failed: Error delete Role");
    return res.status(200).send({ role });
  }
}

module.exports = BaseController;
