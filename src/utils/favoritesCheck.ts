// const normalize = (str?: number) => (str ?? "").trim().toLowerCase();

export const isSameLocation = (
  a?: { lat?: number; lon?: number },
  b?: { lat?: number; lon?: number }
) => {
  if (!a || !b) return false;
  return (
    a.lat === b.lat &&
    a.lon === b.lon
  );
};
