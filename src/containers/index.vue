<template>
    <v-app>
        <AppBar />
        <v-main>
            <router-view />
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
const AppBar = () => import("@/containers/Appbar");
const Footer = () => import("@/containers/Footer");

export default {
    components: {
        AppBar,
        Footer
    }
}
</script>

<style>

</style>