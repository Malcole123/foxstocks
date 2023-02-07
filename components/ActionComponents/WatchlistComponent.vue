<template>
    <div class="w-100">
        <div  v-if="componentState === 'search'" class="w-100 watchlist-component">
            <div class="watchlist-component-search">
                <div class="w-100 pt-2 pb-2">
                    <b-input 
                    v-model.trim="watchlistInput"
                    placeholder="Search using ticker or company name..." 
                    @update="inputType"/>
                </div>
                <div v-if="watchlistSearchResults.length > 0" class="w-100 watchlist-query-results">
                    <div v-if="fetchingResults" class="w-100 h-100 d-flex justify-content-center align-items-center">
                        <b-spinner variant="dark"></b-spinner>
                    </div>
                    <b-list-group v-else>
                        <b-list-group-item
                        v-for="(auto, index) in watchlistSearchResults"
                        :key="`search-item-${index}`"
                        >
                        <div class="w-100 pt-2 pb-2 d-flex align-items-center">
                            <b-avatar
                            icon="star-fill"
                                src=""
                            />
                            <div class="ml-3 d-flex flex-column">
                                <span><b>{{  auto.name }}</b></span>
                                <span class="mt-1">{{ auto.symbol }}</span>
                            </div>
                            <div class="ml-auto d-flex h-100">
                                <b-button
                                    v-if="auto.addState === 'not_added'" 
                                    size="xs" 
                                    variant="dark"
                                    @click="createWatchItem(index)"
                                    >Add</b-button>
                                <b-button
                                v-else-if="auto.addState === 'added'" 
                                size="xs" 
                                variant="success">Added</b-button>
                                <b-spinner 
                                v-else-if="auto.addState === 'adding'"
                                size="xs" 
                                variant="dark"
                                />
                            </div>
                        </div>
                        </b-list-group-item>
                    </b-list-group>
                </div>
                <div v-else class="w-100 watchlist-component watchlist-empty-state d-flex flex-column justify-content-center align-items-center">
                    <span class="material-symbols-outlined">
                        playlist_remove
                    </span>
                    <span class="mt-2">
                        Try another search
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="w-100">
            <div v-if="myWatchList.length === 0" class="w-100 watchlist-component watchlist-empty-state d-flex flex-column justify-content-center align-items-center">
                <span class="material-symbols-outlined">
                    playlist_remove
                </span>
                <span class="mt-2">
                    Nothing to see here
                </span>
            </div>
            <div v-else class="w-100">
                     <b-list-group>
                        <b-list-group-item
                        v-for="(auto, index) in myWatchList"
                        :key="`userwatch-item-${index}`"
                        >
                        <div class="w-100 pt-2 pb-2 d-flex align-items-center">
                            <b-avatar
                            icon="star-fill"
                                src=""
                            />
                            <div class="ml-3 d-flex flex-column">
                                <span><b>{{  auto.name }}</b></span>
                                <span class="mt-1">{{ auto.symbol }}</span>
                            </div>
                        
                        </div>
                        </b-list-group-item>
                    </b-list-group>
            </div>
        </div>
    </div>
</template>

<script>
import { stockTickerSearch } from '~/resources/market';


export default {
    props:[
        'componentView'
    ],
    emits:[
        'watchItemAdded',
    ],
    data(){
        return {
            componentState:"search",
            watchListStoreKey:"1291I2DFDF021281210SDS",
            watchlistInput:"",
            watchlistSearchResults:[],
            fetchingResults:false,
            currentUserWatchlist:[],
        }
    },
    computed:{
        myWatchList(){
            const userList = this.$store.getters['user/getUserWatchlist'];
            console.log(userList)
            return userList
        }
    },
    watch:{
        componentState(newVal,oldVal){
            if(newVal === 'search'){
                this.searchEffect("");
            }
        },
        componentView(newVal, oldVal){
            this.componentState = newVal;
        },
        currentUserWatchlist(newVal,oldVal){
            console.log(newVal)
        }
    },
    beforeMount(){

    },
    mounted(){
        this.setWatchlist();
        if(this.componentView !== null){
            this.componentState = this.componentView;
        }

        if(this.componentState === 'search'){
                this.searchEffect("");
            }
    },
    methods:{
        createWatchItem(id){
            const item = this.toggleWatchlistBtnState(id , 'adding');
            console.log(item, 'this item sent from client to store ')
            const { symbol , name , icon  } = item ;
            const result = this.$store.dispatch('user/updateWatchList', {
                tickerObject:{ symbol , name, icon  },
                updateType:'add',
            });

            setTimeout(()=>{
                if(result !== false){
                    // this.currentUserWatchlist = result;
                    this.toggleWatchlistBtnState(id , 'added');
                }
            },400)
        },
        toggleWatchlistBtnState(index, state){
            const targetAdd =  this.watchlistSearchResults[index]
            this.watchlistSearchResults[index].addState = state;
            return targetAdd
        },
        setWatchlistLocal(){
            const items = JSON.stringify(this.watchListItems)
            localStorage.setItem(this.watchListStoreKey, items);
            return true
        },
        getWatchlistLocal(){
            const items = localStorage.getItem(this.watchListStoreKey);
            if(typeof itemsStr === 'object'){
                this.watchListItems = JSON.parse(items)
            }
        },
        inputType(value){
            if(this.fetchingResults){ return }
            this.searchEffect();
        },
        getMatchResults(){
            this.setWatchlist();
            const query = this.watchlistInput;
            const results = stockTickerSearch({
                searchType:'name',
                searchQuery:query
            });
            this.watchlistSearchResults = this.formatSearchResults(results);
            return results;
        },
        formatSearchResults(results){
           const returnedResults =  [...results].map((item,index)=>{
                const { name , symbol, icon } = item ;
                const isInList = this.checkResultInWatchlist({tickerSymbol:symbol, name});
                return {
                    id:index,
                    name,
                    symbol,
                    icon,
                    addState:isInList !== undefined ? 'added' : 'not_added'
                }
            });
            return returnedResults
        },
        checkResultInWatchlist({tickerSymbol, name}){
            // Check if a result is in a users watchlist 
            const found = this.currentUserWatchlist.find((item)=>{
                return item.name === name || item.symbol === tickerSymbol;
            })
            return found
        },
        searchEffect(query){
            // const timeouts = [ 1200 , 1650 , 1700 , 1250 , 1120 ];
            // const useRandom = Math.floor(Math.random() * timeouts.length);
            this.fetchingResults = true;
            setTimeout(()=>{
                if(this.watchlistInput !== query){
                    this.searchEffect(this.watchlistInput);
                    return 
                }
                this.getMatchResults();
                this.fetchingResults = false;
            },300)
        },
        setWatchlist(){
            const userWatchlist = this.$store.getters['user/getUserWatchlist'];
            this.currentUserWatchlist = userWatchlist;
        }

    },
}
</script>

<style scoped>
    .watchlist-component{
        width:100%;
        min-height:40vh;
        height:41vh;
        border-radius:var(--app-stndrd-radius);
        cursor:pointer;
    }

    .watchlist-empty-state{
        min-height:40vh;
        border:1px dashed var(--app-grey-text-color);
    }

    .watchlist-query-results{
        width:100%;
        height:35vh;
        overflow-y:scroll;
    }
</style>