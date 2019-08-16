<template>
  <Layout>
    <section class="banner">
      <div class="banner__bg">
        <g-image :src="banner_img"/>
      </div>
      <!-- Header -->
      <div class="banner__content">
        <SiteHeader/>
        <div class="banner__cta">
          <h1 class="banner__cta-text">
            Nós somos uma conviteria especializada
            <br>em convites e papelaria criativa para
            <br>casamentos, formaturas e festas.
          </h1>
          <a href class="button button-primary">Veja como funciona</a>
        </div>
      </div>
    </section>

    <section class="policy section">
      <g-image class="policy__bg" src="~/assets/img/policy_bg.png"/>
      <g-image class="policy__bg right" src="~/assets/img/policy_bg.png"/>
      <div class="container">
        <span class="section-title">COMO FUNCIONA</span>
        <h2 class="section-heading">
          Entendemos que este é um dia muito
          <br>importante em sua vida.
        </h2>
        <p class="section-text">
          Então queremos te conhecer e criar uma experiência personalizada
          <br>que complemente você e sua história.
        </p>
        <ul class="section-list">
          <li class="col-xs-12 col-md-6">
            <span class="icon"></span>
            <p>
              Escolha os itens que desejar, podendo customizar seu modelo, tamanho, tipos de papéis e
              laços.
            </p>
          </li>
          <li class="col-xs-12 col-md-6">
            <span class="icon two"></span>
            <p>A arte exposta aqui é apenas para mostruário, desenvolveremos uma arte personalizada para seu convite. Saiba mais aqui.</p>
          </li>
          <li class="col-xs-12 col-md-6">
            <span class="icon three"></span>
            <p>Solicite o pedido através do site ou entrando diretamente em contato conosco.</p>
          </li>
          <li class="col-xs-12 col-md-6">
            <span class="icon four"></span>
            <p>Receba sua encomenda em sua casa, feita com muito afeto e dedicação, em todo o Brasil.</p>
          </li>
        </ul>
      </div>
    </section>
    <Shop :products="products" @changeCategory="changeCategory"/>
  </Layout>
</template>

<page-query>
query Data {
  settings: allSettings {
    edges {
        node {
            id
            banner_img
        }
    }
  }

  products: allProducts {
    edges {
        node {
            id
            uid
            name
            category
            collection
            base_value
            discount
            is_combo
            description
            base_paper_type {
              base_paper_type_option
              value
            }
            envelope_paper_type {
              envelope_paper_type_option
              value
            }
            configurables {
              configurable_name
              configurable_list {
                configurable_list_option
                value
              }
            }
            extras {
              extra_option
            }
            gallery
        }
    }
  }
}
</page-query>

<script>
import SiteHeader from "../components/SiteHeader";
import Shop from "../components/Shop.vue";

export default {
  metaInfo: {
    title: "Quindim Conviteria"
  },
  components: {
    SiteHeader,
    Shop
  },
  data() {
    return {
      currentProducts: [],
      currentCategory: "Casamentos"
    };
  },
  computed: {
    banner_img() {
      return this.$page.settings.edges[0].node.banner_img;
    },
    products() {
      return this.$page.products.edges
        .map(product => product.node)
        .filter(product => product.category === this.currentCategory);
    }
  },
  methods: {
    changeCategory(category) {
      console.log(category);
      this.currentCategory = category;
    }
  },
  created() {
    console.log(this);
  }
};
</script>

<style lang="less">
.banner {
  position: relative;

  &__bg {
    height: 90vh;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      display: block;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      background: rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  &__content {
    padding: 4vh 8vw;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    color: #fff;
  }

  &__cta {
    margin: auto 0;
    font-family: @headfont;

    .button {
      margin-top: 20px;
    }

    &-text {
      font-size: 2.4em;
      line-height: 1.2;
    }
  }
}

.shop {
  background: @lightpink;
  padding: 80px 0;
}

.policy {
  text-align: center;
  position: relative;

  &__bg {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    &.right {
      transform: scaleX(-1) translateY(-50%);
      right: 0;
      left: auto;
    }
  }
}
</style>



