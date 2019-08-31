<template>
  <header class="header">
    <a href="/">
      <img src="../assets/img/logo.svg" alt="Quindim Conviteria" class="header__logo" fill="red">
    </a>
    <nav class="header__menu">
      <a href="/categoria/casamentos">Catálogo</a>
      <a href="/sobre-nos">Sobre nós</a>
      <a href="/como-funciona">Como funciona</a>
      <a href="/contato">Contato</a>
    </nav>
    <ShopCart/>
  </header>
</template>

<script>
import ShopCart from "./ShopCart";

export default {
  components: {
    ShopCart
  }
};
</script>


<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  font-family: "Poppins";

  &.internal {
    padding: 4vh 8vw;

    .header__menu a {
      color: @darkbrown;
    }
  }

  &__menu {
    text-align: center;
    flex: 1;

    a {
      color: @lightpink;
      margin-right: 32px;

      &:last-of-type {
        margin: 0;
      }
    }
  }
}
</style>

