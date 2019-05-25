const Project = require('./../models/Project')

class ProjectController {
  async index (req, res) {
    const projects = await Project.paginate(
      {},
      {
        limit: 20,
        page: req.query.page || 1,
        sort: '-createdAt',
        populate: ['author']
      }
    )

    return res.json(projects)
  }
  async show (req, res) {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json()
    }

    return res.json(project)
  }
  async store (req, res) {
    const project = await Project.create({ ...req.body, author: req.userId })
    return res.json(project)
  }
  async update (req, res) {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(project)
  }
  async destroy (req, res) {
    const project = await Project.findByIdAndDelete(req.params.id)
    return res.send(project)
  }
}

module.exports = new ProjectController()
