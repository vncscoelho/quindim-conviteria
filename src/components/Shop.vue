<template>
  <div class="shop container_fluid">
    <div class="row col-12">
      <ShopSidebar class="col-12 col-sm-3" @changeCategory="$emit('changeCategory', $event)"/>
      <div class="col-12 col-sm-9 row">
        <div class="product col-4" v-for="product in products" :key="product.id">
          <a :href="`/produto/${product.uid}/${slug(product.name)}`" class="product__thumbnail">
            <img
              v-if="product.gallery.length > 0"
              :src="product.gallery[0]"
              :alt="`${product.name}`"
            >
            <img
              v-if="product.gallery.length > 1"
              :src="product.gallery[1]"
              :alt="`${product.name}`"
              class="product__thumbnail--hover"
            >
          </a>
          <span
            class="product__collection"
          >{{!product.is_combo ? product.collection : "Combo com desconto"}}</span>
          <h3 class="product__name">
            <a :href="`/produto/${product.uid}/${slug(product.name)}`">{{product.name}}</a>
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
.shop-sidebar {
  position: sticky;
  top: 24px;
}

.product {
  margin-bottom: 20px;

  &__thumbnail {
    margin-bottom: 8px;
    display: block;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    max-height: 268px;

    &:hover {
      .product__thumbnail--hover {
        opacity: 1;
      }
    }

    &--hover {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: 150ms ease-out opacity;
    }
  }

  &__name {
    font-size: 1.25em;
    a {
      color: @darkbrown;
    }
  }
  &__collection {
    font-family: @headfont;
    color: @lightbrown;
  }
  &__thumbnail {
    img {
      width: 100%;
    }
  }
}
</style>

