// insert new user
app.post("/users", (req, res) => {
    let user = req.body;
    let sql = "SET @UserID = ?; SET @FirstName = ?; SET @LastName = ?; SET @Email = ?; SET @Phone = ?; CALL userAddUpdate(@UserID, @FirstName, @LastName, @Email, @Phone);";
    connection.query(sql, [user.UserID, user.FirstName, user.LastName, user.Email, user.Phone], (err, results) => {
            if (err) throw err;
            results.forEach(element => {
                if (element.constructor == Array)
                    res.send("User inserted with id : " + element[0].UserID);
            });
        }
    );
});

//update existing user
app.put("/users", (req, res) => {
    let user = req.body;
    let sql = "SET @UserID = ?; SET @FirstName = ?; SET @LastName = ?; SET @Email = ?; SET @Phone = ?; CALL userAddUpdate(@UserID, @FirstName, @LastName, @Email, @Phone);";
    connection.query(sql, [user.UserID, user.FirstName, user.LastName, user.Email, user.Phone], (err, results) => {
            if (err) throw err;
            res.send("User Updated Successfully");
    });
});

//delete a user
app.delete("/users/:userid", (req, res) => {
    let sql = "DELETE FROM users WHERE UserID = ?";
    connection.query(sql, [req.params.userid], (err, results) => {
        if (err) throw err;
        res.send("User successfully deleted");
    });
});
