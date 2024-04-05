<template><RouterView></RouterView></template>

<script lang="ts" setup>
import { useAuthorization } from './hooks/useAuthorization';
import router from './router';

const authUtil = useAuthorization();

authUtil.authorizeFromStorage() || router.push('/login');
</script>

<style lang="scss"></style>
