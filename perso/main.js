console.log ('branché')

//const url ="https://jsonplaceholder.typicode.com/photos";

const baseUrl ="https://financialmodelingprep.com/"

const apiKet = "?apikey=2c3cb780ec90ad709bf8181966a85413";

const currentPrice = "/api/v3/quote/"

const stockSymboll = "RNO";

let url= baseUrl+currentPrice+stockSymboll+apiKet;
console.log (url)

fetch(url)
    .then (res => res.json())
    .then (datas =>  {
        console.log (datas)

        for (const item of datas){

            console.log (item.price)
            
        }





    })


