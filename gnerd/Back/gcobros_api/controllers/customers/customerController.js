const db = require("../../models/index");
const { Customer, Transaction } = require("../../models/index");
const { Op } = require('sequelize');
const { handleResponse, handleErrorResponse } = require("../utils/misc.js");
const { getCustomersFromGoogleWorkspace } = require("../resellerApiController");



const getCustomersFromWorkSpace = async (req, res) => {
    try {
        console.log("Debug: getCustomersFromGoogleWorkspaceEndpoint");
        const customers = await getCustomersFromGoogleWorkspace();
        const customers_array = [];
        for (const customer of customers) {
            const customer_data = {
                customerDomain: customer.customerDomain,
                organizationName: customer.postalAddress.organizationName,
                customerName: customer.postalAddress.contactName,
                customerEmail: customer.alternateEmail,
                customerPhone: customer.phoneNumber,
                customerLocality: customer.postalAddress.locality,
                customerRegion: customer.postalAddress.region,
                customerCountryCode: customer.postalAddress.countryCode,
                customerAdress1: customer.postalAddress.addressLine1,
                customerPostalCode: customer.postalAddress.postalCode,
            }
            customers_array.push(customer_data);
        }

        return res.json(handleResponse(customers_array));
    } catch (error) {
        console.log(error);
    }
}


const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({ where: { active: true } });
        for (const customer of customers) {
            const user_transaction = await Transaction.findOne({
                where: {
                    status: {
                        [Op.ne]: "DELAYED"
                    },
                    domain: customer.customerDomain
                },
                order: [['created', 'DESC']],
                limit: 1
            });
            const user_transaction_delayer = await Transaction.findOne({
                where: {
                    status: "DELAYED",
                    domain: customer.customerDomain
                },
                order: [['created', 'DESC']],
            });
            customer.setDataValue('transaction', user_transaction);
            customer.setDataValue('delayed_transaction', user_transaction_delayer);

            if (user_transaction_delayer) {
                customer.setDataValue('transaction_status', 'RETRASADO');
            } else if (user_transaction) {
                if (user_transaction.status === 'TO_PAY') customer.setDataValue('transaction_status', 'PENDIENTE');
                else if (user_transaction.status === 'PAID') customer.setDataValue('transaction_status', 'PAGADO');
            } else {
                customer.setDataValue('transaction_status', '');
            }
        }
        return res.json(handleResponse(customers));
    } catch (error) {
        console.log(error);
        return res.status(500).json(handleErrorResponse({ message: error.message }));
    }
}

async function validateExistCustomer(customer) {
    const customerInDB = await Customer.findOne({
        where: {
            customerId: customer?.customerId,
            customerDomain: customer?.customerDomain
        },
    });

    if (customerInDB === null) {
        return false;
    }

    return true;
}

const createCustomersInDatabase = async (customers) => {
    const transaction = await db.sequelize.transaction();

    try {
        for (const customer of customers) {

            if (await validateExistCustomer(customer)) {
                continue;
            }

            await Customer.create(
                {
                    customerId: customer.customerId,
                    customerDomain: customer.customerDomain,
                    customerName: customer.postalAddress.contactName,
                    organizationName: customer.postalAddress.organizationName,
                    countryCode: customer.postalAddress.countryCode,
                    active: true
                },
                { transaction: transaction }
            );
        }
        await transaction.commit();
    } catch (error) {
        // Revert changes
        console.log(
            "Ocurrio un problema al intentar guardar los customers: " + error
        );
        await transaction.rollback();
    }
};


const getCustomer = async (req, res) => {
    const { idUser } = req.params;
    try {
        const customer = await Customer.findOne({
            where: {
                customerId: idUser
            }
        });
        const delayed_transaction = await Transaction.findOne({
            where: {
                status: "DELAYED",
                domain: customer.customerDomain
            },
            order: [['created', 'DESC']],
        })
        const transaction = await Transaction.findOne({
            where: {
                status: {
                    [Op.ne]: "DELAYED"
                },
                domain: customer.customerDomain
            },
            order: [['created', 'DESC']],
            limit: 1
        })
        customer.setDataValue('transaction', transaction);
        customer.setDataValue('delayed_transaction', delayed_transaction);
        return res.json(handleResponse(customer));
    } catch (error) {
        console.log(error);
        return res.status(500).json(handleErrorResponse({ message: error.message }));
    }
}


// ----------------------------------------------------------------------------- //

module.exports = {
    createCustomersInDatabase,
    getCustomers,
    getCustomer,
    getCustomersFromWorkSpace
}