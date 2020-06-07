<template>
  <Layout class="product-internal">
    <SiteHeader internal/>
    <section class="product-internal__wrapper container-fluid">
      <div class="row">
        <ShopSidebar class="col-lg-2 col-sm-12 col-12" currentCategory="null"/>
        <div class="col-lg-10 col-sm-12 col-12 row" v-if="product">
          <div class="product-internal__gallery col-lg-7 col-12">
            <ClientOnly>
              <carousel
                :perPage="1"
                paginationColor="#ebbda8"
                paginationActiveColor="#fcf8fa"
                :paginationPadding="0"
              >
                <slide v-for="(image, index) in gallery" :key="index">
                  <g-image :src="image" :alt="`${product.name} - ${product.category}`"/>
                </slide>
              </carousel>
            </ClientOnly>
          </div>
          <div class="product-internal__info col-lg-5 col-12">
            <h2 class="product-internal__name">{{product.name}}</h2>
            <span class="product-internal__collection">{{product.collection}}</span>

            <p class="product-internal__price">
              <template v-if="!product.is_combo">
                <span class="product-internal__price-currency">R$</span>
                <span class="product-internal__price-value">{{checkout.finalPrice | money(true)}}</span>
              </template>
              <template v-else>
                <span class="product-internal__price-combo">Desconto de 10% no total</span>
              </template>
            </p>

            <div class="product-internal__configuration">
              <div
                class="input-group"
                v-for="(configurable, index) in product.configurables"
                :key="index"
              >
                <label
                  class="product-internal__configuration-title"
                >{{configurable.configurable_name}}</label>
                <select v-model="checkout.configurables[configurable.configurable_name]">
                  <option
                    v-for="(option, index) in configurable.configurable_list"
                    :key="index"
                    :value="option"
                  >{{option.configurable_list_option}} {{option.price | money}}</option>
                </select>
              </div>

              <div class="input-group" v-if="checkout.configurables.base_paper_type">
                <label class="product-internal__configuration-title">Papel (interior)</label>
                <select v-model="checkout.configurables.base_paper_type">
                  <option
                    v-for="(paper_type, index) in product.base_paper_type"
                    :key="index"
                    :value="paper_type"
                  >{{paper_type.base_paper_type_option}} {{paper_type.price | money}}</option>
                </select>
              </div>

              <div class="input-group" v-if="checkout.configurables.envelope_paper_type">
                <label class="product-internal__configuration-title">Papel (envelope)</label>
                <select v-model="checkout.configurables.envelope_paper_type">
                  <option
                    v-for="(paper_type, index) in product.envelope_paper_type"
                    :key="index"
                    :value="paper_type"
                  >{{paper_type.envelope_paper_type_option}} {{paper_type.price | money}}</option>
                </select>
              </div>

              <div class="input-group">
                <label class="product-internal__configuration-title">Adicionais</label>
                <template v-for="(extra, index) in product.extras">
                  <label :key="index">
                    <input type="checkbox" :value="extra" v-model="checkout.configurables.extras">
                    {{extra.extra_option}} {{extra.price | money}}
                  </label>
                </template>
              </div>
              <button
                class="product-internal__add-to-cart button button-primary"
                @click="addToCart"
              >Adicionar ao carrinho</button>
              <p class="product-internal__description">
                <strong>Descrição do produto:</strong>
                <span
                  v-html="product.description.length > 0 ? product.description : product.content"
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Product($id: ID!) {
  products(id: $id) {
      id
      uid
      name
      category
      collection
      base_value
      discount
      is_combo
      content
      description
      base_paper_type {
        base_paper_type_option
        value
        is_free
      }
      envelope_paper_type {
        envelope_paper_type_option
        value
        is_free
      }
      configurables {
        configurable_name
        configurable_list {
          configurable_list_option
          value
          is_free
        }
      }
      extras {
        extra_option
      }
      gallery
  }
}
</page-query>

