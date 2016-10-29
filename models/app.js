import schedule from 'node-schedule'
import db from '../db'
import Sequelize from 'sequelize'
import appstore from '../utils/appstore'

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
  url: Sequelize.STRING,
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  price: Sequelize.STRING
})

App.sync()


function add(info) {
  return new Promise((resolve, reject) => {
    App.findOne({
      where: {
        name: info.name[0]
      }
    })
    .then(app => {
      if (app) {
        reject({
          status: 2,
          message: 'App Exists'
        })
      } else {
        App.create({
          name: info.name[0],
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

function list() {
  return new Promise((resolve, reject) => {
    App.findAll()
      .then(apps => resolve(apps))
      .catch(err => reject(err))
  })
}

function edit(id, info) {
  return new promise((resolve, reject) => {
    App.update(info, {
      where: {
        id
      }
    })
    .then(app => resolve(app))
    .catch(err => reject(err))
  })
}

function check() {
  console.log('======= Check begin ======')
  return new Promise((resolve, reject) => {
    let count = 0
    list().then(apps => apps.map((app, index) => {
      appstore.fetchAppInfo(app.url)
        .then(info => {
          console.log('Fetched', info.name)
          count ++
          console.log(count, apps.length)
          if (count === apps.length) {
            resolve()
          }
          if (info.price !== app.price) {
            console.log(info.name, '\'s price had changed')
            let newPrice = info.price.substr(1)
            let originPrice = app.price.substr(1)

            let status = 0
            if (isNaN(newPrice)) {
              status = 2 // free
            } else {
              status = newPrice < numOriginPrice ? 1 : 0
            }
            edit(app.id, {
              status,
              price: info.price
            })
            .catch(err => reject(err))
          }
        })
    }))
  })
}


function cronJob() {
  check().then(() => console.log('check finish'))
}

cronJob()

let job = schedule.scheduleJob('0 */2 * * *', () => cronJob())


module.exports =  {
  add, list, check, edit
}
