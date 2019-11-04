const request =require('request')


const forecast=(num1,num2,callback)=>{
    const url='https://api.darksky.net/forecast/95decd1ad185249f7c427248f530f83b/'+num1+','+num2
    // shorthand used
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect to the link",undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location ',undefined)
        }
        else
        { 
           callback(undefined,(body.daily.data[0].summary + "It is currently "+body.currently.temperature+" F out there.This high today is "+ body.daily.data[0].temperatureHigh +"F.,with a low of "+ body.daily.data[0].temperatureLow +" F. There is a "+body.currently.precipProbability+"% chance of rain.")
           )
        }

    })
}


module.exports=forecast