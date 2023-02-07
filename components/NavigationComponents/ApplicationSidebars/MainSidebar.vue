<template>
        <div :class="c_Class.parentClass">
            <b-container fluid class="w-100 d-flex flex-column pt-3 application-sidebar-inner">
                <div class="w-100 d-flex align-items-center justify-content-between application-header-wrapper">
                    <AppLogo/>
                    <span style="cursor:pointer;user-select:none;" @click="sidebarMenuClick">
                        <span class="material-symbols-outlined">
                            menu
                        </span>
                    </span>
                </div>
                <div v-if="componentLoading !== true" class="w-100 mt-4 app-sidebar-content" >
                    <div class="w-100">
                        <span class="app-sidebar-text">
                            User Panel
                        </span>
                    </div>
                    <div class="w-100 mt-2">
                            <div class="w-100 d-flex flex-column">
                                <div class="app-sidebar-text sidebar-navigation-link sidebar-navigation-link-active">
                                    <span class="material-symbols-outlined">
                                        dashboard
                                    </span>
                                    
                                    <span class="ml-3">
                                        Dashboard
                                    </span>
                                </div>
                                <div class="app-sidebar-text sidebar-navigation-link mt-2">
                                    <span class="material-symbols-outlined">
                                        work
                                    </span>
                                   <span class="ml-3">
                                        Portfolio
                                   </span>
                                </div>
                                <div class="app-sidebar-text sidebar-navigation-link mt-2">
                                    <span class="material-symbols-outlined">
                                        discover_tune
                                    </span>
                                   <span class="ml-3">
                                        Trading & Market
                                   </span>
                                </div>
                                <div class="app-sidebar-text sidebar-navigation-link mt-2">
                                    <span class="material-symbols-outlined">
                                        all_inbox
                                    </span>
                                   <span class="ml-3">
                                        Research Portal
                                   </span>
                                </div>
                                <div class="app-sidebar-text sidebar-navigation-link mt-2">
                                    <span class="material-symbols-outlined">
                                        currency_exchange
                                    </span>
                                   <span class="ml-3">
                                        Transactions
                                   </span>
                                </div>
                            </div>
                    </div>
                </div>
            </b-container>
            <div v-if="componentLoading === true" class="application-loader"></div>
        </div>
</template>

<script>
import AppLogo from '~/components/Branding/AppLogo.vue';


export default {
    components:{
        AppLogo,

    },
    props:[
        'sidebarOverride',
        'componentLoading'
    ],
    emits:[
        'sidebarChanged'
    ],
    data(){
        return {
            sidebarOpen:false,
            c_Class:{
                parentClass:"application-sidebar",
            }
        }
    },
    watch:{
        sidebarOverride(newVal,oldVal){
            this.sidebarOpen = newVal;
            this.toggleSidebar(newVal)
        }
    },
    mounted(){  
        this.sidebarOpen = this.sidebarOverride;
        this.toggleSidebar(this.sidebarOpen)
    },
    methods:{
        sidebarMenuClick(){
            const nowState = this.sidebarOpen;
            if(nowState === true){
                this.toggleSidebar(false)
            }else{
                this.toggleSidebar(true)
            }
        },
        toggleSidebar(state){
            this.sidebarOpen = state
            this.$emit('sidebarChanged', state, )
            this.setSidebarClass(state)
        },
        setSidebarClass(state){
            let useClass = "application-sidebar";
            const  disabledStateClass = "application-sidebar-disabled";
            const activeStateClass = "application-sidebar-active";
            if(state === false){
                useClass = useClass + " " + disabledStateClass;

            }else{
                useClass = useClass + " " + activeStateClass ;
            }
            this.c_Class.parentClass = useClass;
        }
    },

}
</script>

<style scoped>
    .application-sidebar{
        position:fixed;
        top:0;
        left:0%;
        bottom:0;
        width:15%;
        background:var(--app-beige-color);
        transition:0.3s ease-in-out;
        z-index:99;
    }

    .application-sidebar-inner{
        position:relative;
    }

    .application-loader{
        position:absolute;
        bottom:0%;
        left:0%;
        width:100%;
        height:5px;
        background:var(--app-purple-dark-color)
    }

    .application-sidebar-disabled{
        left:-15%;
    }

    
    .application-sidebar-active{
        height:100%;
        left:0%;
    }

    .app-sidebar-content{
        display:flex;
        flex-direction:column;
        transition:0.3s ease-in-out;
    }

    .app-sidebar-text{
        color:var(--app-grey-text-color)
    }

    .sidebar-navigation-link{
        padding:0.8em 0.6em;
        font-size:var(--app-text-base);
        font-weight:600;
        font-family:var(--app-text-font);
        cursor:pointer;
        display:flex;
        align-items:center;
        gap:0.4em;
    }

    .sidebar-navigation-link-active{
        color:var(--app-purple-dark-color);
        background:var(--app-primary-light-color);
        border-radius:var(--app-stndrd-radius);
        border:1px solid var(--app-grey-base-color)
    }

    @media(max-width:992px){
        .application-sidebar{
            position:fixed;
            width:100%;
            height:fit-content;
        }

        .application-sidebar-active{
            height:100%;
            left:0%;
        }

        .application-sidebar-disabled{
            left:0%;
            height:fit-content;
        }

        .application-sidebar-disabled .app-sidebar-content{
            display:none;
        }
        

        .application-sidebar-active  .app-sidebar-content{
            animation:sideBarMenuHide 0.6s linear forwards;
        }

        
        @keyframes sideBarMenuHide {
            0%{
                display:flex;
                flex-direction:column;
                transform:translateY(60%);
                opacity:0;
            }
            25%{
                transform:translateY(20%);
                opacity:0.3;
            }
            50%{
                transform:translateY(15%);
                opacity:0.65;
            }
            75%{
                transform:translateY(5%);
                opacity:0.95;
            }
            100%{
                opacity:1;
            }
        }

    }
</style>