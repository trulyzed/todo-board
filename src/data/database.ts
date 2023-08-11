export const initialData = {
  boards: {
    create: [
      {
        title: 'Board 1',
        categories: {
          create: [
            {title: "To Do"},
            {title: "Doing"},
            {title: "Done"},
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