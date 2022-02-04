const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Transaction = require("../models/transaction");

// get all users
router.get("/all", (req, res) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(err => console.log(err));
});

// insert new user
router.post("/create", (req, res) => {
    const data = req.body;
    User.create({
        name: data.name,
        email: data.email,
        phone: data.phone
    })
        .then(user => res.redirect("/all"))
        .catch(err => console.log(err));
});

// update an existing user
router.put("/update", (req, res) => {
    const data = req.body;
    User.update(
        {
            name: data.name,
            email: data.email,
            phone: data.phone
        },
        { where: { id: req.query.id } }
    )
        .then(user => res.redirect("/all"))
        .catch(err => console.log(err));
});

// delete a user
router.delete("/delete", (req, res) => {
    const id = req.query.id;
    console.log(id);
    User.findByPk(id)
        .then(resultToDelete => resultToDelete.destroy(id))
        .then(resultAfterDestroy =>
            res
                .status(201)
                .send(`Deleted user with id: ${resultAfterDestroy.id}`)
        )
        .catch(err => console.log(err));
});

module.exports = router;
