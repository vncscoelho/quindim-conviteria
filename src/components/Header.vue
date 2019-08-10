<template>
  <header class="header">
    <img src="../assets/img/logo.svg" alt="Quindim Conviteria" class="header__logo" fill="red">
    <nav class="header__menu">
      <a href="#">Catálogo</a>
      <a href="#">Sobre nós</a>
      <a href="#">Como funciona</a>
      <a href="#">Contato</a>
    </nav>
    <aside class="header__cart">
      Carrinho
      <span class="cart-counter">0</span>
    </aside>
  </header>
</template>

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

  &__cart {
    flex-basis: 200px;
    text-align: right;
    color: @darkpink;

    .cart-counter {
      vertical-align: middle;
      text-align: center;
      line-height: 35px;
      border-radius: 99px;
      width: 35px;
      height: 35px;
      background-color: @darkpink;
      color: #fff;
      display: inline-block;
    }
  }
}
</style>

