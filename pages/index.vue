<template>
  <MainWrapperVue
  :sidebar-active="state.menuOpen"
  >
        <template #sidebar>
          <MainSidebarVue
            :sidebar-override="state.menuOpen"
            :component-loading="state.componentsLoading"
            @sidebarChanged="detectSidebarChange"
          />
        </template>

        <template #application_content>
          <b-container fluid class="application-base-component">
            <div v-if="state.pageLoading === false" class="w-100 pt-3">
              <div class="w-100 application-header-wrapper application-header-sticky justify-content-between">
                  <span class="d-flex h-100 align-items-center">
                    <span 
                    v-if="state.menuOpen !== true && state.menuOpen !== null" 
                    class="mr-4 force-mobile-hidden" style="cursor:pointer" 
                    @click="toggleMenu"
                    >
                      <span class="material-symbols-outlined">
                          menu
                      </span>
                    </span>
                    <span class="app-heading-large">
                        Hello  , 
                    </span>
                  </span>
                  <div class="d-flex h-100 align-items-center force-mobile-hidden">
                    <b-avatar
                      src=""
                    />
                  </div>
              </div>
              <div class="w-100 pt-3 pb-3 d-flex flex-column">
                  <div class="w-100 d-flex flex-column">
                    <div class="w-100">
                      <h3 class="app-text-small app-text-weight-md">Popular Stocks</h3>

                    </div>
                    <div class="w-100 mt-3">
                      <div class="w-100 position-relative" style="position:relative;">
                        <div class="app-slider-overlay app-slider-overlay-left d-none justify-content-start align-items-center">
                                <b-button class="app-btn-purple d-flex align-items-center" variant="dark" @click="slideStockResultSliderLeft"> 
                                  <span class="material-symbols-outlined">
                                    arrow_back
                                  </span>  
                                </b-button>
                          </div>
                          <HooperSlider
                          ref="hopper"
                          style="overflow-y:visible"
                          :settings="componentOptions.stockSliderOptions"
                          @updated="detectUpdate"
                        >
                            <HooperSlideItem
                              v-for="(popStock ,popIndex) in pageData.popularStocks"
                                :key="'stock-selection-item-'+ popIndex"
                                class="pt-0 pb-0 pl-2 pr-2 home-selection-card"
                            >
                                <StockCardDisplay
                                  :use-id="'stock-selection-card-'+ popIndex"
                                  :card-title="popStock.companyName"
                                  :stock-symbol="popStock.tickerSymbol"
                                  :current-price="popStock.tickerData.c"
                                  :price-change="popStock.tickerData.d"
                                  :ticker-icon="popStock.tickerIcon"
                                />
                            </HooperSlideItem>
                        </HooperSlider>
                        <div class="app-slider-overlay app-slider-overlay-right d-flex justify-content-end align-items-center">
                                <b-button class="app-btn-purple d-flex align-items-center" variant="dark" @click="slideStockResultSliderRight"> 
                                  <span class="material-symbols-outlined">
                                    arrow_forward
                                  </span>  
                                </b-button>
                          </div>
                      </div>
                    </div>
                    
                  </div>
                  <div class="w-100 d-flex flex-column mt-5">
                    <div class="w-100">
                      <b-row class="w-100 m-0" :no-gutters="true">
                        <b-col sm="12" md="12" lg="4" xl="4" class="p-2 m-0">
                          <div class="w-100">
                              <div class="w-100">
                                <div class="w-100">
                                    <h3 class="app-text-small app-text-weight-md">Balance</h3>
                                </div>
                                <div class="w-100 app-grid-mandatory app-grid-three-one app-spacing-sm">
                                    <div class="w-100">
                                      <ColorCardBaseVue
                                          card-use-state="useSpecific"
                                          use-color-filter="appColorPurpleDark"
                                          >
                                              <template #card_content>
                                                <div class="w-100 pt-2 pb-2" style="color:inherit">
                                                  <span class="app-heading-large text-light">
                                                    <b-skeleton v-if="state.componentsLoading" type="input" style="border:none;"></b-skeleton>
                                                    <span v-else class="app-text-primary">
                                                      $ 14,032.56
                                                    </span>
                                                  </span>
                                                </div>
                                              </template>
                                      </ColorCardBaseVue>
                                    </div>
                                    <div class="w-100">
                                      <ColorCardBaseVue
                                          card-use-state="useSpecific"
                                          use-color-filter="appColorGreenLight"
                                          >
                                              <template #card_content>
                                                <div class="w-100 pt-2 pb-2 d-flex justify-content-center align-items-center">
                                                     <b-skeleton v-if="state.componentsLoading" type="input" style="border:none;"></b-skeleton>
                                                      <span v-else class="app-heading-large text-dark" >
                                                        +10.5%
                                                      </span>
                                                </div>
                                              </template>
                                        </ColorCardBaseVue>
                                    </div>
                                </div>
                              </div>
                          </div>
                          <div class="w-100 mt-4">
                              <div class="w-100">
                                <div class="w-100">
                                    <h3 class="app-text-small app-text-weight-md">Invested</h3>
                                </div>
                                <div class="w-100">
                                        <ColorCardBaseVue
                                          card-use-state="useSpecific"
                                          use-color-filter="appColorDark"
                                          >
                                              <template #card_content>
                                                <div class="w-100 pt-3 pb-3" style="color:inherit">
                                                  <b-row :no-gutters="true" class="m-0 h-100 align-content-center">
                                                    <b-col lg="10" md="9" sm="9" xs="9" class="h-100 d-flex align-items-center">
                                                      <b-skeleton v-if="state.componentsLoading" type="input" style="border:none;height:var(--app-text-2xl)"></b-skeleton>
                                                      <span v-else class="app-heading-large app-text-primary text-light">
                                                        $ 89,032.56
                                                      </span>
                                                    </b-col>
                                                    <b-col lg="2" md="3" sm="3" xs="3" class="h-100 d-flex align-items-center justify-content-end">
                                                      <b-button v-if="state.componentsLoading === false"  class="app-btn-purple d-flex align-items-center pt-2 pb-2" variant="dark">
                                                          <span class="material-symbols-outlined">
                                                            arrow_right_alt
                                                          </span>
                                                      </b-button>
                                                    </b-col>
                                                  </b-row>
                                                </div>
                                              </template>
                                        </ColorCardBaseVue>
                                </div>
                              </div>
                          </div>
                        </b-col>
                        <b-col sm="12" md="12" lg="4" xl="4" class="p-2 m-0">
                          <div class="w-100">
                            <h3 class="app-text-small app-text-weight-md">Market News</h3>
                          </div>
                            <div class="w-100 mt-3 focus-list">
                              <div class="w-100 mb-3"
                              v-for="(news, index ) in applicationNewsFeed"
                              :key="'market-news-card-'+ index "
                              >
                                <MarketNewsCardVue
                                  :news-headline="news.headline"
                                  :news-summary="news.summary"
                                  :news-category="news.category"
                                  :news-img="news.image"
                                  :news-source="news.source"
                                  :news-url="news.url" 
                                />
                              </div>
                          
                            </div>
                            <div class="w-100 mt-3">
                              <div class="w-100 d-flex justify-content-center flex-column align-items-center">
                                <b-spinner v-if="componentOptions.newsFeed.fetching === true" class="mt-3" size="sm" ></b-spinner>
                                <b-button
                                v-else
                                class="app-btn-purple w-100" 
                                @click="newsFeedLoadMore"
                                outline >Load More</b-button>
                              </div>
                            </div>
                        </b-col>
                        <b-col sm="12" md="12" lg="4" xl="4" class="p-2 m-0">
                          <div class="w-100 d-flex justify-content-between align-items-center">
                            <span>
                              <h3 class="app-text-small app-text-weight-md">Watchlist</h3>
                            </span>
                            <span>
                                <b-button 
                                v-if="state.watchlistState === 'view'"
                                class="d-flex align-items-center app-btn-purple p-1"
                                 size="sm" 
                                 variant="dark" 
                                 @click="openWatchlistAdd">
                                    <span class="material-icons">
                                        add
                                    </span>
                                </b-button>
                                <b-button 
                                v-else
                                class="d-flex align-items-center app-btn-purple p-1"
                                 size="sm" 
                                 variant="dark" 
                                 @click="closeWatchlistAdd">
                                    <span class="material-icons">
                                        close
                                    </span>
                                </b-button>
                            </span>
                          </div>
                          <div class="w-100 mt-3">
                            <WatchListComponent
                              :component-view="state.watchlistState"
                            />
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                    
                  </div>
              </div>
            </div>
          </b-container>
          <b-modal
            v-model="componentOptions.modal.shown"
          >


          </b-modal>
        </template>
  </MainWrapperVue>
