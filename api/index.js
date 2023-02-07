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


export default {
    path:'/api',
    handler:app,
}
