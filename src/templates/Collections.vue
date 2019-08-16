<template>
  <div>{{$page}}</div>
</template>

<page-query>
query Collections($id: String!, $name: String!) {
  collections(id: $id) {
      id
      name
  }

  allProducts(filter: { collection: { eq: $name }}) {
      edges {
          node{
              name
          }
      }
  }
}
</page-query>
