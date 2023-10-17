var json = [];

async function pobierz() {
  const data = await fetch('http://192.168.56.1/wordpress_bs/wp-json/wp/v2/posts');
  json = await data.json();
  //console.log(json);
}
pobierz();

async function komentarze(){
  const data = await fetch(`http://192.168.56.1/wordpress_bs/wp-json/wp/v2/comments`);
  const json = await data.json();

  if (json.length > 0) {
    for (let i in json) {
        const miejsce = document.getElementById("ogol")
        const divkom = document.createElement("div")
        divkom.setAttribute("id", `divik${i}`)

        const gora = document.createElement("div")
        gora.setAttribute("id", "gora")

        const dol = document.createElement("div")
        dol.setAttribute("id", "dol")

        const button = document.createElement("button")
        button.addEventListener('click', ()=>{
          zrob(json[i].id)
        })


        gora.innerHTML=json[i].content.rendered
        dol.appendChild(button)
        divkom.appendChild(gora)
        divkom.appendChild(dol)
        miejsce.appendChild(divkom)


      if(json[i].content.rendered.includes("Kupa"||"kupa")){
        const divos = document.getElementById(`divik${i}`)
        divos.style.backgroundColor="red"
      }
    }
  } 
}komentarze()



function zrob(id){
 //tworzymy polecenie
 const url = new URL(`http://192.168.56.1/wordpress_bs/wp-json/wp/v2/comments/${id}`)
 
   fetch(url,{
     method: 'DELETE',
     headers: {
       authorization: `Basic ${btoa("mrbartek:B4rt3k20071024!@")}`
     }
   })
}
