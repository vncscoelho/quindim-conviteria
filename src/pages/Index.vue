<template>
  <Layout>
    <SiteHeader/>
    <section class="banner">
      <div class="banner__bg">
        <g-image :src="banner_img"/>
      </div>
      <!-- Header -->
      <div class="banner__content">
        <div class="banner__cta">
          <h1 class="banner__cta-text">
            Convites e papelaria para
            <br>celebrações doces e criativas.
          </h1>
          <a href="#como-funciona" class="button button-primary">Como funciona</a>
        </div>
      </div>
    </section>

    <section class="text-center section" id="como-funciona">
      <ornaments/>
      <div class="container">
        <span class="section-title">COMO FUNCIONA</span>
        <h2 class="section-heading">
          Vamos criar uma experiência personalizada
          <br>que complemente você e sua história?
        </h2>

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
            <p>
              A arte exposta nos modelos encontrados aqui é apenas para mostruário, a criação da
              identidade visual do seu convite é desenvolvida de forma personalizada.
            </p>
          </li>
          <li class="col-xs-12 col-md-6">
            <span class="icon three"></span>
            <p>Solicite o pedido através do site ou entrando diretamente em contato conosco.</p>
          </li>
          <li class="col-xs-12 col-md-6">
            <span class="icon four"></span>
            <p>
              Receba sua encomenda em casa, em qualquer lugar do Brasil, feita com todo o afeto e
              dedicação.
            </p>
          </li>
        </ul>
      </div>
    </section>
    <section class="section catalog">
      <div class="col-12 text-center">
        <span class="section-title">NOSSOS PRODUTOS</span>
        <h2 class="section-heading">Catálogo</h2>
      </div>
      <Shop :products="products" @changeCategory="changeCategory"/>
    </section>
    <section class="section testimonials">
      <div class="container">
        <div class="text-center">
          <span class="section-title">DEPOIMENTOS</span>
          <h2 class="section-heading">Histórias de clientes que passaram por aqui.</h2>
          <p class="section-text">Queremos a sua aqui também!</p>
        </div>
        <div class="row justify-content-between text-center">
          <div
            :class="['testimonials__item', { 'row justify-content-center' : key === 2}, {'col-12 col-lg-5' : key !== 2}]"
            v-for="(testimonial, key) in testimonials"
            :key="key"
          >
            <div :class="{ 'col-12 col-lg-6' : key === 2}">
              <p class="testimonials__text">{{testimonial.testimonial}}</p>
              <div class="testimonials__author">
                <p class="testimonials__author-name">{{testimonial.author}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center testimonials__cta">
          <a href="/sobre#depoimentos" class="button button-primary">Veja todos os depoimentos</a>
        </div>
      </div>
    </section>
  </Layout>
</template>

<static-query>
query Data {
  settings: allSettings {
    edges {
        node {
            id
            banner_img
        }
    }
  }

  products: allProducts(filter: { category: { eq: "Combos" }}) {
    edges {
        node {
            id
            uid
            name
            category
            collection
            base_value
            gallery
        }
    }
  }

  testimonials: allTestimonials(limit:3) {
    edges {
      node {
        id
        author
        testimonial
        order
      }
    }
  }
}
</static-query>

<script>
import Shop from "../components/Shop.vue";
import Ornaments from "../components/Ornaments.vue";
import SiteHeader from "../components/SiteHeader";

export default {
  metaInfo: {
    title: "Quindim Conviteria"
  },
  components: {
    Shop,
    Ornaments,
    SiteHeader
  },
  data() {
    return {
      currentProducts: [],
      currentCategory: "Combos"
    };
  },
  computed: {
    banner_img() {
      return this.$static.settings.edges[0].node.banner_img;
    },
    products() {
      return this.$static.products.edges.map(product => product.node);
    },
    testimonials() {
      return this.$static.testimonials.edges
        .map(testimonial => testimonial.node)
        .sort((a, b) => b.order - a.order);
    }
  },
  methods: {
    changeCategory(category) {
      this.currentCategory = category;
    }
  }
};
</script>

<style lang="less">
.banner {
  position: relative;

  &__bg {
    height: 90vh;

    @media @sm {
      height: calc(100vh - 75px);
    }

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

.catalog {
  background: @lightpink;
  padding-bottom: 0;

  @media @sm {
    .shop {
      padding-top: 0;
    }
    .row {
      order: 2;
    }
    .shop-sidebar {
      background: none;
      order: 1;
    }
  }
}
</style>



