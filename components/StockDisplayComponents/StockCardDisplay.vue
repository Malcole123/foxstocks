<template>
    <ColorCardBase
    :card-use-state="useColorType"
    :use-color-filter="useColorFilter"
    :custom-id="use__id"
    :add-shadow="true"
    @cardMounted="setToStrict"
    >
        <template #card_content>
            <div class="stock-selection-card">
                <div class="w-100 d-flex align-items-center justify-content-between">
                    <div class="w-100 d-flex align-items-center app-spacing-md">
                        <div class="stock-selection-icon">
                            <b-avatar v-if="illustrateType === 'img'"
                            icon="star-fill"
                            variant="dark"
                            :text="stockData.tickerIcon"
                            :src="'http://localhost:3000/assets/img/branding/ticker-logos/amazon-icon.svg'"
                            />
                            <font-awesome-icon v-else :icon="stockData.tickerIcon" color="inherit" style="font-size:inherit"/>
                        </div>
                        <span class="stock-selection-label">
                           {{ cardTitle }}
                        </span>
                    </div>

                    <div class="stock-ticker-info">
                        <span>{{ stockSymbol }}</span>
                        <span class="stock-change-indicator">{{ stockData.changeStr }}</span>
                    </div>
        
                </div>
                <div class="w-100 mt-3">
                    <div class="w-100 d-flex flex-column">
                        <span class="w-100">
                            Current Price:
                        </span>
                        <span class="mt-1 w-100 stock-selection-price">
                            {{  stockData.currentPrice }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </ColorCardBase>
</template>

<script>
import ColorCardBase from '~/components/Cards/ColorCardBase.vue'
export default {
    components:{
        ColorCardBase,
    },
    props:[
        'useId',
        'cardTitle',
        'stockSymbol',
        'highPrice',
        'lowPrice',
        'currentPrice',
        'updatedTime',
        'priceChange',
        'tickerIcon'
    ],
    watch:{
        useId(newVal,oldVal){
            this.use__id = newVal;
        }
    },
    data(){
        return {
            use__id:"",
            useColorType:"useSpecific",
            useColorFilter:"appColorYellowLight",
            illustrateType:"img",
            stockData:{
                tickerIcon:"fa-brands fa-apple",
                tickerImg:"",
                currentPrice:"USD 0",
                changeStr:"",
            }
        }
    },  
    mounted(){
        this.setStockData();
    },
    methods:{
        setStockData(){
            this.stockData.currentPrice = "USD " + this.stockCardStringConverter({addZero:true , value:this.currentPrice});
            const changePriceStr = this.stockCardStringConverter({addZero:true, value:this.priceChange});
            if(changePriceStr.includes('-')){
                this.stockData.changeStr = changePriceStr;
            }else{
                this.stockData.changeStr = `+${changePriceStr}`
            }
            this.tickerIconInterpret();
        },
        stockCardStringConverter({ addZero , value }){
            if(value === null ){ return ""}
            const checkUnitStr  = `${value.toFixed(2)}`;
            const checkUnitArr = checkUnitStr.split('.');
            if(checkUnitArr.length < 2 && addZero === true){
                return value + ".00"
            }
            const base = checkUnitArr[0];
            let decimal = checkUnitArr[1];
            
            const strSep = "&_&"
            const useString = [ base , decimal ].filter(item=>{ return item !== undefined }).join(strSep);

            if(addZero !== true){
                return useString
            }
            const memoryDecimal = decimal;
            try{
                decimal = decimal.length <= 1 ? decimal + "0" : decimal;
            }catch(err){
                return "";
            }
            const zeroedString = useString.replaceAll(`${strSep}${memoryDecimal}`, `.${decimal}`)
            return zeroedString
        },
        setToStrict({setColor, useType}){
            this.useColorType = useType;
            this.useColorFilter = setColor;
        },
        tickerIconInterpret(){
            const { 
           
                use, 
            } = this.tickerIcon;
            this.illustrateType = use;
            this.stockData.tickerIcon = this.tickerIcon.font_awesome;
            // this.stockData.tickerImg = img;

        }
    }
}
</script>

<style scoped>

    /* Width 100% to be controlled by javascript in slider or parent wrapper */
    .stock-selection-card{
        width:100%;
        height:10em;
        color:inherit;
    }

    .stock-selection-icon{
        font-size:var(--app-text-xl)
    }

    .stock-selection-label{
        font-size:var(--app-text-base);
        font-weight:600;
        color:inherit;
        display: -webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient: vertical; 
        width:70%;
        overflow: hidden;
            }

    .stock-ticker-info{
        margin-left:auto;
        width:fit-content;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-end;
        gap:0.3em;
    }

    .stock-change-indicator{
        font-size:var(--app-text-md);
        font-weight:600;
    }

    .stock-selection-price{
        font-size:var(--app-text-lg);
        font-weight:600;
    }
</style>