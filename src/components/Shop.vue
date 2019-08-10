<template>
  <div class="shop container_fluid">
    <div class="row">
      <ShopSidebar class="col-12 col-sm-3"/>
      <div class="col-12 col-sm-9 row">
        <div class="product col-4" v-for="product in products" :key="product.id">
          <a :href="`/produto/${product.uid}/${slug(product.name)}`" class="product__thumbnail">
            <img
              v-if="product.gallery.length > 0"
              src="https://res.cloudinary.com/dkaanqsro/image/upload/v1565018993/Casamentos/Modelo-Circular-2_ct8vd1.jpg"
              :alt="`${product.name}`"
            >
          </a>
          <span class="product__collection">{{product.collection}}</span>
          <h3 class="product__name">
            <a href="#">{{product.name}}</a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query ProductConfigurations {
  extras: allExtras {
    edges {
      node {
        id
        name
        value
      }
    }
  }

  paper_types: allPaperTypes {
    edges {
      node {
        id
        name
        value
      }
    }
  }
}
</static-query>

<script>
import ShopSidebar from "../components/ShopSidebar";

export default {
  components: {
    ShopSidebar
  },
  props: {
    products: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    extras() {
      return this.$static.extras.edges;
    },
    paperTypes() {
      return this.$static.paper_types.edges;
    }
  },
  methods: {
    slug(value) {
      return value.toLowerCase().replace(" ", "-");
    }
  }
};
</script>

<style lang="less">
.product {
  &__thumbnail {
    img {
      width: 100%;
    }
  }
}
</style>

