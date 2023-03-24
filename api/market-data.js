import axios from 'axios';
import { Router } from 'express';

import Alpaca from '@alpacahq/alpaca-trade-api';

//
import { restrictCountryMiddleware } from '../middlewares/financeApiMiddlewares';
import { 
    filterStockResultsForTarget,
    fetchStockSymbolInfo,
    fetchAllStockSymbolInfo,
    fetchMarketNews,
} from '../helpers/financialData';

import { finnhubCacheControl } from '../helpers/cacheHelper';

const router = Router();

// Prevent API Abuse

const finnuhubCache = new finnhubCacheControl();


const { 
    NUXT_ENV_ALPACCA_API_KEY,
    NUXT_ENV_ALPACA_CLIENT_SECRET,

} = process.env;




router.get('/home/:use_country', restrictCountryMiddleware,  async (req, res, next)=>{
    //Check Cache
    const inCache = finnuhubCache.getHomeCacheMemory();
    if(inCache.ok === true){ 
        console.log('cache used')
        res.json({
            ok:true,
            targetResults:inCache.data.targetResults,
            marketNews:inCache.data.marketNews,
        });
        return 
    }
    
    const stockSymbolFetch = fetchAllStockSymbolInfo({
        start:0,
        end:20,
        callbackFunction:(data)=>{
            console.log('data here')
            //Expects array 
            return data;
        }
    });
    const marketNewsFetch = fetchMarketNews({category:'general', paginationId:0});
    const homeDataFetch = [ stockSymbolFetch , marketNewsFetch ]

    Promise.all([...homeDataFetch]).then((values)=>{
        //Market news from finnhub
        const resolvedStockSymbolData = values[0];
        //Market News from finnhub
        const resolvedMarketNewsData = values[1];

        //For ticker symbols at top and cache 
        const resolvedStockSymbolFiltered = resolvedStockSymbolData.filter(item=>{ return item !== false})
        //Set Cache
        const cacheKey = finnuhubCache.setSpecialCacheMemory('home-page' ,{
            targetResults:resolvedStockSymbolFiltered,
            marketNews:resolvedMarketNewsData,
        })

        res.json({
            ok:true,
            targetResultsCacheKey:cacheKey,
            targetResults:resolvedStockSymbolFiltered,
            marketNews:resolvedMarketNewsData,
        })   
    })
    

})




router.get('/symbols/search', (req, res, next)=>{
    let test = {}
    res.send(test)
})


export default router;