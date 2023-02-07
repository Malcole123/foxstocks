import { STOCK_TICKERS } from '../resources/market'
import axios from 'axios';

const polygonBaseUrl = (path)=>{
    return `https://api.polygon.io${path}`
}

const alphaAdvantageBaseUrl = (path)=>{
    return `https://alphavantage.co${path}`;
}

const finnhubBaseUrl = (path)=>{
    return `https://finnhub.io/api/v1${path}`
}



const filterStockResultsForTarget = (results, nestedKey)=>{
    let counter = 0;
    let foundResults = [];
    while(counter < results.length && foundResults.length < STOCK_TICKERS.length){
        let checkResult = results[counter];
        const stockTicker = checkResult[nestedKey];
        console.log(stockTicker)
        if(STOCK_TICKERS.includes(`${stockTicker}`.toLowerCase())){
            foundResults.push(checkResult);
        }
        counter = counter + 1;
    }
    return {
        targetResults:foundResults,
        otherResults:results
    }
}

const fetchStockSymbolInfo = async (ticker)=>{
    const { symbol , name , icon  } = ticker;
    const useUrl = finnhubBaseUrl('/quote')
    //Built with 5 call limit in mind 
    let dt = await axios.get(useUrl,{
        params:{
        symbol:symbol,
        token:process.env.NUXT_ENV_FINNHUB_API_KEY,
        },
        headers:{
            'Content-Type':'application/json',
        }
    }).then(axiosResponse=>{
        return {
            tickerSymbol:symbol,
            companyName:name,
            tickerIcon:icon,
            tickerData:axiosResponse.data,
        };
    }).catch(err=>{
        console.log(err)
        return false;
    });
    return dt
    
}

const fetchAllStockSymbolInfo = async ({start, end,  callbackFunction, res , useCallback})=>{
    const useList = [...STOCK_TICKERS].slice(start, end)
    const fetchList = useList.map((item,index)=>{
        return fetchStockSymbolInfo(item)
    })
    
    if(useCallback === true){
        Promise.all([...fetchList]).then((vals)=>{
            callbackFunction(vals)
       });
    }else{
       let resolvedDt = Promise.all([...fetchList]).then((vals)=>{
        return vals;
       });
       return resolvedDt;
    }   
}


const fetchMarketNews = async ({category, paginationId})=>{
    const useUrl = finnhubBaseUrl(`/news`);
    const dt = await axios.get(useUrl, {
        params:{
            category,
            minId:paginationId,
            token:process.env.NUXT_ENV_FINNHUB_API_KEY,
        }
    }).then(response=>{
        return response.data;
    }).catch(err=>{
        return false
    });
    return dt
}


export { 
    filterStockResultsForTarget,
    fetchStockSymbolInfo,
    fetchAllStockSymbolInfo,
    fetchMarketNews,
}