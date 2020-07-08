const connection = require('../database/connection');

module.exports= {
    async index(req, res) {
        const discover = await connection('discover')
        .select("*")
        .limit(1)
        .orderBy("id", 'desc')

        return res.json(discover);
    }
}