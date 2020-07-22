const subjects = [
  "romance",
  "suspense",
  "science_fiction",
  "humor",
  "self_improvement",
  "fiction",
  "murder"
];

export function getSubjectColor(givenSubject) {
  let newSubjects = "";

  if(givenSubject.includes(' / ')) {
    newSubjects = givenSubject.split(' / ');
  }

  const treatedSubject = newSubjects !== "" ? newSubjects.map((v) => v.toLowerCase()) : givenSubject.map((v) => v.toLowerCase()); 

  const matchingSubject = subjects.filter((element) =>
    treatedSubject.includes(element)
  );
  switch (matchingSubject[0]) {
    case "romance":
      return "#e6394699";
    case "suspense":
      return "#bdb2ff99";
    case "science_fiction":
      return "#2fa74999";
    case "fiction":
      return "#4366C099";
    case "murder":
      return "#e6394699";
    case "humor":
      return "#ffc6ff99";
    case "self_improvement":
      return "#a0c4ff99";
    default:
      return "#607D8B99";
  }
}

export function getMainSubject(givenSubject) {
  const treatedSubject = givenSubject.map((v) => v.toLowerCase());

  const matchingSubject = subjects.filter((element) =>
    treatedSubject.includes(element)
  );
  return matchingSubject[0];
}
