const express = require("express");
const router = express.Router();
const members = require("../../Member");
const uuid = require("uuid");

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const member = members.filter(
      member => member.id === parseInt(req.params.id)
    );
    res.json(member);
  } else {
    res
      .status(400)
      .json({ msg: `No member found with this id: ${req.params.id}` });
  }
});

router.post("/", (req, res) => {
  const new_member = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "Pending"
  };

  if (!new_member.name || !new_member.email) {
    return res.status(400).json({ msg: "Please fill the name-email field." });
  }
  members.push(new_member);
  res.json(members);
});

router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const update_member = req.body;
    if (!update_member.name || !update_member.email) {
      res.json({ msg: "Please fill the name-email field" });
    } else {
      members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
          member.name = update_member.name;
          member.email = update_member.email;
          res.json({ msg: "Member updated!", member: member });
        }
      });
    }
  } else {
    res
      .status(400)
      .json({ msg: `No member found with the id ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    members.forEach(member => {
      if (member.id == req.params.id) {
        res.json({
          msg: "Member deleted!",
          members: members.filter(member => member.id != req.params.id)
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member found with this id: ${req.params.id}` });
  }
});

module.exports = router;
