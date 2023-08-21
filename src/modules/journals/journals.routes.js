export const routes = [
  {
    path: 'journals',
    component: () =>
      import(/* webpackChunkName: "journals" */ './JournalsModule.vue'),
    children: [
      {
        path: 'issues',
        component: () =>
          import(/* webpackChunkName: "journals" */ './views/JournalsPage.vue'),
      },
    ],
  },
]
