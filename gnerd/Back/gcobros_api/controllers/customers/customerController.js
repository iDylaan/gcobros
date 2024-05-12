const db = require("../../models/index");
const { Customer } = require("../../models/index");
const { handleResponse, handleErrorResponse } = require("../utils/misc.js");


const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({ where: { active: true } });
        return res.json(handleResponse(customers));
    } catch (error) {
        console.log(error);
        return res.status(500).json(handleErrorResponse({ message: error }));
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


module.exports = {
    createCustomersInDatabase,
    getCustomers
}