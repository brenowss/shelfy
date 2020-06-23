export function getSubjectColor(givenSubject) {

  const subjects = ["romance", "suspense", "science_fiction", "drama", "self_improvement"]

  const treatedSubject = givenSubject.map(v => v.toLowerCase());

  const matchingSubject = subjects.filter((element) => treatedSubject.includes(element));
  switch (matchingSubject[0]) {
    case "romance":
      return "#e6394699";
      break;
    case "suspense":
      return "#bdb2ff99";
      break;
    case "science_fiction":
      return "#2fa74999";
      break;
    case "drama":
      return "#ffc6ff99";
      break;
    case "self_improvement":
      return "#a0c4ff99";
      break;
    default:
      return "#607D8B99";
      break;
  }
}

export function getMainSubject(givenSubject) {
  const subjects = ["romance", "suspense", "science_fiction", "drama", "self_improvement"]

  const treatedSubject = givenSubject.map(v => v.toLowerCase());

  const matchingSubject = subjects.filter((element) => treatedSubject.includes(element));
  return matchingSubject[0];
}