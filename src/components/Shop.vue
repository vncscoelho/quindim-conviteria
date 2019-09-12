<template>
  <div class="shop container-fluid">
    <div class="shop__wrapper row">
      <ShopSidebar
        class="col-12 col-lg-3"
        @changeCategory="$emit('changeCategory', $event)"
        :hideLinks="onHome"
        :currentCategory="currentCategory"
      />
      <div class="col-12 col-lg-9 row">
        <template v-for="product in products">
          <transition name="fade" appear :key="product.id">
            <div class="product col-6 col-lg-4" :key="product.id">
              <a :href="`/produto/${product.uid}/${url(product.name)}`" class="product__thumbnail">
                <g-image
                  v-if="product.gallery.length > 0"
                  :src="product.gallery[0]"
                  :alt="`${product.name}`"
                />
                <g-image
                  v-if="product.gallery.length > 1"
                  :src="product.gallery[1]"
                  :alt="`${product.name}`"
                  class="product__thumbnail--hover"
                />
              </a>
              <span
                class="product__collection"
              >{{!product.is_combo ? product.collection : "Combo com desconto"}}</span>
              <h3 class="product__name">
                <a :href="`/produto/${product.uid}/${url(product.name)}`">{{product.name}}</a>
              </h3>
            </div>
          </transition>
        </template>
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
    },
    onHome: {
      type: Boolean,
      default: false
    },
    currentCategory: {
      type: String,
      default: "Combos"
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
    url(value) {
      return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[" "]/g, "-")
        .toLowerCase();
    }
  }
};
</script>

<style lang="less">
.product {
  margin-bottom: 20px;

  &__thumbnail {
    margin-bottom: 8px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    max-height: 268px;
    display: flex;
    align-items: center;
    justify-content: center;

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

.shop {
  @media @sm {
    padding-bottom: 0;

    &__thumbnail {
      max-height: none;
    }

    &__wrapper {
      justify-content: center;
    }

    .shop-sidebar {
      background: @lightyellow;
      order: 3;
      padding: 40px;
      margin: 0;
    }
  }
}
</style>

