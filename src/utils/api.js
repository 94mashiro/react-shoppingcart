// import cheerio from 'cheerio'
// import request from 'superagent'
// export function fetchAppInfo2(url) {
//   return new Promise((resolve, reject) => {
//     request
//       .get(url)
//       .end((err,res) => {
//         if (err) {
//           reject(err)
//         } else {
//           const $ = cheerio.load(res.text)
//           const itemProps = $('*[itemprop]')
//           console.log(itemProps)
//           let info = {
//             name: []
//           }
//           itemProps.each((i,item) => {
//             const type = $(item).prop('itemprop')
//             switch (type) {
//               case 'name':
//                 const name = $(item).text()
//                 info[type].push(name)
//                 break
//               case 'image':
//                 const src = $(item).prop('content')
//                 info[type] = src
//                 break
//               case 'price':
//                 const price = parseFloat($(item).text().substr(1))
//                 info[type] = price
//                 break
//               default:
//                 break
//             }
//           })
//           info['author'] = info['name'][1]
//           info['name'] = info['name'][0]
//           resolve(info)
//         }
//       })
//   })
// }

export function fetchAppInfo(url) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/?url=${url}`)
  .then(response => resolve(response.json()))
  .catch(err => reject(err))
  })
}

export function fetchAppList() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/list`)
    .then(response => resolve(response.json()))
    .catch(err => reject(err))
  })
}

export function fetchAppPrice(id) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/price/${id}`)
    .then(response => resolve(response.json()))
    .catch(err => reject(err))
  })
}

export function parseAppInfo(id) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/detail/${id}`)
    .then(response => resolve(response.json()))
    .catch(err => reject(err))
  })
}