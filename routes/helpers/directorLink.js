const directorLink = directorName => {
  const lowerCase = directorName.toLowerCase();
  const whiteSpace = lowerCase.trim();
  return whiteSpace.replace(/\s+/g, '-');
};

module.exports = directorLink;
