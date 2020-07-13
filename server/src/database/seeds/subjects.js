
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subjects').del()
    .then(function () {
      // Inserts seed entries
      return knex('subjects').insert([
        {
          id: 1,
          name: "Romance",
          url: "romance",
          icon: "heart",
          color: "#e63946",
          image: "http://192.168.0.107:1357/images/subject_romance.png"
        },
        {
          id: 2,
          name: "Mystery",
          url: "mystery",
          icon: "incognito",
          color: "#bdb2ff",
          image: "http://192.168.0.107:1357/images/subject_mystery.png"
        },
        {
          id: 3,
          name: "Sci-Fi",
          url: "science_fiction",
          icon: "alien",
          color: "#2fa749",
          image: "http://192.168.0.107:1357/images/subject_scifi.png"
        },
        {
          id: 4,
          name: "Humor",
          url: "humor",
          icon: "drama-masks",
          color: "#ffc6ff",
          image: "http://192.168.0.107:1357/images/subject_drama.png"
        },
        {
          id: 5,
          name: "Fantasy",
          url: "fantasy",
          icon: "sword",
          color: "#f25f4c",
          image: "http://192.168.0.107:1357/images/subject_fantasy.png"
        },
        {
          id: 6,
          name: "Self-Improvement",
          url: "self-help",
          icon: "tree",
          color: "#a0c4ff",
          image: "http://192.168.0.107:1357/images/subject_selfimprovement.png"
        }
      ]);
    });
};
