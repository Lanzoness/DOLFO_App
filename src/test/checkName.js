export function checkName(name) {
  // If name is undefined, return an empty string
  if (!name) {
    return '';
  }
  // Set the max length to 20
  const maxLength = 20;
  const ellipsis = '...';
  // If the name is longer than the maximum length, truncate it and add ellipsis
  if (name.length > maxLength) {
    return name.slice(0, maxLength - ellipsis.length) + ellipsis;
  }
  // If the name is within the maximum length, return it as is
  return name;
}
