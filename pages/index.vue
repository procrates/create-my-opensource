<template>
  <div class="container mx-auto max-w-7xl px-3">
    <article v-for="project in projects" :key="project.slug">
      <nuxt-content :document="project" />
      <nuxt-link :to="`/${project.link}`">{{ project.title }}</nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, error }) {
    const data = await $content('projects').fetch()

    return {
      projects: data,
    }
  },
}
</script>
