<template>
  <Layout>
    <SiteHeader class="internal"/>
    <section class="internal__header">
      <span>{{$page.categories.type}}</span>
      <h2>{{$page.categories.name}}</h2>
      <hr>
    </section>
    <Shop :products="products"/>
  </Layout>
</template>

<script>
import SiteHeader from "../components/SiteHeader";
import Shop from "../components/Shop";

export default {
  components: {
    SiteHeader,
    Shop
  },
  data() {
    return {
      currentProducts: []
    };
  },
  computed: {
    products() {
      return this.$page.allProducts.edges.map(product => product.node);
    }
  }
};
</script>

<style lang="less" scoped>
.internal__header {
  background: @lightpink;
  color: @darkpink;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 40px 0 0 0;

  h2 {
    font-family: @headfont;
    font-size: 3em;
    color: @brown;
  }
}

.shop {
  padding-top: 20px;
}
</style>



<page-query>
query Categories($page: Int, $id: String!, $name: String!) {
  categories(id: $id) {
      id
      name
      type
  }

  allProducts(perPage: 15, page: $page filter: { category: { eq: $name }}) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
          node{
              id
              uid
              name
              gallery
              collection
              category
          }
      }
  }
}
</page-query>
