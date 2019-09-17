<template>
  <div class="shop container-fluid">
    <div class="shop__wrapper">
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
                <transition-group name="fade" appear :key="product.id">
                  <g-image
                    v-if="product.gallery.length > 0"
                    :src="product.gallery[0]"
                    :alt="`${product.name}`"
                    :immediate="false"
                    :key="`mainImg-${product.id}`"
                  />
                </transition-group>
                <g-image
                  v-if="product.gallery.length > 1"
                  :src="product.gallery[1]"
                  :alt="`${product.name}`"
                  class="product__thumbnail--hover"
                  :key="`hoverImg-${product.id}`"
                />
              </a>
              <div class="product__info">
                <div class="product__title">
                  <span
                    class="product__collection"
                  >{{!product.is_combo ? product.collection : "Monte o kit com desconto"}}</span>
                  <h3 class="product__name">
                    <a :href="`/produto/${product.uid}/${url(product.name)}`">{{product.name}}</a>
                  </h3>
                </div>
                <p class="product__price">
                  <template v-if="!product.is_combo">
                    <span>R$</span>
                    {{product.base_value | money(true)}}
                  </template>
                  <template v-else>
                    <span class="discount">
                      10%
                      <br>desc.
                    </span>
                  </template>
                </p>
              </div>
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
import UrlFilter from "../mixins/UrlFilter";

export default {
  components: {
    ShopSidebar
  },
  mixins: [UrlFilter],
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
  }
};
</script>

<style lang="less">
.shop {
  background: @lightpink;
  padding: 40px 0 80px 0;
}

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
    min-width: 282px;
    min-height: 282px;
    background: @lightyellow;

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

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    color: @brown;
    font-size: 0.9em;
    margin: 0;
    white-space: nowrap;

    span {
      font-size: 0.75em;
    }

    .discount {
      text-align: center;
      display: inline-block;
      background: @darkpink;
      vertical-align: middle;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding-top: 15px;
      line-height: 1;
    }
  }

  &__name {
    font-size: 1em;
    font-weight: bold;
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
  &__wrapper {
    display: flex;
    width: 100%;
  }
  @media @sm {
    padding-bottom: 0;

    &__thumbnail {
      max-height: none;
    }

    &__wrapper {
      align-items: center;
      flex-direction: column;
    }

    .shop-sidebar {
      background: @lightyellow;
      order: 3;
      padding: 40px;
      margin: 0;
      max-width: 100%;
    }
  }
}
</style>

