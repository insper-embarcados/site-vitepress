<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout, VPSidebar, VPNav, VPContent } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar>
      <VPSidebar />
    </template>
    <!-- Add hero, features, and actions here to mimic home layout -->
    <div class="hero-section">
      <!-- Hero content -->
    </div>
    <VPContent />
  </Layout>
</template>
