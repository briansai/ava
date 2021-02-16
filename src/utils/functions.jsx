export const getPosition = (string, subString, index) =>
  string.split(subString, index).join(subString).length;

export const reverseHistory = (editInfo) =>
  editInfo.lastMutation.reduce((acc, cur) => {
    acc.unshift(cur);
    return acc;
  }, []);
