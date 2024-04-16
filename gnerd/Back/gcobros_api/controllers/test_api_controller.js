const getTestConnection = async (req, res) => {
    const message = 'Fue un exito la conexión con back.';
    res.status(200).json(message);
};

module.exports = {
    getTestConnection,
}