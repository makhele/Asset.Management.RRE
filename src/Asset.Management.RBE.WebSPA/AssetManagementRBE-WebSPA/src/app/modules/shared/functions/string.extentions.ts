declare global {
  interface String {
  toTitleCase(): string;
  trimAndRemoveExtraSpaces(): string;
  capitalize(): string;
  }
}

String.prototype.toTitleCase = function(): string {
  return this.replace(
    /\b\w+/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

String.prototype.trimAndRemoveExtraSpaces = function(): string {
  return this.replace(/\s+/g, ' ').trim();
};


String.prototype.capitalize = function(): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
