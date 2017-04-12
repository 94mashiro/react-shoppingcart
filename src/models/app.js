import db from '../utils/db'
import Sequelize from 'sequelize'

const App = db.define('app', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  icon: Sequelize.STRING,
  price: Sequelize.DOUBLE
})

App.sync()

export function add(info) {
  return new Promise((resolve, reject) => {
    App.findOne({
      where: {
        name: info.name
      }
    })
    .then( app => {
      if (app) {
        reject({
          message: "App exists"
        })
      } else {
        App.create({
          name: info.name,
          price: info.price,
          icon: info.icon,
          url: info.url
        })
        .then(app => resolve(app))
        .catch(err => reject(err))
      }
    })
    .catch(err => reject(err))
  })
}