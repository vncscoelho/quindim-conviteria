<template>
  <Layout>
    <SiteHeader internal class="about-us"/>
    <section class="section about-us__cta text-center">
      <span class="section-title">SOBRE NÓS</span>
      <h2 class="section-heading">Convites artesanais feitos com muito amor e cuidado.</h2>
    </section>
    <section class="text-center about-us__img-holder">
      <Ornaments/>
      <g-image class="about-us__img" src="~/assets/img/desi.png"/>
    </section>
    <section class="section about-us__story">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <h3>Muito prazer!</h3>
            <p>Meu nome é Desireè, e sou a idealizadora da Quindim Conviteria.</p>

            <p>Eu sou graduada em Publicidade e Propaganda, mestra em Comunicação Midiática pela UFSM e desde muito cedo, encantada com o mundo dos convites e da papelaria criativa.</p>

            <p>Em 2015 eu decidi dar vida a uma patinha chamada Quindim, deste então, ela é protagonista dessa trajetória, e nasceu para contar histórias através da papelaria, por meio das cores, dos laços e de todos os detalhes que preenchem o ateliê chamado Quindim Conviteria.</p>
          </div>
          <div class="col-12 col-md-6">
            <p>Não criamos apenas uma marca, mas uma história de amor e carinho, que se mantém até hoje.</p>

            <p>Nosso propósito é oferecer convites artesanais feitos com muito amor e cuidado, respeitando a flexibilidade de combinações e possibilidades, para que cada cliente encontre o que mais combina com a sua personalidade.</p>

            <p>A criação da arte é feita de forma personalizada, respeitando o gosto e as preferências de cada cliente. E todos os laços, dobras feitas, apliques colados são produzidos manualmente com toda a dedicação e afeto que um momento especial merece.</p>

            <p>Sejam bem-vinda ou bem-vindo à essa experiência!</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Ornaments from "../components/Ornaments";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default {
  components: {
    Ornaments,
    SiteHeader,
    SiteFooter
  }
};
</script>

<style lang="less">
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
    background: @lightyellow;
    h3 {
      font-family: @headfont;
      font-size: 3em;
      margin-bottom: 20px;
    }
  }
}
</style>
