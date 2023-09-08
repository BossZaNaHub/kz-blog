export const toCamelCase = (input: string): string => {
    return input
      .replace(/[-_]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^[A-Z]/, (match) => match.toLowerCase());
  }