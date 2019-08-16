<template>
  <header class="header">
    <img src="../assets/img/logo.svg" alt="Quindim Conviteria" class="header__logo" fill="red">
    <nav class="header__menu">
      <a href="#">Catálogo</a>
      <a href="#">Sobre nós</a>
      <a href="#">Como funciona</a>
      <a href="#">Contato</a>
    </nav>
    <ShopCart @close="toggleCart"/>
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

