<template>
  <div class="w-100 market-news-card">
    <b-card
    :img-src="newsImg"
    img-alt="Image"
    img-top
    tag="article"
  >
    <b-card-text>
      <div class="w-100">
        <h3 class="market-news-text market-news-headline">
          {{ newsHeadline }}
        </h3>
      </div>
      <div class="w-100">
        <p class="market-news-text market-news-summary">
          {{  newsSummary }}
        </p>
      </div>
    </b-card-text>
    <div class="w-100 d-flex justify-content-end">
        <b-button :href="newsUrl" target="_blank" variant="dark" class="ml-auto app-btn-purple">Read more...</b-button>
    </div>
  </b-card>
  </div>
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

<style scoped>
  .market-news-card{
    cursor:pointer;
    transition:0.3s ease-in-out;
    border-radius:var(--app-stndrd-radius);
    border:0.1px solid transparent;
  }



  .market-news-text{
    display:-webkit-box;
    --webkit-box-orient:vertical;
    --webkit-line-clamp:2;
    overflow:hidden;
    width:100%;

  }

  .market-news-headline{
    font-size:var(--app-text-md);
    font-weight:600;
    --webkit-line-clamp:1;
  }

  .market-news-summary{
    font-size:var(--app-text-xs);
    --webkit-line-clamp:2;
    transition:0.3s ease-in-out;
  }

  .market-news-card:hover{
    transform:scale(1.05);
    box-shadow:var(--app-card-box-shadow);
    border-color:var(--app-grey-base-color)
  }

  .market-news-card:hover .market-news-summary{
    font-weight:500;
    color:black;

  }



</style>