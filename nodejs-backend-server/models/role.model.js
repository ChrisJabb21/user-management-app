//link it to a foreign key in user column for role.

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", { //changed from roles to role
    id: {
         type: Sequelize.INTEGER,
         primaryKey: true
    },
    name: {
        type: Sequelize.STRING
   },
    },
    
    {
        timestamps: true
    });
    return Role;

};