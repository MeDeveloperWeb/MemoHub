export function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}

export function shuffleArray(array) {
  // stackoverflow.com/a/46545530
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
