<template>
  <main>
    <slot/>
    <SiteFooter/>
  </main>
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
export default {
  components: {
    SiteFooter
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
input {
  padding: 8px 12px;
  border: 2px solid @darkpink;
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

.input-group {
  margin-bottom: 8px;

  select,
  label {
    display: block;
    width: 100%;
  }
}
</style>
