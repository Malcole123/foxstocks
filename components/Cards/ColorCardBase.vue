<template>
    <div 
    class="color-card-base"
    :style="cardStyleString"
    >
        <slot name="card_content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </slot>
    </div>
</template>

<script>
export default {
    emits:[
        'cardMounted'
    ],  
    props:[
        'cardUseState',
        'useColorFilter',
        'customId',
        'addShadow'
    ],
    data(){
        return {
            useColor:"appColorPurpleDark",
            cardColors:[
                {
                    cardFilter:'appColorPurpleDark',
                    cssIdentifer:"--app-purple-dark-color",
                    contrastIdentifer:"--app-primary-light-color",
                },
                {
                    cardFilter:'appColorPurpleLight',
                    cssIdentifer:"--app-purple-light-color",
                    contrastIdentifer:"--app-primary-dark-color",
                },
                {
                    cardFilter:'appColorBlueLight',
                    cssIdentifer:"--app-blue-light-color",
                    contrastIdentifer:"--app-primary-dark-color",
                },
                {
                    cardFilter:'appColorYellowLight',
                    cssIdentifer:"--app-yellow-light-color",
                    contrastIdentifer:"--app-primary-dark-color",
                },
                {
                    cardFilter:'appColorBlueBase',
                    cssIdentifer:"--app-blue-base-color",
                    contrastIdentifer:"--app-primary-dark-color",
                },
                {
                    cardFilter:'appColorGreenLight',
                    cssIdentifer:"--app-green-light-color",
                    contrastIdentifer:"--app-primary-dark-color",
                },
                {
                    cardFilter:'appColorDark',
                    cssIdentifer:"--app-primary-dark-color",
                    contrastIdentifer:"--app-primary-light-color",
                },
            ],
            cardStyleString:"",
        }
    },
    watch:{
        cardUseState(newVal, oldVal){
            this.cardStylingObserve();
        }
    },
    mounted(){
        this.cardStylingObserve();
    },
    methods:{
        cardStyling({cardFilter, cssIdentifer, contrastIdentifer}){
            this.useColor = cardFilter;
            const cardBoxShadow = "--app-card-box-shadow";
            const backgroundStyle = ()=>{
                console.log(backgroundStyle)
                return `background-color:var(${cssIdentifer})`;
            }

            const colorStyle = ()=>{
                return `color:var(${contrastIdentifer})`;
            }

            const shadowStyle = ()=>{
               if(this.addShadow === true){
                return `box-shadow:var(${cardBoxShadow})`;
               }else{
                return false
               }
            }
            const agreedStyle = [ backgroundStyle() , colorStyle(), shadowStyle() ].filter(item=>{ return item !== false}).join(";");
            this.cardStyleString = agreedStyle;
        },
        detectSiblingColors(ev){ 
            const indexAssist  = parseInt(this.customId.replaceAll('stock-selection-card-', ''));
            const useIndex = indexAssist - 1 < this.cardColors.length ? indexAssist - 1 : Math.floor((indexAssist%this.cardColors.length) - 1);
            const useOption = this.cardColors[useIndex];
            return useOption
        },
        reverseArray(){
            // Reverses array from original state

            this.cardColors = this.cardColors.reverse()
        },
        cardStylingObserve(){
            let useStyle = null;
            const requestState = this.cardUseState;
            const colorFilter = this.useColorFilter;
            const randomLoad = Math.floor(Math.random()*this.cardColors.length);

            if(requestState === "useRandom"){
                useStyle = this.cardColors[randomLoad]
            }else if(requestState === 'useSpecific'){
                useStyle = this.cardColors.find((item, index)=>{ return item.cardFilter === colorFilter})

            }else if(requestState === 'useList'){
                // Determine if to reverse or not for complexity in UI

                const reverseDecision = Math.floor(Math.random() * 3);
                if(reverseDecision === 0 || reverseDecision === 1){
                    this.reverseArray()
                }
                useStyle = this.detectSiblingColors() || this.cardColors[randomLoad]; 
            }else{
                useStyle = this.cardColors[0];
            }
            if(useStyle === null){ return }
            
            this.cardStyling(useStyle);
            this.$emit('cardMounted', {
                useType:requestState,
                setColor:this.useColor,
            })
        },
    },
}
</script>

<style scoped>
    .color-card-base{
        width:100%;
        border-radius:var(--app-stndrd-radius);
        padding:0.4em 0.6em;
        cursor:pointer;
    }
</style>