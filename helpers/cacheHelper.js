//Created to help prevent api maximum call 
import crypto from 'crypto';
import randomGenerator from 'generate-password';

class cacheControl{
    constructor(props){
        this.props =  props || {};

        const {
            timeoutOverride
        } = this.props;

        this.maxAgeTimeout = timeoutOverride || 60000; // Maximum time a request is valid for in ms
        
        this.cacheObject = {
            setTime:0, 
            setKey:"", // Unique key to identify cache object
            data:{},
            endpoint:"" // enum
        }

        this.statusObjects = {
            errorObject:{
                ok:false,
                message:"An Unknown Error Has Occured "
            }
        }

        this.specialCache = {
            // Expected Data for endpoints
            'home-page-strict':{
                homeTimeOut:1200000,
                'targetResults':{
                    type:Array,
                    default:[],
                    required:true,
                }
            },
        }

        this.specialCacheMemory = {
                homepage:{
                    setTime:1675710510814,
                    maxAge:500000,
                    expires:1675710810814,
                    targetResults:[],
                    marketNews:[],
                }
        }
    }

    cacheControlledRequest(){

    }

    errorHandle(jsonBody){
        if(jsonBody === undefined){
            return this.statusObjects.errorObject;
        }else{
            return jsonBody
        }
    }
    
    getTime(){
        const now = new Date().getTime();
        return now
    }

    checkValidTime(set_time , time_check ){
        const time_diff =  time_check - set_time;
        return time_diff <= this.maxAgeTimeout;
    }

    
    checkResultValidation({nestedVal, testVal , results}){
        if(results === undefined || typeof results !== 'object'){ this.errorHandle()}
        const targetObj = results.find((item)=>{ return item[nestedVal] === testVal});
        if(targetObj === undefined){
            this.errorHandle({
                ok:false,
                message:"Not found / Not Set"
            })
        }
        const now = this.getTime();
        const validResult = this.checkValidTime(targetObj.setTime, now);

        return {
            valid:validResult,
            result:targetObj.data,
        }

    }

    generateCacheSetKey(){
        const secretKey = randomGenerator.generate({
            length:16,
            uppercase:true,
            lowercase:false,
            excludeSimilarCharacters:true,
        })
        return secretKey;
    }


    setSpecialCacheMemory(setKey, { targetResults, marketNews }){
        if(setKey === 'home-page-strict' || setKey === 'home-page'){
            this.setHomeCacheMemory({ targetResults , marketNews});
            
        }
    }

    getHomeCacheMemory(){
        const now = this.getTime();
        const memory = this.specialCacheMemory.homepage;
        const validMemory = this.checkValidTime(memory.setTime , now );
        if(validMemory === false){
            return {
                ok:false,
                message:"Invalid Timeout "
            }
        }else{
            return {
                ok:true,
                data:memory,
            }
        }
    }

    setHomeCacheMemory({ targetResults, marketNews }){
        this.specialCacheMemory.homepage.targetResults = targetResults;
        this.specialCacheMemory.homepage.marketNews = marketNews;
        const setTime = this.getTime();
        this.specialCacheMemory.homepage.setTime = setTime;
        this.specialCacheMemory.homepage.expires = setTime + this.specialCacheMemory.homepage.maxAge;
    }

}


class finnhubCacheControl extends cacheControl {
        constructor(props){
            super(props);
            this.call_endpoints = [ 'quote' ] // Endpoints being accessed by home
            this.cache_max_length = 60; // Maximum number of items to store in array 
            this.cache_results = []; //Cache for stockets
            this.market_news_cache = {

            }
        }

            
    checkValidEndpoint(endpoint){
        //Checks if an endpoint is cache controlled by class
        return this.call_endpoints.includes(endpoint)
    }

    getResult({endpointKey}){
        //Gets most recent valid result
        const result = [...this.cache_results].find((item)=>{ 
            const validEndpointObjecTest = this.checkResultValidation({
                nestedVal:'endpoint',
                testVal:endpointKey,
                results:this.cache_results,

            })
            return validEndpointObjecTest.ok === true || validEndpointObjecTest.valid === true;
        });
        if(result === undefined){
            return this.errorHandle()
        }
        return result
    }
    
    setFinnCacheResult({endpointKey, setData}){
        const allowed = this.checkValidEndpoint(endpointKey);
        if(allowed === false){  
            this.errorHandle()
        return 
    }
        let createObj = Object.create(this.cacheObject);
        createObj.setTime = this.getTime();
        const setKey = this.generateCacheSetKey();
        createObj.setKey = setKey;
        createObj.data = setData;
        createObj.endpoint = endpointKey;
        this.cache_results.push(createObj)


        return setKey;
    }

}


export {
    finnhubCacheControl
}