'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcrypt');
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

        // async function hashPassword(plaintextPassword) {
        //     const hash = await bcrypt.hash(plaintextPassword, 10);
        // }
         
        // async function comparePassword(plaintextPassword, hash) {
        //     const result = await bcrypt.compare(plaintextPassword, hash);
        //     return result;
        // }

        static async createAdmin(adminData) {
            const transaction = await this.sequelize.transaction();

            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(adminData.password, salt);

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
        hooks: {
            // Hash de la contraseña antes de guardarla en la base de datos
            beforeCreate: async (admin, options) => {
                /*
                 El numero de genSalt puede ser mas alto para mas seguridad 
                 (aumenta los caracteres con la que hashea la contraseña), 
                 pero hace mas consumo conputacional.
                */
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(admin.password, salt);
            },
            beforeUpdate: async (admin, options) => {
                if (admin.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    admin.password = await bcrypt.hash(admin.password, salt);
                }
            }
        }
    });
    return Admin;
};