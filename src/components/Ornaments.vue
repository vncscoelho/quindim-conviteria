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
    top: -10px;
    transform: translateY(-50%);
    z-index: 1;

    @media @sm {
      width: 40%;
    }

    &.right {
      transform: scaleX(-1) translateY(-50%);
      right: 0;
      top: calc(100% - 10px);
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

