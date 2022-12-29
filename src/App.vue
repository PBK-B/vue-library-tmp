<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <h2>Hello Welcome Use Vue-Library-Tmp</h2>
        <p style="margin-bottom: 50px;">This is debugging EMS Module Page.</p>
        <button @click="onDebugging">debugging</button>
    </div>
</template>

<script>
import { getWelcomeMessage } from '@zmide/lib-welcome'

export default {
    name: 'App',
    components: {
    },
    methods: {
        onDebugging: function () {
            var msg = getWelcomeMessage("tzmax");
            console.log("message", msg);
            window.alert(msg);
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

button {
    border: none;
    outline: none;
    padding: 10px 25px;
    color: #000;
    background: #0002;
    font-size: 20px;
    border-radius: 5px;
    position: relative;
}


button::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #0003;
    transform: translate(-50%, -50%);
    content: '';
    opacity: 0;
    transition: .3s;
}

button:active::after {
    opacity: 0.4;
    transition: 0s;
}
</style>
