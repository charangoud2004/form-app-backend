const express = require("express");
const Form = require("../models/FormModel");

const router = express.Router();

/** 📌 Create Form Entry */
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newForm = new Form({ name, email, message });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

/** 📌 Get All Forms (Only Non-Deleted) */
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find({ isDeleted: false });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 📌 Update a Form */
router.put("/:id", async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form || form.isDeleted) {
        return res.status(404).json({ error: "Form not found" });
      }
      const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedForm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

/** 📌 Soft Delete a Form (Mark isDeleted = true) */
router.delete("/:id", async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form || form.isDeleted) {
        return res.status(404).json({ error: "Form not found" });
      }
      await Form.findByIdAndUpdate(req.params.id, { isDeleted: true });
      res.json({ message: "Form entry soft deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  router.get("/:id", async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form || form.isDeleted) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
