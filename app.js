var jsonk = []

async function komentarze(){
  const data = await fetch(`http://192.168.8.191/wordpress/wp-json/wp/v2/comments`);
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
        button.addEventListener('click', ()=>{
          zrob(jsonk[j].id)
        })

        const idkom = jsonk[j].post
        const url = await fetch(`http://192.168.8.191/wordpress/wp-json/wp/v2/posts/${idkom}`)
        const dane = await url.json()

        if(dane.title){
          goragora.innerHTML=dane.title.rendered
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
 const url = new URL(`http://192.168.8.191/wordpress/wp-json/wp/v2/comments/${id}`)
 
   fetch(url,{
     method: 'DELETE',
     headers: {
       authorization: `Basic ${btoa("mrbartek:B4rt3k20071024!@")}`
     }
   })
}
