import { COUNTRY_RESTRICT } from '../resources/restrictions'

const restrictCountryMiddleware = (req, res, next )=>{
    console.log('hit middleware restrict')
    const requestCountry = req.params.use_country;
    if(COUNTRY_RESTRICT.includes(requestCountry.toLocaleUpperCase()) === true){
        next()
    }else{
        res.status(401).send({
            ok:false,
            error_msg:'INVALID_COUNTRY_IDENTIFIER',
        });
        return 
    }
}


export { 
    restrictCountryMiddleware,
}