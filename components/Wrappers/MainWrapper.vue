<template>
    <div
    :class="c_Class"
    >
    <slot name="sidebar"></slot>
    <slot name="application_content">
        <b-container class="application-wrapper-base">
            <slot name="application_base_content">

            </slot>
        </b-container>
    </slot>
    </div>
</template>

<script>
export default {
    props:[
        'sidebarActive',
    ],
    data(){
        return {
            c_Class:"application-main-wrapper",
            sidebarEnabled:true,
        }
    },
    watch:{
        sidebarActive(newVal, oldVal){
            this.sidebarEnabled = newVal;
            this.setComponentClass();
        }
    },
    mounted(){
        this.sidebarEnabled = this.sidebarActive;
        this.setComponentClass();
    },
    methods:{
        setComponentClass(){
            const menuOpen = this.sidebarEnabled;
            const  useClass = "application-main-wrapper";
            const  noPaddingClass = "disabled-wrapper-padding";
            if(menuOpen === true ){
                this.c_Class = useClass
            }else{
                this.c_Class = useClass + " " + noPaddingClass;
            }
        }
    },

}
</script>

<style scoped>
    .disabled-wrapper-padding{
        padding-left:0px!important;
        padding-right:0px!important;
    }

    .application-wrapper-base{
        transition:0.6s ease-in-out;
        padding-top:30px;
    }
</style>