var express = require('express');
var router = express.Router();

const appstore = require('../utils/appstore')
const appModel = require('../models/app')
const hookModel = require('../models/hook')

router.get('/app', (req, res) => {
  appModel.list()
    .then(apps => res.send(apps))
    .catch(err => res.send(err))
})

.post('/sethook', (req, res) => {
  const URL = req.body.url
  hookModel.setUrl(URL)
})
// .get('/test', (req, res) => {
//   appstore.fetchAppInfo('https://itunes.apple.com/cn/app/shadowmatic/id775888026?mt=8')
//   .then(info => appModel.add(info))
//   .then(() => res.send('ok'))
//   .catch(err => res.send(err))
// })
.post('/app', (req, res) => {
  const URL = req.body.url
  appstore.fetchAppInfo(URL)
    .then(info => appModel.add(info))
    .then(app => res.send(app))
    .catch(err => res.send(err))
})

module.exports = router
