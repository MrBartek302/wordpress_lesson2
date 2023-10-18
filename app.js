var jsonk = []

async function komentarze(){
  const data = await fetch(`http://192.168.8.191/wordpress/wp-json/wp/v2/comments`);
  jsonk = await data.json();
  console.log(jsonk)

  if(jsonk.length > 0) {
    for (let i in jsonk) {
        const miejsce = document.getElementById("ogol")
        const divkom = document.createElement("div")
        divkom.classList.add("divik")

        const goragora = document.createElement("div")
        goragora.setAttribute("id", `goragora}`)

        const gora = document.createElement("div")
        gora.setAttribute("id", `gora${i}`)

        const dol = document.createElement("div")
        dol.setAttribute("id", "dol")

        const dolprawo = document.createElement("div")
        dolprawo.setAttribute("id", "dolprawo")

        const dollewo = document.createElement("div")
        dollewo.setAttribute("id", "dollewo")

        const button = document.createElement("button")
        button.innerHTML="Delete"
        button.addEventListener('click', ()=>{
          zrob(jsonk[i].id)
        })

        const buttonodp = document.createElement("button")
        buttonodp.innerHTML="Odpowiedz"
        buttonodp.addEventListener('click', async ()=>{
          const kom = document.getElementById(`gora${i}`)
        
          
          if(kom.toLowerCase().includes("kupa")){
            //for(let)
          }else{
            console.log("DOBRZE!")
          }
        })

    
        JsBarcode("#barcode1", "Hi!", {
          textAlign: "left",
          textPosition: "top",
          font: "cursive",
          fontOptions: "bold",
          fontSize: 40,
          textMargin: 15,
          text: "Special"
        });

        const idkom = jsonk[i].post
        const url = await fetch(`http://192.168.8.191/wordpress/wp-json/wp/v2/posts/${idkom}`)
        const json = await url.json()
        //console.log(json)

        if(json.title){
          goragora.innerHTML=json.title.rendered
        }
          
        gora.innerHTML=jsonk[i].content.rendered
        dollewo.appendChild(button)
        dolprawo.appendChild(buttonodp)
        divkom.appendChild(goragora)
        divkom.appendChild(gora)
        divkom.appendChild(dol)
        dol.appendChild(dollewo)
        dol.appendChild(dolprawo)
        miejsce.appendChild(divkom)


        if(jsonk[i].content.rendered.toLowerCase().includes("kupa")){
          divkom.style.backgroundColor="red"
        }
    }
  } 
} 
komentarze()

function zrob(id){
 //tworzymy polecenie
 const url = new URL(`http://192.168.8.191/wordpress/wp-json/wp/v2/comments/${id}`)
 
   fetch(url,{
     method: 'DELETE',
     headers: {
       authorization: `Basic ${btoa("mrbartek:B4rt3k20071024!@")}`
     }
   })
}