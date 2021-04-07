<template>
  <div>
    {{ project.slug }}
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const data = await $content('projects', slug).fetch()
    return {
      project: data,
    }
  },
  data() {
    return {
      initialBids: null,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(
      `/api/fetch_bids_for_blog?slug=${this.$route.params.slug}`
    )
    this.initialBids = data.bids
  },
  fetchOnServer: false,
  methods: {
    addBid() {
      this.initialBids++
      this.incrementBids()
    },
    async incrementBids() {
      await this.$axios.post(
        `/api/register-bid?slug=${this.$route.params.slug}`
      )
    },
  },
}
</script>
