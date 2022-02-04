const sequelize = require("./config/database");

sequelize.authenticate().then(() => console.log("Database Connected")).catch(err => console.log('Error:'+err))

// sequelize
//     // .sync({force: true})
//     .sync()
//     .then(result => {
//         return User.create({
//             name: "Anil Kumar",
//             email: "anil@gmail.com",
//             phone: 6709876520
//         });
//     })
//     .then(user => {
//         console.log(user);
//     })
//     .catch(err => {
//         console.log(err);
//     });
