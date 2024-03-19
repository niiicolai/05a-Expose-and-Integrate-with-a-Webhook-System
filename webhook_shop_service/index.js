import WebhookStorage from './storage.js'
import express from 'express'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/webhook', (req, res) => {
    const { url, event } = req.body

    if (!url) {
        return res.status(400).json({message: 'Url is required'})
    }

    if (!event) {
        return res.status(400).json({message: 'Event is required'})
    }

    const data = WebhookStorage.read()
    if (!data[event]) {
        return res.status(400).json({message: 'Event is not supported'})
    }

    if (data[event].includes(url)) {
        return res.status(400).json({message: 'Url already exists'})
    }

    WebhookStorage.update(url, event)

    res.status(200).json({message: `Webhook for ${event} event has been added`})
})

app.delete('/webhook', (req, res) => {
    const { url, event } = req.body

    if (!url) {
        return res.status(400).json({message: 'Url is required'})
    }

    if (!event) {
        return res.status(400).json({message: 'Event is required'})
    }

    const data = WebhookStorage.read()
    if (!data[event]) {
        return res.status(400).json({message: 'Event is not supported'})
    }

    if (!data[event].includes(url)) {
        return res.status(400).json({message: 'Url does not exist'})
    }

    WebhookStorage.destroy(url, event)

    res.status(200).json({message: `Webhook for ${event} event has been removed`})
})

app.post('/ping', (req, res) => {
    WebhookStorage.send('purchase_confirmed', req.body)

    res.status(200).json({message: 'Thank you for your purchase!'})
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
