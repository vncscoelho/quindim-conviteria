<template>
  <Layout>
    <SiteHeader internal class="about-us"/>
    <section class="section about-us__cta text-center">
      <span class="section-title">SOBRE NÓS</span>
      <h2 class="section-heading">Convites artesanais feitos com muito amor e cuidado.</h2>
    </section>
    <section class="section about-us__story">
      <Ornaments/>
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h3>Muito prazer!</h3>
            <p>Meu nome é Desireè, e sou a idealizadora da Quindim Conviteria.</p>

            <p>Eu sou graduada em Publicidade e Propaganda, mestra em Comunicação Midiática pela UFSM e desde muito cedo, encantada com o mundo dos convites e da papelaria criativa.</p>

            <p>Em 2015 eu decidi dar vida a uma patinha chamada Quindim, deste então, ela é protagonista dessa trajetória, e nasceu para contar histórias através da papelaria, por meio das cores, dos laços e de todos os detalhes que preenchem o ateliê chamado Quindim Conviteria.</p>

            <p>Não criamos apenas uma marca, mas uma história de amor e carinho, que se mantém até hoje.</p>

            <p>Nosso propósito é oferecer convites artesanais feitos com muito amor e cuidado, respeitando a flexibilidade de combinações e possibilidades, para que cada cliente encontre o que mais combina com a sua personalidade.</p>

            <p>A criação da arte é feita de forma personalizada, respeitando o gosto e as preferências de cada cliente. E todos os laços, dobras feitas, apliques colados são produzidos manualmente com toda a dedicação e afeto que um momento especial merece.</p>

            <p>Sejam bem-vinda ou bem-vindo à essa experiência!</p>
          </div>
          <div class="col-12 col-lg-6 text-center">
            <g-image src="~/assets/img/desi2.jpg"/>
          </div>
        </div>
      </div>
    </section>
    <section id="depoimentos" class="testimonials section">
      <div class="container">
        <span class="section-title">DEPOIMENTOS</span>
        <h2 class="section-heading">Histórias de clientes que passaram por aqui.</h2>
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
                  <p class="testimonials__author-name">{{testimonial.author}}</p>
                </div>
              </div>
            </slide>
          </carousel>
        </ClientOnly>
        <div class="row justify-content-between"></div>
      </div>
    </section>
    <section class="text-center about-us__img-holder">
      <g-image class="about-us__img" src="~/assets/img/desi.jpg"/>
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
import Ornaments from "../components/Ornaments";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default {
  components: {
    Ornaments,
    SiteHeader,
    SiteFooter,
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
.about-us {
  &__cta {
    background: @lightpink;
  }
  &__img-holder {
    position: relative;
  }
  &__img {
    width: 100%;
  }
  &__story {
    h3 {
      font-family: @headfont;
      font-size: 3em;
      margin-bottom: 20px;
      z-index: 2;
      position: relative;
    }
  }
}

.testimonials {
  text-align: center;

  &__item {
    cursor: grab;
  }

  &__text {
    max-width: 680px;
    margin: 40px auto;
  }
}
</style>
