let flags = document.querySelector(".flags")
let h1 = document.querySelector("h1")
let h2 = document.querySelector("h2")
let h3 = document.querySelector("h3")
let li = document.querySelector(".imge")

let arr = [];
let ball = 0

async function images (){
    let datas = await fetch ("https://flagcdn.com/en/codes.json")
    let imgs = await datas.json()

    let s = 0;
    let x = {};
    let word = []
    let names = []
   

    for (let i in imgs){
        if (
            !i.includes("us-") &&
            i != "eu" && 
            i != "um" && 
            i != "un" 
           ){

            if (s==8){
                arr.push( x );
                x = {};
                s=0;
            }

            else {
                x[i]=imgs[i];
                s++;    
            }
        } 
    }
       
    let nw = arr[Math.random() * 27 | 2]
    let answer = (Math.random()*0.8).toFixed(2)[2]

    for (let i in nw){
       word.push(i)
       names.push(nw[i]);
    }



    h2.innerText = ""
    h3.innerText = ball
    h2.innerText = names[+answer]

    flags.innerHTML = ""
    flags.classList.remove("true","false")

    for (let i of word){
        
        let li = document.createElement("li")
        
        li.innerHTML = `<img src="./flag/${i}.png" class="imge" alt="flag"></img>`
        flags.append(li)
        
        
        li.addEventListener("click",()=>{
        
            if (li.childNodes[0].src.includes(word[answer])){
                     ball++
                     li.childNodes[0].classList.toggle("true")
                    }
            else {
                li.childNodes[0].classList.toggle("false")
                flags.childNodes[answer].childNodes[0].classList.add("find")
            }
            setTimeout(()=>{
                images()
            },2000)
        })
    }
    
}

images()
