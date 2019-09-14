<template>
  <transition name="alert" appear>
    <div :class="['alert-bar', { show: this.show }, type]">{{message}}</div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      type: "success",
      message: "Enviado com sucesso."
    };
  },
  created() {
    this.$root.$on("alert", ({ type, message }) => {
      this.show = true;
      this.type = type;
      this.message = message;
      setTimeout(() => {
        this.show = false;
      }, 3500);
    });
  }
};
</script>

<style lang="less" scoped>
.alert-bar {
  position: fixed;
  z-index: 200;
  text-align: center;
  width: 100%;
  padding: 20px;
  top: -100px;
  transition: top 750ms;
  font-weight: 600;

  &.show {
    top: 0;
  }

  &.success {
    background: #99eba7;
  }

  &.warning {
    background: rgb(255, 191, 117);
  }

  &.error {
    background: rgb(250, 149, 149);
  }
}
</style>
