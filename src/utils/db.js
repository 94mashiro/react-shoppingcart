import Sequelize from 'sequelize'
import path from 'path'

// const db = new Sequelize('mysql://root:root@127.0.0.1:8889/cart')

var sequelize = new Sequelize('cart', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql'
})

export default sequelize