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
  
  export default {
    name: 'IndexPage',
    components:{
      MainSidebarVue,
      MainWrapperVue,
    },
    fetchOnServer:false,
    data(){
      return{
          state:{
            menuOpen:null,
            errorLoading:false,
            pageLoading:false,
            componentsLoading:false,
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
    
    },
    beforeMount(){

    },
    mounted(){

    },
    methods:{
      deviceStateFormatting(eventType){
          if(innerWidth <= 992){
          this.state.menuOpen = false;
        
        }else{
          this.state.menuOpen = true;
        } 
      },
      detectSidebarChange(val){
        this.state.menuOpen = val;
      },
      toggleMenu(){
        this.state.menuOpen = true;
      },
      userDelayAction({callbackAction,timeout}){
        setTimeout(()=>{
          callbackAction();
        }, timeout)
      },
    },
    computed:{

    }
  }
  </script>
  