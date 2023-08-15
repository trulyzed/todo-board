export const initialData = {
  boards: {
    create: [
      {
        title: 'Board 1',
        categories: {
          create: [
            {title: "To Do", order: 0},
            {title: "Doing", order: 1},
            {title: "Done", order: 2},
          ]
        }
      }
    ],
  },
}

export const initialDataModels = Object.keys(initialData).reduce((a, c) => {
  a[c] = true
  return a
}, {} as any)