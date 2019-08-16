<template>
  <footer class="footer section container-fluid">
    <div class="row col-12">
      <div class>
        <p class="footer__cta section-heading">
          Ainda não achou o convite perfeito
          <br>para esse dia tão importante na sua vida?
        </p>
        <p>Entre em contato e iremos te ajudar!</p>

        <p class="footer__contacts">
          <a href="#">contato@quindimconviteria.com.br</a>
          <a href="#">(55) 9999 9999</a>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </p>
      </div>
      <div class="footer__logo">
        <g-image src="~/assets/img/logo-footer.png"/>
      </div>
    </div>
    <hr>
    <div class="row footer__copy">
      <div class="col-6">Copyright Quindim Conviteria 2019. Todos os direitos reservados.</div>
      <div class="col-6 text-right">Desenv. por Vinicius Coelho</div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  padding: 80px 40px 40px 40px;
  background: #fff;
  color: @lightbrown;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__cta {
    font-family: @headfont;
    line-height: 1;
    color: @darkbrown;
  }

  &__contacts {
    a {
      display: block;
      color: @darkpink;
      margin-top: 8px;
    }
  }

  &__logo {
    text-align: center;
  }

  &__sitemap {
    display: flex;
    flex-direction: column;
    text-align: right;
    justify-content: center;

    a {
      color: @darkpink;
      margin-top: 12px;
      display: block;
    }
  }

  hr {
    padding-top: 20px;
    border-top: 2px solid @lightpink;
  }

  &__copy {
    font-size: 10px;
    color: @lightbrown;
  }
}
</style>

