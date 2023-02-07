import express from 'express';

/*ROUTES */
import marketDataRoute from './market-data';



const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/market-data', marketDataRoute );



app.get('/test', (req, res)=>{
    res.send({ok:true})
})

app.listen( process.env.NUXT_PORT, ()=>{
    console.log('listening on ' + process.env.NUXT_PORT)
})


export default {
    path:'/api',
    handler:app,
}
