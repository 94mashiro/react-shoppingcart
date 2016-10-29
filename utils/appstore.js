const cheerio = require('cheerio')
const request = require('superagent')

function fetchAppInfo(url) {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          const $ = cheerio.load(res.text)
          const itemProps = $('*[itemprop]')

          let info = {
            url,
            name: [],
          }

          itemProps.each((index, item) => {
            const type = $(item).prop('itemprop')
            console.log(type);
            switch (type) {
              case 'name':
                const name = $(item).text()
                console.log(name);
                info[type].push(name)
                break
              case 'image':
                const src = $(item).prop('content')
                console.log(src);
                info['icon'] = src
                break
              case 'price':
                const price = $(item).text()
                console.log(price);
                info[type] = price
                break
              default:
                break
            }
            resolve(info)
          })
        }
      })
  })
}

exports.fetchAppInfo = fetchAppInfo
