//update a user
app.put("/users", (req, res) => {
    let emp = req.body;
    var sql =
        "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL usersAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    connection.query(
        sql,
        [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
        (err, rows, fields) => {
            if (!err) res.send("Updated successfully");
            else console.log(err);
        }
    );
});

//delete a user
app.delete("/userss/:id", (req, res) => {
    connection.query(
        "DELETE FROM users WHERE EmpID = ?",
        [req.params.id],
        (err, rows, fields) => {
            if (!err) res.send("Deleted successfully.");
            else console.log(err);
        }
    );
});
