const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {

  try {
    const count = await Department.countDocuments(); // liczy wszystkie elementy w kolekcji
    const rand = Math.floor(Math.random() * count); // losowa liczba
    const dep = await Department.findOne().skip(rand); // przeskakuje (skip) o losową liczbę od poczatku kolekcji i wybiera ten dokument
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.get('/departments/:id', async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id); // mongoose sam konwertuje id do odpowiedniego formatu
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/departments', async (req, res) => {

  try {

    const { name } = req.body;
    const newDepartment = new Department({ name: name }); // tworzenie nowego dokumentu na bazie modelu
    await newDepartment.save(); // zapisanie go w kolekcji (pod maską używa insertOne)
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findById(req.params.id);
    if(dep) { // jeśli szukany departament istnieje
      dep.name = name; // zmień jego atrybut name
      await dep.save(); // zaktualizuj ten dokument
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/departments/:id', async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
