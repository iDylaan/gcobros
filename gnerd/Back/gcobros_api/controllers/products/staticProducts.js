// Catalogo de productos obtenidos de https://developers.google.com/admin-sdk/reseller/v1/how-tos/products?hl=es-419
// Precios asignados mediante reglas de negocio con la empresa
const STATIC_PRODUCTS = [
    // GOOGLE WORKSPACE
    {
        skuId: "1010020027",
        skuName: "Google Workspace Business Starter",
        productName: "Google Workspace Business Starter",
        monthlyPrice: 144.0,
        yearlyPrice: 1440.0,
    },
    {
        skuId: "1010020028",
        skuName: "Google Workspace Business Standard",
        productName: "Google Workspace Business Standard",
        monthlyPrice: 288.0,
        yearlyPrice: 2880.0,
    },
    {
        skuId: "1010020025",
        skuName: "Google Workspace Business Plus",
        productName: "Google Workspace Business Plus",
        monthlyPrice: 432.0,
        yearlyPrice: 4320.0,
    },
    // {
    //     skuId: null,
    //     skuName: null,
    //     productName: "Google Workspace Enterprise",
    //     monthlyPrice: null.0,
    //     yearlyPrice: null.0,
    // },
    // G SUITE
    // {
    //     skuId: 'Google-Apps-For-Business',
    //     skuName: 'G Suite Basic',
    //     productName: "G Suite Basic",
    //     monthlyPrice: null.0,
    //     yearlyPrice: null.0,
    // },
    // EDUCATION
    {
        skuId: 'Google-Apps-For-Education',
        skuName: 'Google Workspace for Education Fundamentals',
        productName: "Google Workspace for Education Fundamentals",
        monthlyPrice: 0.0,
        yearlyPrice: 0.0,
    },
    {
        skuId: '1010370001',
        skuName: 'Google Workspace for Education: Teaching and Learning Upgrade',
        productName: "Teaching and Learning Upgrade",
        monthlyPrice: 80.0,
        yearlyPrice: 864.0,
    },
    {
        skuId: '1010310008',
        skuName: 'Google Workspace for Education Plus',
        productName: "Google Workspace for Education Plus",
        monthlyPrice: 100.0,
        yearlyPrice: 1080.0,
    },
]

module.exports = {
    STATIC_PRODUCTS
}