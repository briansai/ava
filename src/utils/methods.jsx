// export const methods = {
//   delete: ({ author, conversationId, data, origin }) => {
//     const { index, text, length } = data;

//     return {
//       author,
//       conversationId,
//       data: {
//         index,
//         text,
//         type: 'delete',
//         length,
//       },
//       origin: {
//         alice: origin,
//         bob: 0,
//       },
//     };
//   },
//   insert: ({ author, conversationId, data, origin }) => {
//     const { index, text } = data;

//     return {
//       author,
//       conversationId,
//       data: {
//         index,
//         text,
//         type: 'insert',
//       },
//       origin: {
//         alice: origin,
//         bob: 0,
//       },
//     };
//   },
// };

export const deleteText = ({ author, conversationId, data, origin }) => {
  const { index, text, length } = data;
  console.log(text);
  return {
    author,
    conversationId,
    data: {
      index,
      text,
      type: 'delete',
      length,
    },
    origin: {
      alice: origin,
      bob: 0,
    },
  };
};

export const insertText = ({ author, conversationId, data, origin }) => {
  const { index, text } = data;
  console.log(text);
  return {
    author,
    conversationId,
    data: {
      index,
      text,
      type: 'insert',
    },
    origin: {
      alice: origin,
      bob: 0,
    },
  };
};
