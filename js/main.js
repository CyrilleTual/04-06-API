import { toDisplay } from "./display.js";
import { lastWeek } from "./fetchFunctions.js";


async function trending (){
    let result = await lastWeek();
    toDisplay(result)
}

document.addEventListener('DOMContentLoaded',()=>{
    trending()
})