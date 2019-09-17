<template>
  <aside class="pagination" v-if="pageInfo.totalPages > 1">
    <div class="pagination__wrapper">
      <a
        :href="'/' + ((pageInfo.currentPage - 1) !== 1 ? `${url}/${pageInfo.currentPage - 1}` : `${url}`)"
        :class="['pagination__link shorthand', {'visible': pageInfo.totalPages <= pageInfo.currentPage}]"
      >Anterior</a>
      <a
        :href="'/' + (page > 1 ? `${url}/${page}` : `${url}`)"
        :class="['pagination__link bullet', {'active' : page === pageInfo.currentPage}]"
        v-for="page in pageInfo.totalPages"
        :key="page"
      >{{page}}</a>
      <a
        :href="'/' + `${url}/${pageInfo.currentPage + 1}`"
        :class="['pagination__link shorthand', {'visible': pageInfo.totalPages > pageInfo.currentPage}]"
      >Próxima</a>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="less">
.pagination {
  background: @lightpink;
  padding-bottom: 40px;
  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
  }

  &__link {
    padding: 0 8px;
    color: @darkbrown;

    &.bullet {
      text-align: center;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      margin: 0 4px;
      transition: background-color 150ms linear;

      &:hover {
        background-color: @pink;
        text-decoration: none;
        color: @darkbrown;
      }

      &.active {
        background-color: @darkpink;
        font-weight: bold;
      }
    }

    &.shorthand {
      transition: color 150ms linear;
      visibility: hidden;
      .visible {
        visibility: visible;
      }
      &:hover {
        color: @darkpink;
      }
    }
  }
}
</style>
