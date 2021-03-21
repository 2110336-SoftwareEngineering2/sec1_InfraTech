export function setAllFirstCapitalLetter(text = '') {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function setFirstCapitalLetter(text = '') {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
