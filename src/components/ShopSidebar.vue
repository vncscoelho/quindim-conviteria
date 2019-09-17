<template>
  <nav class="shop-sidebar">
    <div class="shop-sidebar__wrapper">
      <section
        class="shop-sidebar__list col-6 col-sm-12"
        v-for="type in Object.keys(categories)"
        :key="type"
      >
        <h3 class="shop-sidebar__title">{{type}}</h3>
        <ul class="shop-sidebar__categories">
          <li
            :class="{'active': category.name === currentCategory}"
            v-for="category in categories[type]"
            :key="category.id"
          >
            <router-link
              class="category-link"
              :to="url(`/categoria/${category.name}`)"
              v-if="!hideLinks"
            >{{category.name}}</router-link>
            <ul class="shop-sidebar__collections">
              <li
                class="collection-link"
                v-for="collection in categoryCollections(category.name)"
                :key="collection"
              >
                <router-link :to="url(`/colecoes/${collection}`)">{{collection}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </nav>
</template>

<static-query>
query Categories {
  categories: allCategories(sort: [{by: "order", order: DESC}, {by: "id", order: DESC}, {by: "type", order: ASC}]) {
    edges {
        node {
            id
            name
            type
        }
    }
  }

  productCollections: allProducts {
    edges {
      node {
        collection
        category
      }
    }
  }
  
}
</static-query>

<script>
import UrlFilter from "../mixins/UrlFilter";
export default {
  mixins: [UrlFilter],
  props: {
    hideLinks: {
      type: Boolean,
      default: false
    },
    currentCategory: {
      type: String,
      default: "Combos"
    }
  },
  computed: {
    categories() {
      return this.$static.categories.edges.reduce((acc, cur) => {
        if (!acc[cur.node.type]) acc[cur.node.type] = [];
        acc[cur.node.type].push(cur.node);

        return acc;
      }, []);
    },
    collections() {
      return this.$static.productCollections.edges.reduce(
        (acc, item) => {
          item = item.node;
          if (!acc[item.category].includes(item.collection)) {
            acc[item.category].push(item.collection);
          }
          return acc;
        },
        this.$static.categories.edges.reduce((acc, cur) => {
          acc[cur.node.name] = [];
          return acc;
        }, {})
      );
    }
  },
  methods: {
    categoryCollections(category) {
      return this.collections[category].filter(collection => collection !== "");
    }
  }
};
</script>

<style lang="less" scoped>
.shop-sidebar {
  display: flex;
  flex-flow: column;
  align-items: center;

  &__wrapper {
    @media @sm {
      flex-wrap: wrap;
      display: flex;
      width: 100%;
    }
  }

  &__title {
    font-family: @textfont;
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: @darkpink;
  }

  &__button {
    border: 0;
    background: none;
    padding: 0;
    color: @brown;
  }

  &__categories {
    list-style: none;
    padding: 0;
    font-size: 1.35em;

    li {
      font-family: @headfont;
      a {
        color: @brown;
      }

      &.active .category-link {
        font-weight: 800;
        font-size: 1.2em;
        color: @darkbrown;
      }
    }
  }

  &__collections {
    list-style: none;
    padding-left: 8px;
    line-height: 1.2;
    a {
      font-size: 0.6em;
      font-family: @textfont;
    }
  }

  @media @sm {
    align-items: flex-start;
    flex-flow: row;
    justify-content: space-around;
    margin-bottom: 20px;
  }
}
</style>

