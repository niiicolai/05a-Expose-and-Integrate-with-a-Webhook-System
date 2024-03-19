import fs from 'fs'

/**
 * @function read
 * @description Read the data from the storage file
 * @returns {Object} The data from the storage file
 */
const read = () => {
  const data = fs.readFileSync('data.json')
  return JSON.parse(data)
}

/**
 * @function update
 * @description Update the data in the storage file
 * @param {String} url The URL to add
 * @param {String} event The event to add
 * @returns {void}
 */
const update = (url, event) => {
    const data = read()
    data[event].push(url)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
}

/**
 * @function destroy
 * @description Remove the data from the storage file
 * @param {String} url The URL to remove
 * @param {String} event The event to remove
 * @returns {void}
 */
const destroy = (url, event) => {
    const data = read()
    data[event] = data[event].filter(u => u !== url)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
}

/**
 * @function send
 * @description Send the payload to the URLs in the storage file
 * @param {String} event The event to send
 * @param {Object} payload The payload to send
 * @returns {void}
 */
const send = (event, payload) => {
    const data = read()
    data[event].forEach(async url => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        console.log('Webhook sent to', url, 'with response', response.status, response.statusText)
    })
}

export default {
    read,
    update,
    destroy,
    send
}
