<template>
  <nav class="shop-sidebar">
    <section class="shop-sidebar__list" v-for="type in Object.keys(categories)" :key="type">
      <h3 class="shop-sidebar__title">{{type}}</h3>
      <ul class="shop-sidebar__categories">
        <li v-for="category in categories[type]" :key="category.id">
          <a
            href="#"
            @click.prevent="$emit('changeCategory', category.name)"
            :to="`${type}/${category.name}` | url"
          >{{category.name}}</a>
          <!-- <router-link :to="`${type}/${category.name}` | url">{{category.name}}</router-link> -->
        </li>
      </ul>
    </section>
  </nav>
</template>

<static-query>
query Categories {
  categories: allCategories(sort: [{by: "type", order: ASC}, {by: "id", order: DESC}]) {
    edges {
        node {
            id
            name
            type
        }
    }
  }
}
</static-query>

<script>
export default {
  computed: {
    categories() {
      return this.$static.categories.edges.reduce((acc, cur) => {
        if (!acc[cur.node.type]) acc[cur.node.type] = [];
        acc[cur.node.type].push(cur.node);

        return acc;
      }, []);
    }
  },
  filters: {
    url(value) {
      return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(" ", "-")
        .toLowerCase();
    }
  }
};
</script>

<style lang="less" scoped>
.shop-sidebar {
  display: flex;
  flex-flow: column;
  align-items: center;

  &__title {
    font-family: @textfont;
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: @darkpink;
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
    }
  }
}
</style>

