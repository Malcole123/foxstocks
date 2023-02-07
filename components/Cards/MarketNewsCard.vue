<template>
<b-card
    :title="newsHeadline"
    :img-src="newsImg"
    img-alt="Image"
    img-top
    tag="article"
  >
    <b-card-text>
      {{  newsSummary }}
    </b-card-text>
    <div class="w-100 d-flex justify-content-end">
        <b-button :href="newsUrl" target="_blank" variant="dark" class="ml-auto app-btn-purple">Read more...</b-button>
    </div>
  </b-card>
</template>

<script>
export default {
    props:[
        'newsHeadline',
        'newsCategory',
        'newsSummary',
        'newsUrl',
        'newsImg',
        'newsDate',
        'newsUUID',
    ]
}
</script>

<style>

</style>