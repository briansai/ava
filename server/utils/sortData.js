const compareOrigin = (originA, originB) => {
  const aOrigin = Object.entries(originA);
  const bOrigin = Object.entries(originB);

  for (let x = 0; x < aOrigin.length; x++) {
    if (aOrigin[x][1] !== bOrigin[x][1]) {
      return aOrigin[x][1] - bOrigin[x][1];
    }
  }
};

const sortData = (result) => {
  return result.rows
    .sort((a, b) => {
      const { conversationId: aConvoId, origin: originA } = a.conversation;
      const { conversationId: bConvoId, origin: originB } = b.conversation;

      return aConvoId - bConvoId || compareOrigin(originA, originB);
    })
    .reduce((acc, cur) => {
      const { id, conversation } = cur;
      acc.push({ id, conversation });
      return acc;
    }, []);
};

module.exports = sortData;
