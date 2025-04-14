const displayDescription = (text: string, maxLength = 100) => {
  const lines = text.split("\n");
  const newLines = lines.map((line) => {
    if (line.length > maxLength) {
      return `${line.slice(0, maxLength)}...`;
    }
    return line;
  });
  return newLines.join("\n");
};

export default displayDescription;
