const connection = require("../database/connection");

module.exports = {
  async highlight(req, res) {
    const amazon_week_highlight = await connection("amazon_week_highlight")
      .select("*")
      .limit(1)
      .orderBy("id", "desc");

    return res.json(amazon_week_highlight);
  },

  async subjects(req, res) {
    const subjects = await connection("subjects")
      .select("*");
      
    return res.json(subjects);
  },

};
