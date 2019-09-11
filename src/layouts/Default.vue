<template>
  <transition name="fade" appear>
    <main>
      <AlertBar/>
      <slot/>
      <SiteFooter/>
    </main>
  </transition>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
import SiteFooter from "../components/SiteFooter";
import AlertBar from "../components/AlertBar";

export default {
  components: {
    SiteFooter,
    AlertBar
  }
};
</script>


<style lang="less">
main {
  font-family: @textfont;
}

a {
  color: @brown;

  &:hover {
    color: @lightbrown;
    text-decoration: none;
  }
}

img {
  max-width: 100%;
}

.icon {
  background: url("../assets/img/list_icons.png") no-repeat;
  background-position: 0 0;
  display: inline-block;
  width: 35px;
  height: 45px;

  &.two {
    background-position: -35px 0;
  }

  &.three {
    background-position: -108px 0;
  }

  &.four {
    background-position: -73px 0;
  }
}

select,
textarea,
input {
  padding: 8px 12px;
  border: 2px solid @darkpink;
}

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
    font-weight: 600;

    input,
    select,
    textarea {
      display: block;
      width: 100%;
    }
  }
}

.button {
  display: inline-block;
  padding: 16px 36px;
  font-family: @textfont;
  transition: 150ms all linear;
  letter-spacing: 0.5px;
  border: 0;
  font-weight: 600;

  &-primary {
    background-color: @pink;
    color: @brown;

    &:hover {
      color: @darkbrown;
      background-color: @darkpink;
    }
  }

  &:hover {
    text-decoration: none;
  }
}

.section {
  padding: 80px 10px;
  font-family: @textfont;
  color: #333;
  position: relative;

  &-title {
    letter-spacing: 1px;
    color: @darkpink;
  }

  &-heading {
    font-family: @headfont;
    font-size: 2em;
    color: @darkbrown;
  }

  &-list {
    list-style-type: none;
    display: flex;
    flex-flow: wrap;
    width: 100%;

    li {
      text-align: left;
      display: flex;
      align-items: center;

      p {
        flex: 1;
        margin: 0;
        padding: 20px;
      }
    }
  }
}

.shop {
  background: @lightpink;
  padding: 80px 0;
}

.testimonials {
  background: @lightyellow;
  cursor: grab;
  &__cta {
    margin-top: 80px;
  }
  &__text {
    font-size: 0.9em;

    &:before {
      content: "“";
      font-weight: bold;
    }

    &:after {
      font-weight: bold;
      content: "”";
    }
  }
  &__item {
    margin-top: 60px;
  }
  &__author {
    display: flex;
    align-items: center;
    justify-content: center;
    color: @darkpink;

    &-name {
      margin: 0;
      font-family: @headfont;
      font-style: italic;
      font-size: 1.5em;
    }
    &-photo {
      width: 45px;
      height: 45px;
      margin-right: 8px;
      border-radius: 50%;
      background: lightblue;
    }
  }
}

.input-group {
  margin-bottom: 8px;

  select,
  label {
    display: block;
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave {
  transition: opacity 750ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
