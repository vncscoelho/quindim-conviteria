<template>
  <Layout>
    <SiteHeader class="internal"/>
    {{$page}}
  </Layout>
</template>

<script>
import SiteHeader from "../components/SiteHeader";

export default {
  components: {
    SiteHeader
  }
};
</script>


<page-query>
query Categories($id: String!, $name: String!) {
  categories(id: $id) {
      id
      name
      type
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
