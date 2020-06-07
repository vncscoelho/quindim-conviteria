// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(({ addContentType }) => {
      // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  })

  api.createPages(({ createPage }) => {
    createPage({
      path: "/papelariainfantil",
      component: "./src/templates/Categories.vue",
      queryVariables: {
          id: "a3d4e877875654e1bbec815b503813f0",
          name: "Infantil",
          type: "Papelaria",
      },
    })
  })
}
