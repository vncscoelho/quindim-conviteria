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
          name="Form de Contato"
          class="col-12 col-sm-8"
          ref="form"
          @submit.prevent="sendMail"
          method="POST"
          data-netlify="true"
          netlify-honeypot="isSpam"
        >
          <label>
            <span>Seu Nome</span>
            <input type="text" name="Nome" v-model="form['Nome']">
          </label>
          <label>
            <span>Seu e-mail</span>
            <input type="email" name="Email" v-model="form['Email']">
          </label>
          <label>
            <span>Sua cidade</span>
            <input type="text" name="Cidade" v-model="form['Cidade']">
          </label>
          <label>
            <span>Assunto</span>
            <select name="Assunto" v-model="form['Assunto']">
              <option value="Planner">Planner</option>
              <option value="Dúvida" selected>Dúvida</option>
              <option value="Entrega">Entrega</option>
              <option value="Sugestão">Sugestão</option>
            </select>
          </label>
          <label>
            <span>Mensagem</span>
            <textarea type="email" name="Mensagem" v-model="form['Mensagem']"></textarea>
          </label>
          <input type="text" name="isSpam" style="display:none" v-model="form['isSpam']">
          <input name="form-name" value="Form de Contato" type="hidden">
          <button class="button button-primary">Enviar</button>
        </form>
      </div>
    </section>
    <section class="section bottom-contacts text-center">
      <div class="bottom-contacts__column">
        <p class="section-title">PELO TELEFONE</p>
        <a href="tel:5555981256350">(55) 98125-6350</a>
        <br>
        <a href="https://wa.me/5555981256350">Whatsapp</a>
      </div>
      <div class="bottom-contacts__column">
        <p class="section-title">NOSSAS REDES SOCIAIS</p>
        <a href="https://facebook.com/quindimconviteria">Facebook</a>
        <br>
        <a href="http://instagram.com/quindimconviteria">Instagram</a>
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
      form: {
        Nome: "",
        Email: "",
        Cidade: "",
        Assunto: "Dúvida",
        Mensagem: "",
        isSpam: ""
      }
    };
  },
  methods: {
    sendMail() {
      const form = this.$refs.form;
      fetch("/", {
        method: "POST",
        body: this.encode({ "form-name": "Form de Contato", ...this.form }),
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
  metaInfo() {
    return {
      title: "Contato"
    };
  }
};
</script>

<style lang="less" scoped>
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
