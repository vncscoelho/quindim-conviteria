<template>
  <Layout v-if="$page.categories">
    <SiteHeader internal/>
    <section class="internal__header">
      <span>{{$page.categories.type}}</span>
      <h2>{{$page.categories.name}}</h2>
    </section>
    <Shop :products="products" :currentCategory="$page.categories.name"/>
    <Pagination
      :pageInfo="$page.allProducts.pageInfo"
      :url="`categoria/${url($page.categories.name)}`"
    />
  </Layout>
</template>

<script>
import Pagination from "../components/Pagination";
import SiteHeader from "../components/SiteHeader";
import Shop from "../components/Shop";
import UrlFilter from "../mixins/UrlFilter";

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
    if (this.$page.categories) {
      const { type, name } = this.$page.categories

      return {
        title: `${type} ${name}`
      };
    }
    
    return {}
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
query Categories($page: Int, $id: ID!, $name: String!) {
  categories(id: $id) {
      id
      name
      type
  }

  allProducts(perPage: 15, page: $page, sort: [{by: "order", order: DESC}, {by: "name", order: DESC}], filter: { category: { eq: $name }}) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
          node{
              order
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
