const state = ()=>{
    return {
        isLoggedIn:false,
        user:{
            name:{
                first:"Guest",
                last:""
            }
        },
        watchlist:[],
    }
}


const getters = {  
    getUserName(state){
        return {
            name:state.user.name,
            nameStringLng:`${state.user.name.first} ${state.user.name.last}`,
            nameStringShrt:`${state.user.name.first}`
        }
    },
    
    getUserWatchlist(state){
        const watchlist = state.watchlist;
        return watchlist
    }
}


const mutations = {
    addWatchlistItem(state, { symbol , name, icon }){
        const currentItems = getters.getUserWatchlist(state);
        console.log(currentItems, 'items before add');
        if(typeof currentItems !== 'object'){ return false}
        const isInList = currentItems.find((item, index)=>{ return item.name === name || item.symbol === symbol });
        if(isInList){ 
            return false
        }
        const newItem = {
            name,
            symbol,
            icon,
        }
        const newWatchList = [...currentItems , newItem];
        state.watchlist = newWatchList;
        console.log(state.watchlist , 'items after add')
        return state.watchlist;

    }
}


const actions = {
    updateWatchList(state, { updateType , tickerObject }){
        try {
            const { name , icon, symbol } = tickerObject; 
            if( name === undefined || icon === undefined || symbol === undefined){ return false};
            if(updateType === 'add'){
                state.commit('addWatchlistItem' , { name , icon , symbol });
                return true 
            }else if( updateType === 'remove'){
                state.commit('removeWatchlistItem', { name, icon , symbol});
                return true 
            }
        }catch(err){
            return false;
        }
    }
}



export { state, getters, mutations , actions}