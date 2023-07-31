export function toSnakeCaseString(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}
