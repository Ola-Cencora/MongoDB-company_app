const Employee = require("../models/employee.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate("department"));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const empl = await Employee.findOne().populate("department").skip(rand);
    if (!empl) res.status(404).json({ message: "Not found" });
    else res.json(empl);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id).populate("department");
    if (!empl) res.status(404).json({ message: "Not found" });
    else res.json(empl);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const empl = await Employee.findById(req.params.id);
    if (empl) {
      empl.firstName = firstName;
      empl.lastName = lastName;
      empl.department = department;
      await empl.save();
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id);
    if (empl) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
