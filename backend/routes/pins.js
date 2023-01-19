const router = require('express').Router();
const Pin = require('../models/Pin');

//create a pin
router.post('/', async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pins
router.get('/', async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete pin by id
router.delete('/:id', async (req, res) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    res.status(200).json('pin has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
