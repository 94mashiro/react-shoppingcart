import schedule from 'node-schedule'
import db from '../db'
import Sequelize from 'sequelize'

const Hook = db.define('hook', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING
})

Hook.sync().then(() => {
  Hook.findOrCreate({
    where: {
      name: 'webhook'
    },
    defaults: {
      url: ''
    }
  })
})

export function setUrl(url) {
  console.log('seturl');
  return new Promise((resolve, reject) => {
    Hook.update({url}, {where:{name:'webhook'}})
    .then(() => resolve())
    .catch(err => reject(err))
  })
}

export function getUrl() {
  return new Promise((resolve, reject) => {
    Hook.findOne({
      where: {
        name:'webhook'
      }
    })
    .then(webhook => resolve(webhook.url))
    .catch(err => reject(err))
  })
}
