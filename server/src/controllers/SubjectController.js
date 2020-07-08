module.exports= {
    async index(req, res) {
        const subjects = [
            {
              name: "Romance",
              icon: "heart",
              color: "#e63946",
              image: "http://192.168.0.106:3333/images/subject_romance.png"
            },
            {
              name: "Mystery",
              icon: "incognito",
              color: "#bdb2ff",
              image: "http://192.168.0.106:3333/images/subject_mystery.png"
            },
            {
              name: "Sci-Fi",
              icon: "alien",
              color: "#2fa749",
              image: "http://192.168.0.106:3333/images/subject_scifi.png"
            },
            {
              name: "Drama",
              icon: "drama-masks",
              color: "#ffc6ff",
              image: "http://192.168.0.106:3333/images/subject_drama.png"
            },
            {
              name: "Fantasy",
              icon: "sword",
              color: "#f25f4c",
              image: "http://192.168.0.106:3333/images/subject_fantasy.png"
            },
            {
              name: "Self-Improvement",
              icon: "tree",
              color: "#a0c4ff",
              image: "http://192.168.0.106:3333/images/subject_selfimprovement.png"
            },
          ];

        return res.json(subjects);
    }
}