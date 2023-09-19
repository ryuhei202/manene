function toCamelCase(str: string) {
  return str
    .split("_")
    .map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

export function toCamelCaseObject(obj: Record<string, unknown>): object {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCaseObject(item));
  } else if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    Object.keys(obj).forEach((key) => {
      result[toCamelCase(key)] = toCamelCaseObject(obj[key] as keyof object);
    });
    return result;
  }
  return obj;
}
