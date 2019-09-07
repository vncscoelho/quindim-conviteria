<template>
  <aside class="ornaments">
    <g-image immediate class="ornaments__bg" src="~/assets/img/policy_bg.png"/>
    <g-image immediate class="ornaments__bg right" src="~/assets/img/policy_bg.png"/>
  </aside>
</template>

<style lang="less" scoped>
.ornaments {
  &__bg {
    position: absolute;
    left: 0;
    top: -2%;
    transform: translateY(-50%);
    z-index: 1;

    &.right {
      transform: scaleX(-1) translateY(-50%);
      right: 0;
      top: 99%;
      left: auto;
    }

    &--reverse {
      right: 0;
      left: auto;
      transform: scaleX(-1) translateY(-50%);

      &.right {
        left: 0;
        transform: scaleX(1) translateY(-50%);
      }
    }
  }
}
</style>

