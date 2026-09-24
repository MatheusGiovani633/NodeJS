const mongoose = require('mongoose');

const bankConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Portal');
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro na conexão com o MongoDB:', error);
        process.exit(1);
    }
};

module.exports = bankConnect;