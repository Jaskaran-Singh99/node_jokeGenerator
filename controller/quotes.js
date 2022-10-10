const request = require('request')
const fs = require('fs')

const homefile = fs.readFileSync('./public/home.html').toString()

const replaceSingleJoke  = (tempValue, originalValue)=>{
    const newValue =  tempValue.replace('{%jokes%}', originalValue.joke)
    return newValue
}

const homePage = (req, res)=>{
    console.log('Hello go to localhost:3000/jokes')
    fs.readFile('./public/home.html', (err, data)=>{   
        res.write(data)
        res.end()
    })
}

const fetchJoke = (req, res)=>{
    if(req.url == '/jokes'){
        request('https://v2.jokeapi.dev/joke/Any?type=single&safe-mode')
        .on('data', (chunk)=>{
            const parsedData = JSON.parse(chunk)
            const arrayData = [parsedData]
            console.log(parsedData.joke)

            const replaceData = arrayData.map((value)=>{
                return replaceSingleJoke(homefile, value)
            }).join('')

            res.send(replaceData)
            
            
        })
        .on('end', ()=>{
            res.end()
        })
    }
    else{
        res.status(500).json({msg:'Sorry something unexpected happened'})
    }
}

module.exports = {fetchJoke, homePage}