<template>
  <div class="container">
    Hello World!
  </div>
</template>

<script>
export default {
  setup() {
    const testFunction = () => {
      console.log('Hello World!');
    };

    return {
      testFunction,
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #282625;
  font-size: 100px;
  color: #fff;
  text-shadow: 0 0 20px #558abb;
}
</style>
