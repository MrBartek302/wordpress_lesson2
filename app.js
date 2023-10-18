var jsonk = []

async function komentarze(){
  const data = await fetch(`http://192.168.15.11/wordpress_BS/wp-json/wp/v2/comments`);
  jsonk = await data.json();
  console.log(jsonk)

  if(jsonk.length > 0) {
    for (let j in jsonk) {
        const miejsce = document.getElementById("ogol")
        const divkom = document.createElement("div")
        divkom.classList.add("divik")

        const goragora = document.createElement("div")
        goragora.setAttribute("id", "goragora")

        const gora = document.createElement("div")
        gora.setAttribute("id", "gora")

        const dol = document.createElement("div")
        dol.setAttribute("id", "dol")

        const button = document.createElement("button")
        button.innerHTML="Delete"
        button.addEventListener('click', ()=>{
          zrob(jsonk[j].id)
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

        const idkom = jsonk[j].post
        const url = await fetch(`http://192.168.15.11/wordpress_BS/wp-json/wp/v2/posts/${idkom}`)
        const json = await url.json()

        if(json.title){
          goragora.innerHTML=json.title.rendered
        }
          
        gora.innerHTML=jsonk[j].content.rendered
        dol.appendChild(button)
        divkom.appendChild(goragora)
        divkom.appendChild(gora)
        divkom.appendChild(dol)
        miejsce.appendChild(divkom)


        if(jsonk[j].content.rendered.toLowerCase().includes("kupa")){
          divkom.style.backgroundColor="red"
        }
    }
  } 
} 
komentarze()

function zrob(id){
 //tworzymy polecenie
 const url = new URL(`http://192.168.15.11/wordpress_BS/wp-json/wp/v2/comments/${id}`)
 
   fetch(url,{
     method: 'DELETE',
     headers: {
       authorization: `Basic ${btoa("mrbartek:B4rt3k20071024!@")}`
     }
   })
}
