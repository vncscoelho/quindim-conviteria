<template>
  <div>{{$page}}</div>
</template>

<page-query>
query Categories($id: String!, $name: String!) {
  categories(id: $id) {
      id
      name
  }

  allProducts(filter: { category: { eq: $name }}) {
      edges {
          node{
              name
          }
      }
  }
}
</page-query>
