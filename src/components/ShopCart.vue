<template>
  <div class="cart">
    <div class="cart__counter" @click="toggleCart">
      Carrinho
      <span class="cart-counter">{{Object.keys(cart).length}}</span>
    </div>

    <transition name="cart">
      <aside class="cart__expanded col-12 col-sm-12 col-md-6" v-if="show">
        <div class="cart__wrapper">
          <header class="cart__header">
            <h3>Carrinho</h3>
            <a href="#" @click.prevent="toggleCart">
              <span>x</span> Fechar
            </a>
          </header>
          <table class="cart__list" v-if="cart.length > 0">
            <thead>
              <tr>
                <th class="cart__list-model">Modelo</th>
                <th class="cart__list-quantity">Quantidade</th>
                <th class="cart__list-price">Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, key) in cart" :key="key" class="cart__list-item">
                <td>
                  <p class="cart__list-item-title">{{product.name}}</p>
                  <p>
                    <span
                      class="cart__list-description"
                      v-for="(cfg, index) in product.configurables"
                      :key="index"
                      v-html="cfgFormmater(cfg, index)"
                    />
                  </p>
                </td>
                <td class="cart__list-quantity">
                  <input type="number" v-model="product.quantity" class="input-quantity" min="1">
                  <a href="#" @click.prevent="removeItem(product.uid)" class="remove-item">Remover</a>
                </td>
                <td
                  class="cart__list-price"
                >R$ {{(product.finalPrice * (product.quantity > 0 ? product.quantity : 1)) | money(true)}}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>Não há itens no carrinho.</p>
        </div>
        <div class="cart__submit" v-if="cart.length > 0">
          <p
            class="cart__submit-text"
          >Digite seu e-mail ou telefone e escolha como deseja continuar com o seu pedido.</p>
          <div class="input-group">
            <input type="text" placeholder="E-mail ou telefone">
          </div>
          <div class="cart__submit-buttons">
            <button class="button">Whatsapp</button>
            <button class="button">E-mail</button>
          </div>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      show: false
    };
  },
  methods: {
    cfgFormmater(value, key) {
      if (key === "base_paper_type")
        return `<strong>Base</strong>: ${value["base_paper_type_option"]}`;
      else if (key === "envelope_paper_type")
        return `<strong>Envelope</strong>: ${
          value["envelope_paper_type_option"]
        }`;
      else if (key !== "extras")
        return `<strong>${key}</strong>: ${value.configurable_list_option}`;
      else if (value.length > 0)
        return `<strong>Extras</strong>: ${value
          .map(extra => extra.extra_option)
          .join("<br>")}`;
    },
    removeItem(uid) {
      this.$delete(this.cart, uid);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    toggleCart() {
      this.show = !this.show;
    }
  },
  watch: {
    cart: {
      handler(value) {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      deep: true
    }
  },
  created() {
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    console.warn(JSON.parse(localStorage.getItem("cart")));
    this.$root.$on("addToCart", product => {
      this.$set(this.cart, product.uid, product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    });
  }
};
</script>

<style lang="less" scoped>
.cart {
  color: @darkbrown;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    a {
      color: @darkbrown;
      font-weight: bold;

      span {
        background: @darkpink;
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 99px;
      }
    }
  }

  &__expanded {
    padding: 0;
    position: fixed;
    right: 0;
    top: 0;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
    z-index: 5;
    height: 100%;
    background: @darkpink;
    display: flex;
    flex-direction: column;
  }

  &__wrapper {
    padding: 40px;
    overflow-y: auto;
    background: @pink;
    flex: 1;
  }

  &__list {
    width: 100%;

    thead th {
      font-size: 0.9em;
      color: @lightbrown;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    tbody td {
      padding-top: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    .input-quantity {
      width: 75px;
      display: block;
    }

    &-model {
      width: 60%;
    }

    &-quantity,
    &-price {
      width: 20%;
      text-align: right;
    }

    &-description {
      font-size: 0.75em;
      display: block;
    }

    &-item-title {
      font-family: @headfont;
      font-size: 2em;
      font-weight: normal;
      margin-bottom: 8px;
    }

    .remove-item {
      display: inline-block;
      margin-top: 8px;
      margin-right: 10px;
      color: @darkbrown;
      font-weight: bold;
      font-size: 0.75em;
      border-bottom: 2px solid @brown;

      &:hover {
        text-decoration: none;
      }
    }
  }

  &__submit {
    padding: 40px;

    input {
      width: 100%;
      border-color: @lightbrown;
    }

    &-buttons {
      display: flex;
      width: 100%;

      .button {
        width: 100%;
        margin-right: 8px;
        background: @lightpink;

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }

  &__counter {
    flex-basis: 200px;
    text-align: right;
    color: @darkpink;
    cursor: pointer;

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

.cart-enter-active {
  transition: all 0.3s ease;
}
.cart-leave-active {
  transition: all 0.3s ease;
}

.cart-enter,
.cart-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}
</style>


