export const deleteText = ({ author, conversationId, data, origin }) => {
  const { index, text, length } = data;

  return {
    author,
    conversationId,
    data: {
      index,
      text,
      type: 'delete',
      length,
    },
    origin,
  };
};

export const insertText = ({ author, conversationId, data, origin }) => {
  const { index, text } = data;

  return {
    author,
    conversationId,
    data: {
      index,
      text,
      type: 'insert',
    },
    origin,
  };
};
