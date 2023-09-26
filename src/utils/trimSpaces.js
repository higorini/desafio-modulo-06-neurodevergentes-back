const trimFields = (fields) => {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.trim()];
      }
      return [key, value];
    })
  );
};

module.exports = trimFields;
