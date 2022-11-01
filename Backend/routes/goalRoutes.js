const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Get goals'})
})

router.post('/', (req, res) => {
    res.status(200).json({ message: 'set goals'})
})

router.put('/:id', (req, res) => {
    res.status(200).json({ message: `update goals ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `update goals ${req.params.id}`})
})


module.exports = router