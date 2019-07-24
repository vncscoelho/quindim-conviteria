<template>
  <main>
    <slot/>
  </main>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style lang="less">
body {
  font-family: "Hind Madurai", sans-serif;
}
</style>
