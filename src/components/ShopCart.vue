<template>
  <div class="cart">
    <form
      name="Pedido"
      class="form"
      ref="form"
      method="POST"
      data-netlify="true"
      netlify-honeypot="isSpam"
    >
      <input type="hidden" name="Nome" value="form['Nome']">
      <input type="hidden" name="Email" value="form['Email']">
      <input type="hidden" name="Telefone" value="form['Telefone']">
      <input type="hidden" name="Pedido" value="order">
      <input name="form-name" value="Pedido" type="hidden">
      <input type="text" name="isSpam" style="display:none" value="form['isSpam']">
    </form>
    <div class="cart__button" @click="toggleCart">
      <span class="cart__label">Carrinho</span>
      <span class="cart__counter">{{Object.keys(cart).length}}</span>
    </div>

    <transition name="fade" appear v-if="show">
      <div class="cart__overlay"></div>
    </transition>

    <transition name="cart">
      <aside class="cart__expanded col-12 col-sm-12 col-md-6" v-if="show">
        <template v-if="!submitting">
          <div class="cart__wrapper">
            <header class="cart__header">
              <h3>Carrinho</h3>
              <button @click.prevent="toggleCart">
                <span>x</span> Fechar
              </button>
            </header>
            <table class="cart__list" v-if="hasProducts">
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
                    <div>
                      <a
                        href="#"
                        @click.prevent="removeItem(product.uid)"
                        class="remove-item"
                      >Remover</a>
                    </div>
                  </td>
                  <td
                    class="cart__list-price"
                  >R$ {{(product.finalPrice * (product.quantity > 0 ? product.quantity : 1)) | money(true)}}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>Não há itens no carrinho.</p>
          </div>
          <a
            href="#"
            class="cart__submit"
            v-if="hasProducts"
            @click.prevent="submitting = true"
          >Finalizar pedido</a>
        </template>
        <template v-else>
          <div class="cart__wrapper submitting">
            <header class="cart__header">
              <h3>Insira seus dados</h3>
              <button @click.prevent="submitting = false">
                <span>&larr;</span> Voltar
              </button>
            </header>
            <p>Preencha seus dados de acordo e como deseja dar continuidade ao seu pedido: via Whatsapp ou E-mail. Escolha o que preferir!</p>
            <div class="form">
              <label>
                <span>Seu Nome</span>
                <input type="text" name="Nome" v-model="form['Nome']">
              </label>
              <label>
                <span>Seu e-mail</span>
                <input type="email" name="Email" v-model="form['Email']">
              </label>
              <label>
                <span>Seu telefone</span>
                <input type="tel" name="Telefone" v-model="form['Telefone']">
              </label>
              <div class="submit-type">
                <label>Desejo continuar o pedido via:</label>
                <label>
                  <input type="radio" name="submitType" v-model="submitType" :value="true"> E-mail
                </label>
                <label>
                  <input type="radio" name="submitType" v-model="submitType" :value="false"> Whatsapp
                </label>
              </div>
            </div>
          </div>
          <button class="cart__submit" @click.prevent="submitOrder">Enviar</button>
        </template>
      </aside>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      show: false,
      submitting: false,
      form: {
        Nome: "",
        Email: "",
        Telefone: "",
        Pedido: ""
      },
      submitType: true
    };
  },
  computed: {
    hasProducts() {
      return Object.keys(this.cart).length > 0;
    }
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
      if (process.isClient) {
        this.$delete(this.cart, uid);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    toggleCart() {
      this.show = !this.show;
    },
    formatPrice(value) {
      const formatedValue = parseFloat(value)
        .toFixed(2)
        .replace(".", ",");

      return formatedValue;
    },
    submitOrder() {
      const newline = this.submitType ? "\n" : "%0A";
      const order = Object.keys(this.cart).map((index, key) => {
        const item = this.cart[index];
        const configurables = Object.keys(item.configurables)
          .map(key => {
            const cfg = item.configurables[key];
            if (key !== "extras") {
              const title =
                key === "base_paper_type"
                  ? "Base"
                  : key === "envelope_paper_type"
                  ? "Envelope"
                  : key;
              const option =
                key === "base_paper_type"
                  ? "base_paper_type_option"
                  : key === "envelope_paper_type"
                  ? "envelope_paper_type_option"
                  : "configurable_list_option";
              return `* ${title}: ${cfg[option]} - R$ ${this.formatPrice(
                cfg.price
              )}`;
            }
          })
          .join(newline);
        const extras = item.configurables.extras
          .map(
            extra => `+ ${extra.extra_option}: ${this.formatPrice(extra.price)}`
          )
          .join(newline);
        return `${newline}${key + 1}. [${item.category}] ${
          item.name
        }${newline}${configurables}${newline}${extras}${newline}Qtd: ${
          item.quantity
        }${newline}Total: R$ ${this.formatPrice(
          item.finalPrice * (item.quantity > 0 ? item.quantity : 1)
        )}${newline}${newline}----------${newline}`;
      });
      this.form.Pedido = order;
      const formattedOrder = `Meu pedido:${newline}${order.join(newline)}`;
      if (this.submitType) return this.sendMail(formattedOrder);

      return window.open(
        "https://api.whatsapp.com/send?phone=5555981256350&text=" +
          formattedOrder
      );
    },
    sendMail() {
      const form = this.$refs.form;
      fetch("/", {
        method: "POST",
        body: this.encode({
          "form-name": "Pedido",
          ...this.form
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(({ status }) => {
        if (status === 200)
          this.$root.$emit("alert", {
            type: "success",
            message: "Mensagem enviada com sucesso."
          });
      });
    },
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    }
  },
  watch: {
    cart: {
      handler(value) {
        if (process.isClient)
          localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      deep: true
    }
  },
  mounted() {
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    this.$root.$on("addToCart", product => {
      this.$set(this.cart, product.uid, product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.$root.$emit("alert", {
        type: "success",
        message: "Adicionado ao carrinho."
      });
    });
  }
};
</script>

<style lang="less" scoped>
.cart {
  color: @darkbrown;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: fade(@brown, 50%);
    width: 100%;
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    button {
      color: @darkbrown;
      font-weight: bold;
      background: none;
      border: 0;

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
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }

    .input-quantity {
      width: 75px;
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
      font-size: 1.6em;
      padding: 8px 0;
      margin: 0;
      line-height: 1;
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
    text-align: center;
    color: @brown;
    font-size: 1.2em;
    font-weight: bold;
    transition: background 150ms linear;
    background: none;
    border: 0;

    &:hover {
      background: @lightpink;
      color: @darkbrown;
      text-decoration: none;
    }
  }

  &__button {
    flex-basis: 200px;
    text-align: right;
    color: @darkpink;
    cursor: pointer;

    .cart__label {
      padding-right: 4px;

      @media @sm {
        display: none;
      }
    }

    .cart__counter {
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

.submitting {
  background: @lightyellow;
  .submit-type {
    input {
      display: inline-block;
      width: auto;
    }
    label {
      margin-top: 8px;
    }
  }
}
</style>


