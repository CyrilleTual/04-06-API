console.log ('branché')
//const url ="https://jsonplaceholder.typicode.com/photos";
const baseUrl ="https://financialmodelingprep.com/"
const apiKet = "?apikey=2c3cb780ec90ad709bf8181966a85413";
const currentPrice = "/api/v3/quote/"
const stockSymboll = "AAPL";

let url= baseUrl+currentPrice+stockSymboll+apiKet;

// function quote(){
//     let quote = getquote();
//     console.log (quote);
// }


// function getquote(){
//     fetch(url)
//     .then (res => res.json())
//     .then (datas =>  {
//         for (const item of datas){
//             console.log (item.price)
//         }
//     })
// }

// quote();

async function quote(){
    let quote = await fetch(url)
    .then (res => res.json())
    .then (datas =>  {
        for (const item of datas){
            console.log (item.price) //ok 
            return (item.price)
        }
    })
    console.log(quote); // ok 
    return (quote);
}

let result =  quote();
result.then(re => console.log(re));





