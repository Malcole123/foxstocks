const STOCK_TICKERS = [
    // APPLE INC
    {
        symbol:'AAPL',
        name:'Apple Inc',
        icon:{
            use:"icon",
            icon_type:'fontAwesome',
            img:"",
            material:"",
            font_awesome:"fa-brands fa-apple"
        }
    },
    {
        symbol:'AMZN',
        name:'Amazon',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/amazon-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:"KO",
        name:'Coca-Cola Co',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/coca-cola-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'MSFT',
        name:'Microsoft',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'META',
        name:'Meta',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'UPS',
        name:'United Parcel Service, Inc.',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/ups-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'GOOGL',
        name:'Alphabet',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'SHOP',
        name:'Shopify',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'UBER',
        name:'Uber',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'NFLX',
        name:'Netflix',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'SNAP',
        name:'Snap Inc.',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'NVDA',
        name:'NVIDIA',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'TSLA',
        name:'Tesla',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'RIVN',
        name:'Rivian Automotive Group',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'C.PRK',
        name:'CITIGROUP INC',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'C.PRK',
        name:'CITIGROUP INC',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'BAC',
        name:'BANK OF AMERICA',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'WFC',
        name:'Wells Fargo & CO',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'BNS',
        name:'BANK OF NOVA SCOTIA',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'WMT',
        name:'Walmart',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'PSMT',
        name:'PriceSmart , Inc',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'HD',
        name:'Home Depot',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'LOW',
        name:'Lowes Companies Inc',
        icon:{
            use:"img",
            icon_type:'',
            img:"~/assets/img/branding/ticker-logos/microsoft-icon",
            material:"", 
            font_awesome:"" 
        }
    },
    {
        symbol:'COST',
        name:'Costco',
    },
    {
        symbol:'BBY',
        name:'Best Buy',
    },
    {
        symbol:'TGT',
        name:'Target',
    },
    {
        symbol:'PYPL',
        name:'Paypal Holdings',
    },
    {
        symbol:'COIN',
        name:'Coinbase',
    },
]

const tickerSearchByName = (search)=>{
    const searchLength = search.length;
    if(search === null || searchLength === 0){
        return STOCK_TICKERS;
    }
    const tickerMatch = [...STOCK_TICKERS].filter((item, index)=>{
        const { name, symbol } = item;
        const nameLower = name.toLowerCase();
        const searchLower = search.toLowerCase();
        const tickerLower = symbol.toLowerCase();
        const nameSubtring = `${nameLower}`.substring(0, searchLength);
        const tickerSubstring = `${tickerLower}`.substring(0, tickerLower.length);
        return nameLower === searchLower ||  nameSubtring === searchLower || tickerLower === searchLower || tickerSubstring === searchLower;
    }).sort((a,b)=>{ return a.name - b.name})
    return tickerMatch;
}



const stockTickerSearch = ({ searchType , searchQuery })=>{
    let returnData = {}
    if(searchType === 'name'){
        returnData = tickerSearchByName(searchQuery)
    }
    return returnData
}


export { 
    STOCK_TICKERS,
    // Get functions
    tickerSearchByName,
    stockTickerSearch,
}