</template>

<script>
import MainWrapperVue from '~/components/Wrappers/MainWrapper.vue'
import MainSidebarVue from '~/components/NavigationComponents/ApplicationSidebars/MainSidebar.vue';
import StockCardDisplay from '~/components/StockDisplayComponents/StockCardDisplay.vue';
import ColorCardBaseVue from '~/components/Cards/ColorCardBase.vue';
import WatchListComponent from '~/components/ActionComponents/WatchlistComponent.vue'
import MarketNewsCardVue from '~/components/Cards/MarketNewsCard.vue';


export default {
  name: 'IndexPage',
  components:{
    MainSidebarVue,
    MainWrapperVue,
    StockCardDisplay,
    ColorCardBaseVue,
    WatchListComponent,
    MarketNewsCardVue,
  },
  fetchOnServer:false,
  data(){
    return{
        state:{
          menuOpen:null,
          errorLoading:false,
          pageLoading:true,
          componentsLoading:true,
          watchlistState:'view',
        },
        componentOptions:{
          stockSliderOptions:{
              itemsToShow:3.5,
              itemsToSlide:3,
              autoPlay:true,
              playSpeed:4000,
              centerMode:false,
              infiniteScroll:false,
              transition:500,
              direction:'horizontal',
              trimWhiteSpace:true,
          },
          modal:{
            shown:false,
          },
          newsFeed:{
            totalResults:0, // Number of items fetched 
            displayingResult:15,  // Number of items shown on ui
            pagination:15, // Number of items to incre. list by 
            curPage:1,
            fetching:false,
          }
        },
        pageData:{
            popularStocks:[],
            marketNews:[],
        }
    }
  },
  async fetch() {
    await this.$axios.$get('/api/market-data/home/US').then(response=>{
      const { targetResults , marketNews,   ok } = response;
      if(ok === true){
        const pageData = {
          popularStocks:targetResults,
          marketNews,
        }
        this.setPageData(pageData);

      }else{
        this.state.errorLoading = true;
        return 
      }

        this.userDelayAction({
          callbackAction:()=>{
              // Disable page loading 
              this.state.pageLoading = false;
              this.userDelayAction({
                callbackAction:()=>{
                  // Disable component loading
                  this.state.componentsLoading = false;
                },
                timeout:500,
              })
          },
          timeout:100,
        })
    }).catch(err=>{
      this.state.errorLoading = true;
      console.log(err)
    })
  },
  beforeMount(){
    this.deviceStateFormatting('load');
  },
  mounted(){
    window.addEventListener('resize', ()=>{
      const breakpoint = 992;
      if(breakpoint -1 === 991 || breakpoint + 1 === 993){
        this.deviceStateFormatting('resize')
      }
    });
  },
  methods:{
    deviceStateFormatting(eventType){
        if(innerWidth <= 992){
        this.state.menuOpen = false;
        this.updateHopperSlide({
          itemsToShow:1,
          itemsToSlide:1,
          infiniteScroll:false,
          centerMode:true,
          forceComponentUpdate:eventType === 'load' || eventType === 'resize', // To accompany for hard set desktop
        })
      }else{
        this.state.menuOpen = true;
        this.updateHopperSlide({
          itemsToShow:3.5,
          itemsToSlide:3,
          infiniteScroll:true,
          forceComponentUpdate:eventType === 'resize',
          centerMode:false,
        })
      } 
    },
    updateHopperSlide({forceComponentUpdate, itemsToShow, itemsToSlide, infiniteScroll, centerMode}){
      const hopper = this.$refs.hopper;
      this.componentOptions.stockSliderOptions.infiniteScroll = infiniteScroll;
      this.componentOptions.stockSliderOptions.itemsToShow = itemsToShow;
      this.componentOptions.stockSliderOptions.itemsToSlide = itemsToSlide;
      this.componentOptions.stockSliderOptions.centerMode = centerMode;
      if(forceComponentUpdate && hopper !== undefined){
        this.$refs.hopper.update()
      }
    },
    detectUpdate(data){

    },  
    setPageData({popularStocks, marketNews}){
      this.pageData.popularStocks = popularStocks;
      this.pageData.marketNews = marketNews;
    },
    detectSidebarChange(val){
      this.state.menuOpen = val;
    },
    toggleMenu(){
      this.state.menuOpen = true;
    },
    slideStockResultSliderLeft(){
      this.$refs.hopper.slidePrev();
    },
    slideStockResultSliderRight(){
      this.$refs.hopper.slideNext();
    },
    userDelayAction({callbackAction,timeout}){
      setTimeout(()=>{
        callbackAction();
      }, timeout)
    },
    controlModal(val){
      this.componentOptions.modal.shown = val;
    },
    openWatchlistAdd(){
      this.state.watchlistState = 'search';
    },
    closeWatchlistAdd(){
      this.state.watchlistState = 'view';
    },
    // News Feed
    newsFeedLoadMore(){
      this.componentOptions.newsFeed.fetching = true;
      this.userDelayAction({
        callbackAction:()=>{
          this.componentOptions.newsFeed.displayingResult  = 
          this.componentOptions.newsFeed.displayingResult + this.componentOptions.newsFeed.pagination;
          this.componentOptions.newsFeed.fetching = false;
        },
        timeout:700,
      })
    }
  },
  computed:{
    applicationNewsFeed(){
      const { displayingResult} = this.componentOptions.newsFeed;
      if(this.pageData.marketNews === undefined){ return []}
      const marketNewsAll = [...this.pageData.marketNews];
      const useStartIndex = 0;
      const useEndIndex = displayingResult;
      const uiMarketNewsFeed = marketNewsAll.slice(useStartIndex , useEndIndex);
      return uiMarketNewsFeed
    }
  }
}
</script>
