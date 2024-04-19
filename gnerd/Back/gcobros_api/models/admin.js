'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

        // Verifica si la contraseña ingresada es correcta
        async validatePassword(password) { 
            return await bcrypt.compare(password, this.password);
        }

        static async createAdmin(adminData) {
            const transaction = await this.sequelize.transaction();

            try {
                const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

                const admin = await this.create({
                    ...adminData,
                    password: hashedPassword
                }, { transaction });

                // All Ok
                await transaction.commit();

                return admin;
            } catch (error) {
                await transaction.rollback();
                throw error; 
            }
        }
    }
    Admin.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        adminName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};