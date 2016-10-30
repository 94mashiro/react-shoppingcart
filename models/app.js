import schedule from 'node-schedule'
import db from '../db'
import Sequelize from 'sequelize'
import appstore from '../utils/appstore'
import * as Hook from './hook'
import request from 'superagent'

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
  return new Promise((resolve, reject) => {
    App.update(info, {
      where: {
        id: id
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
          count ++
          console.log(count, apps.length)
          if (count === apps.length) {
            resolve()
          }
          console.log(info.price,"  ",app.price);
          if (info.price !== app.price) {
            console.log(info.name, '\'s price had changed')
            let newPrice = info.price.substr(1)
            let originPrice = app.price.substr(1)

            let status = 0
            if (isNaN(newPrice)) {
              status = 2 // free
            } else {
              if (newPrice < originPrice) {
                status = 1
              }
            }
            console.log('status', status);
            edit(app.id, {
              status: status,
              price: info.price
            })
            let sendInfo = {
                name: info.name,
                status: status,
                oldPrice: originPrice,
                newPrice: newPrice,
            }
            sendMessgae(sendInfo)
          }
        })
    }))
  })
}

function sendMessgae(info) {
  return new Promise((resolve, reject) => {
    Hook.getUrl()
      .then(url => {
        request
          .post(url)
          .send({
            name: info.name[0],
            status: info.status,
            oldPrice: info.oldPrice,
            newPrice: info.newPrice || 0
          })
          .end(function(err, res){
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
      })
      .catch(err => reject(err))
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