<static-query>
query Extras {
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
import Layout from "~/layouts/Default.vue";
import SiteHeader from "~/components/SiteHeader.vue";
import ShopSidebar from "~/components/ShopSidebar.vue";

export default {
  components: {
    Layout,
    SiteHeader,
    ShopSidebar,
    Carousel: () =>
      import("vue-carousel")
        .then(m => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel")
        .then(m => m.Slide)
        .catch()
  },
  data() {
    return {
      product: [],
      checkout: []
    };
  },
  computed: {
    mainPhoto() {
      return this.$page.products.gallery[0];
    },
    gallery() {
      return this.$page.products.gallery;
    },
    allExtras() {
      return [
        ...this.$static.extras.edges.map(extra => extra.node),
        ...this.$static.paper_types.edges.map(paper_type => paper_type.node)
      ];
    }
  },
  methods: {
    attachPrices(targets) {
      return targets.map(item => {
        item.name = "";
        item.data.forEach(option => {
          const currentExtra = this.allExtras.find(
            extra => extra.name === option[item.key]
          );
          if (option.is_free) {
            option.price = 0;
          } else if (option.value > 0 || option.value < 0) {
            option.price = parseFloat(option.value);
          } else {
            option.price = parseFloat(currentExtra.value);
          }
        });
      });
    },
    addToCart() {
      this.$root.$emit("addToCart", JSON.parse(JSON.stringify(this.checkout)));
    }
  },
  watch: {
    "checkout.configurables": {
      handler: function(value) {
        const { extras, ...selects } = value,
          extrasValue = extras.reduce((acc, cur) => {
            acc = acc + cur.price;
            return acc;
          }, 0),
          selectsValue = Object.keys(selects).reduce((acc, cur) => {
            if (selects[cur]) {
              acc = acc + selects[cur].price;
            }
            return acc;
          }, 0),
          checkout = this.checkout;

        checkout.finalPrice = checkout.value + extrasValue + selectsValue;
      },
      deep: true
    }
  },
  created() {
    this.product = this.$page.products;

    this.checkout = {
      uid: this.product.uid,
      name: this.product.name,
      category: this.product.category,
      value: this.product.base_value,
      finalPrice: this.product.base_value,
      discount: this.product.discount,
      quantity: 1,
      configurables: {
        base_paper_type: this.product.base_paper_type[0],
        envelope_paper_type: this.product.envelope_paper_type[0],
        extras: [],
        ...this.product.configurables.reduce((acc, cur) => {
          Object.assign(acc, {
            [cur.configurable_name]: cur.configurable_list[0]
          });
          return acc;
        }, {})
      }
    };

    this.attachPrices([
      { data: this.product.base_paper_type, key: "base_paper_type_option" },
      {
        data: this.product.envelope_paper_type,
        key: "envelope_paper_type_option"
      },
      { data: this.product.extras, key: "extra_option" },
      ...this.product.configurables.map(item => ({
        data: item.configurable_list,
        key: "configurable_list_option"
      }))
    ]);
  },
  metaInfo() {
    return {
      title: `${this.product.name} - ${this.product.category}`
    };
  }
};
</script>

<style lang="less">
.col-lg-10 {
  @media (min-width: 992px) {
    flex: 0 0 77%;
    max-width: 77%;
  }
}

.col-lg-2 {
  @media (min-width: 992px) {
    flex: 0 0 22%;
    max-width: 22%;
  }
}

.col-lg-7 {
  @media (min-width: 992px) {
    flex: 0 0 53%;
    max-width: 53%;
  }
}

.col-lg-5 {
  @media (min-width: 992px) {
    flex: 0 0 47%;
    max-width: 47%;
  }
}

.product-internal {
  &__wrapper {
    background: @lightpink;
    padding-top: 40px;
    padding-bottom: 40px;

    .container {
      margin: 0 auto;
    }
  }

  &__gallery {
    img {
      max-width: 100%;
    }
  }

  &__add-to-cart {
    @media @sm {
      width: 100%;
      margin: 16px 0;
    }
  }

  &__name,
  &__price span {
    font-family: @headfont;
  }

  &__name {
    font-size: 2.8em;
    margin-bottom: 0;
  }

  &__collection {
    font-style: italic;
    color: @lightbrown;
    font-size: 0.9em;
  }

  &__configuration {
    font-size: 0.9em;
    &-title {
      font-weight: bold;
    }
  }

  &__price {
    &-value {
      font-size: 2em;
    }

    &-combo {
      font-size: 1.5em;
      color: @brown;
    }

    &-currency {
      font-size: 1em;
      padding-right: 4px;
    }
  }

  &__description {
    margin-top: 12px;
    margin-bottom: 40px;
    word-break: break-word;

    strong {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .VueCarousel-pagination {
    margin-top: 12px;

    .VueCarousel-dot {
      margin: 4px;
    }
    .VueCarousel-dot:focus {
      outline: none;
    }

    .VueCarousel-dot.VueCarousel-dot--active {
      border: #ebbda8 solid 8px;
      border-radius: 99px;
    }
  }

  .VueCarousel-wrapper {
    border-radius: 3px;
  }

  @media @sm {
    &__wrapper {
      padding-bottom: 0;
    }

    .row {
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

