const normalize = (str?: string) => (str ?? "").trim().toLowerCase();

export const isSameLocation = (
  a?: { name?: string; country?: string },
  b?: { name?: string; country?: string }
) => {
  if (!a || !b) return false;
  return (
    normalize(a.name) === normalize(b.name) &&
    normalize(a.country) === normalize(b.country)
  );
};
