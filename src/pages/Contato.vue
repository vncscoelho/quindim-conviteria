<template>
  <Layout>
    <SiteHeader internal/>
    <section class="section contact__title text-center">
      <span class="section-title">ENTRE EM CONTATO</span>
      <h2 class="section-heading">Fale conosco da maneira que preferir.</h2>
    </section>
    <section class="section form">
      <ornaments/>
      <p class="section-title">ENVIE UMA MENSAGEM</p>
      <div class="container">
        <form
          name="contact-form"
          class="col-12 col-sm-8"
          ref="form"
          @submit.prevent="sendMail"
          method="POST"
          data-netlify="true"
        >
          <label>
            <span>Seu e-mail</span>
            <input type="email" name="Email">
          </label>
          <label>
            <span>Sua cidade</span>
            <input type="text" name="Cidade">
          </label>
          <label>
            <span>Assunto</span>
            <select name="Assunto">
              <option value="Dúvida" selected>Dúvida</option>
              <option value="Entrega">Entrega</option>
              <option value="Sugestão">Sugestão</option>
            </select>
          </label>
          <label>
            <span>Mensagem</span>
            <textarea type="email" name="mensagem"></textarea>
          </label>
          <input type="text" name="_honey" style="display:none">
          <input type="hidden" name="_captcha" value="false">
          <button class="button button-primary">Enviar</button>
          <span v-if="success" class="m-3 alert alert-success">E-mail enviado com sucesso!</span>
        </form>
      </div>
    </section>
    <section class="section bottom-contacts text-center">
      <div class="bottom-contacts__column">
        <p class="section-title">PELO TELEFONE</p>
        <a href="tel:5555981256350">(55) 98125-6350</a>
        <br>
        <a href="tel:5555981256350">Whatsapp</a>
      </div>
      <div class="bottom-contacts__column">
        <p class="section-title">NOSSAS REDES SOCIAIS</p>
        <a href="#">Facebook</a>
        <br>
        <a href="#">Instagram</a>
      </div>
    </section>
  </Layout>
</template>

<script>
import SiteHeader from "../components/SiteHeader";
import Ornaments from "../components/Ornaments";

export default {
  components: {
    SiteHeader,
    Ornaments
  },
  data() {
    return {
      success: false
    };
  },
  methods: {
    sendMail() {
      const form = this.$refs.form;
      fetch(form.attributes.action, {
        method: "POST",
        body: new FormData(this.$refs.form)
      }).then(({ status }) => {
        if (status === 200) this.success = true;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  .section-title {
    display: block;
    text-align: center;
  }
  form {
    margin: 0 auto;
  }
  label {
    display: block;

    input,
    select,
    textarea {
      display: block;
      width: 100%;
    }
  }
}

.bottom-contacts {
  display: flex;
  background: @darkpink;

  a {
    color: @brown;
    font-weight: bold;
  }

  .section-title {
    color: @lightyellow;
  }

  &__column {
    flex: 1;
  }
}

.contact {
  &__title {
    background: @lightpink;
  }
}
</style>
