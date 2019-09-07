<template>
  <Layout class="policy-internal">
    <SiteHeader internal/>
    <section class="section policy-internal__cta text-center">
      <span class="section-title">COMO FUNCIONA</span>
      <h2 class="section-heading">Convites artesanais feitos com muito amor e cuidado.</h2>
    </section>
    <section class="section">
      <Ornaments/>
      <ul class="container section-list">
        <li class="col-12">
          <span class="icon"></span>
          <p>
            Escolha os itens que desejar, podendo customizar seu modelo,
            <br>tamanho, tipos de papéis e
            laços.
          </p>
        </li>
        <li class="col-12">
          <span class="icon two"></span>
          <p>
            A arte exposta aqui é apenas para mostruário,
            <br>desenvolveremos uma arte personalizada para seu convite. Saiba mais aqui.
          </p>
        </li>
        <li class="col-12">
          <span class="icon three"></span>
          <p>
            Solicite o pedido através do site
            <br>ou entrando diretamente em contato conosco.
          </p>
        </li>
        <li class="col-12">
          <span class="icon four"></span>
          <p>
            Receba sua encomenda em sua casa,
            <br>feita com muito afeto e dedicação, em todo o Brasil.
          </p>
        </li>
      </ul>
    </section>
    <section class="testimonials section">
      <div class="container">
        <span class="section-title">DEPOIMENTOS</span>
        <h2 class="section-heading">Essas são as histórias de nossos clientes.</h2>
        <p class="section-text">Queremos a sua aqui também!</p>
        <ClientOnly>
          <carousel
            :perPage="1"
            paginationColor="#ebbda8"
            paginationActiveColor="#fcf8fa"
            :paginationPadding="4"
          >
            <slide
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="align-items-center"
            >
              <div class="testimonials__item text-center" :key="index">
                <p class="testimonials__text">{{testimonial.testimonial}}</p>
                <div class="testimonials__author">
                  <div class="testimonials__author-photo">
                    <img :src="testimonial.photo" alt>
                  </div>
                  <p class="testimonials__author-name">{{testimonial.author}}</p>
                </div>
              </div>
            </slide>
          </carousel>
        </ClientOnly>
        <div class="row justify-content-between"></div>
      </div>
    </section>
  </Layout>
</template>

<static-query>
query Data {
  testimonials: allTestimonials {
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
import SiteHeader from "../components/SiteHeader";
import Ornaments from "../components/Ornaments";

export default {
  components: {
    SiteHeader,
    Ornaments,
    Carousel: () =>
      import("vue-carousel")
        .then(m => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel")
        .then(m => m.Slide)
        .catch()
  },
  computed: {
    testimonials() {
      return this.$static.testimonials.edges
        .map(testimonial => testimonial.node)
        .sort((a, b) => b.order - a.order);
    }
  }
};
</script>

<style lang="less" scoped>
.policy-internal {
  &__cta {
    background: @lightpink;
  }

  .section-list {
    li {
      text-align: center;
      flex-direction: column;
    }
  }

  .testimonials {
    text-align: center;

    &__text {
      max-width: 680px;
      margin: 40px auto;
    }
  }
}
</style>
