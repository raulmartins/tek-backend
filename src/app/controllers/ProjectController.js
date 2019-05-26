const Project = require('./../models/Project')
const api = require('./../../config/service')
const status = require('./../../config/status')
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

  async health (req, res) {
    const response = await api.post('values', req.body)
    const project = await Project.findById(req.params.id)
    if (!project.spentHours.length) return res.json(status.VERY_GOOD)
    const suggestHours = Number(response.data)
    if (!response) {
      return res.status(404).json({ error: 'Machine Learn not found' })
    }
    if (!project) {
      return res.status(404).json({ error: 'Project Not Found' })
    }
    const { duration } = project
    const weekIdealHours = suggestHours / duration
    const idealCurrentWork = weekIdealHours * project.spentHours.length

    const workedHours = project.spentHours.reduce((acc, h) => acc + h, 0)
    const kpi = (workedHours * 100) / idealCurrentWork - 100

    if (kpi <= 30) return res.json(status.VERY_GOOD)

    if (kpi > 30 && kpi <= 35) return res.json(status.GOOD)

    if (kpi > 35 && kpi <= 40) return res.json(status.BAD)

    if (kpi > 40) return res.json(status.VERY_BAD)
  }
}

module.exports = new ProjectController()
