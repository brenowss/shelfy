const connection = require('../database/connection');

module.exports= {
    async index(req, res) {
        const discover = await connection('discover')
        .select("*")
        .limit(1)

        return res.json(discover);
    }
}