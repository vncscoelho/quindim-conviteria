<template>
  <Layout>
    <SiteHeader internal/>
    <section class="internal__header">
      <span>Coleções</span>
      <h2>{{$page.collections.name}}</h2>
    </section>
    <Shop :products="products" :currentCategory="$page.collections.name"/>
    <Pagination
      :pageInfo="$page.allProducts.pageInfo"
      :url="`colecoes/${url($page.collections.name)}`"
    />
  </Layout>
</template>

<script>
import Pagination from "../components/Pagination";
import SiteHeader from "../components/SiteHeader";
import UrlFilter from "../mixins/UrlFilter";
import Shop from "../components/Shop";

export default {
  mixins: [UrlFilter],
  components: {
    Pagination,
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
  },
  metaInfo() {
    return {
      title: `Coleção ${this.$page.collections.name}`
    };
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
</style>



<page-query>
query Collections($page: Int, $id: String!, $name: String!) {
  collections(id: $id) {
      id
      name
  }

  allProducts(perPage: 15, page: $page, filter: { collection: { eq: $name }}) @paginate {
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
              base_value
              is_combo
          }
      }
  }
}
</page-query>
