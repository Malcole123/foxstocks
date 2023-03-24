import { STOCK_TICKERS } from "~/resources/market";


class FinancialEntity {

    // Sign key used to validate each entity to ensure unique
    #signKey = "";
    constructor(props){
        this.props = props || {};

        const {
            name ,
            symbol, 
            currency,
            start_price,
            risk_level,
        } = this.props;

        // Used to measure an entities reaction to change
      this.allVolatilityLevels = [
        {
            level:"SCAM",
            movementRange:[
                {
                     
                }
            ],  
        },
        {
            level:"HIGH_VOLATILITY",
            movementRange:[],
        },
        {
            level:"AVERAGE_VOLATILITY",
            movementRange:[],
        },
        {
            level:"LOW_VOLATILITY",
            movementRange:[],
        },
        {
            level:"STABLE",
            movementRange:[],
        },
        {
            level:"EXTREME_SECURITY",
            movementRange:[],
        },
      ]

      // Details about a financial entity 
      this.entityInfo = {
            entityName:name,
            entitySymbol:symbol,
            entityUnitPrice:start_price,
            entityUnitCurrency:currency,
      }

      //
      this.entityPrivateInfo = {
        entityRiskLevel:risk_level,
      }

      // 
      this.entityMovement = {
            movementTypes:[
                'inc_',
                'dec_',
            ]
      }

      this.entityTradingStatus = [
        'active_trading',
        'trading_closed',
        'trading_paused',
      ]

      this.createCheck();

      
    }

    createCheck(){
        const validRiskLvlCheck = this.checkValidVolatilityLevel(this.entityPrivateInfo.entityRiskLevel);
        const validSymbolAddCheck = this.checkValidFinancialEntity('stock', {
            finSymbol:this.entityInfo.entitySymbol,
            name:this.entityInfo.entityName,
        })
        const mandatoryCheckArray = [ validRiskLvlCheck , validSymbolAddCheck ];

    }

    checkValidVolatilityLevel(level){
        return this.allVolatilityLevels.includes(level);
    }

    checkValidFinancialEntity(type, { finSymbol , name }){
        if(type === 'stock'){
            return [...STOCK_TICKERS].filter(item=>{ return item.symbol === finSymbol || item.name === name})
        }else{

        }
    }
    
    entityMove(type){
        // Average stock moves
        const validMove = this.entityMovement.movementTypes.includes(type);
        if(validMove === false){ return false }
        
    }

    calculateMovement(entityVolatilty){

    }

    getMovementRange(entityVolatilty){
        const useRange = this.allVolatilityLevels.find(item=>{ return item.level === entityVolatilty});
        if(useRange === undefined){ 
            //Error handle
            return 
        }
        return useRange.movementRange;
    }
    
    entityPriceChange({price, currency}){
        this.entityInfo.entityUnitPrice = price || this.entityInfo.entityUnitPrice;
        this.entityInfo.entityUnitCurrency = currency || this.entityInfo.entityUnitCurrency;
        return {
            updatedPrice:{
                price,
                currency,
            }
        }
    }
}


class Stock extends FinancialEntity {
    constructor(props){
        this.props = props || {};
        const { 
            tickerSymbol,
            tickerName,
            tickerPrice,
        } = this.props;

        super({
            name:tickerName,
            symbol:tickerSymbol,
            start_price:tickerPrice.amount,
            currency:tickerPrice.currency,
        })
    }
}


class Crypto extends FinancialEntity{
    constructor(props){
        this.props = props || {};
        super(this.props);

    }
}