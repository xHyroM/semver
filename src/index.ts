export const equal = (sem1: string, sem2: string) => {
  return sem1 === sem2; // really simple lol
};

export const lessThan = (sem1: string, sem2: string) => {
  const parsed1 = parse(sem1);
  const parsed2 = parse(sem2);

  if (parsed1.major < parsed2.major) return true;
  else if (parsed1.major > parsed2.major) return false;

  if (parsed1.minor < parsed2.minor) return true;
  else if (parsed1.minor > parsed2.minor) return false;

  if (parsed1.patch < parsed2.patch) return true;
  else if (parsed1.patch > parsed2.patch) return false;

  return false;
};

export const greaterThan = (sem1: string, sem2: string) => {
  const parsed1 = parse(sem1);
  const parsed2 = parse(sem2);

  if (parsed1.major > parsed2.major) return true;
  else if (parsed1.major < parsed2.major) return false;

  if (parsed1.minor > parsed2.minor) return true;
  else if (parsed1.minor < parsed2.minor) return false;

  if (parsed1.patch > parsed2.patch) return true;
  else if (parsed1.patch < parsed2.patch) return false;

  return false;
};

export const lessThanOrEqual = (sem1: string, sem2: string) => {
  return lessThan(sem1, sem2) || equal(sem1, sem2);
};

export const greaterThanOrEqual = (sem1: string, sem2: string) => {
  return greaterThan(sem1, sem2) || equal(sem1, sem2);
};

export const parse = (version: string) => {
  /**
   * /^: The ^ symbol means "start of string". This tells the regular expression to start matching from the beginning of the input string.
   * (\d+): This is a capturing group that matches one or more digits (\d+). The parentheses around it create a capturing group that allows us to extract the matched digits later. This first capturing group corresponds to the major version number.
   * \.: This matches a period (.) character. We need to escape the period with a backslash (\) because it has a special meaning in regular expressions (it matches any character).
   * (\d+): This is another capturing group that matches one or more digits. This second capturing group corresponds to the minor version number.
   * \.: This matches another period character.
   * (\d+): This is a third capturing group that matches one or more digits. This third capturing group corresponds to the patch version number.
   * (?:-([\w-]+))?: This is a non-capturing group that matches an optional tag string. The (?: ) syntax creates a non-capturing group (meaning that we don't care about capturing the matched text), and the ? symbol makes the group optional. The - character matches a hyphen, and ([\w-]+) is a capturing group that matches one or more word characters (\w) or hyphens. This capturing group corresponds to the tag string.
   * (?:\+([\w-]+))?: This is another non-capturing group that matches an optional build metadata string. The + character matches a plus sign, and ([\w-]+) is a capturing group that matches one or more word characters or hyphens. This capturing group corresponds to the build metadata string.
   * $: The $ symbol means "end of string". This tells the regular expression to stop matching at the end of the input string.
   *
   * In summary, this regular expression matches a semantic version number string with an optional tag string and an optional build metadata string, and captures the major, minor, and patch version numbers (as well as the tag and metadata strings, if present) into separate capturing groups.
   */
  const regex = /^(\d+)\.(\d+)\.(\d+)(?:-([\w-]+))?(?:\+([\w-]+))?$/;
  const match = version.match(regex);

  if (!match) {
    throw new Error("Invalid input");
  }

  // rome-ignore lint/style/noNonNullAssertion: its fine
  const major = parseInt(match[1]!);
  // rome-ignore lint/style/noNonNullAssertion: its fine
  const minor = parseInt(match[2]!);
  // rome-ignore lint/style/noNonNullAssertion: its fine
  const patch = parseInt(match[3]!);
  const tag = match[4] || null;
  const metadata = match[5] || null;

  return { major, minor, patch, tag, metadata };
};
