import Sequelize from 'sequelize'
import path from 'path'

const db = new Sequelize('catchem', 'catchem', 'catchem', {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../', '_db/catchem.sqlite')
})

export default db
