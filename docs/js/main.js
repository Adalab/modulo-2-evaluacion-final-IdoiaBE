const h=document.querySelector(".js-searchText"),g=document.querySelector(".js-searchBtn"),c=document.querySelector(".js-searchList"),l=document.querySelector(".js-favList");let r=[],a=[];const d=()=>{var t;l.innerHTML="";for(const e of a){const s=e.images.jpg.image_url,i=(t=e.titles.find(o=>o.type==="Default"))==null?void 0:t.title,n=e.mal_id;s!=="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?l.innerHTML+=`
            <li id="${n}" class="js-listItem">
                <img src="${s}" alt="${i}">
                <h3 class="saved">${i}</h3>
            </li> 
            `:l.innerHTML+=`
            <li id="${n}" class="js-listItem">
                <img src="https://placehold.co/300x400?text=${i}" alt="${i}">
                <h3 class="saved">${i}</h3>
            </li> 
            `}};function p(t,e){if(t.classList.contains("bookmark")){let s=a.findIndex(i=>i.mal_id===e);if(console.log(s),s===-1){console.log(a);let i=r.find(n=>n.mal_id===e);a.push(i)}}else a=a.filter(s=>s.mal_id!==e);localStorage.setItem("favouritesList",JSON.stringify(a)),d()}const L=()=>{const t=document.querySelectorAll(".js-listItem");for(const e of t)e.addEventListener("click",s=>{let i=s.currentTarget;i.classList.toggle("bookmark");let n=parseInt(s.currentTarget.id);p(i,n)})};function v(t,e,s){t!=="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?c.innerHTML+=`
        <li id="${s}" class="js-listItem">
            <img src="${t}" alt="${e}">
            <h3>${e}</h3>
        </li> 
        `:c.innerHTML+=`
        <li id="${s}" class="js-listItem">
            <img src="https://placehold.co/300x400?text=${e}" alt="${e}">
            <h3>${e}</h3>
        </li> 
        `,L()}function $(t,e){var s;t.innerHTML="";for(const i of e){const n=i.images.jpg.image_url,o=(s=i.titles.find(f=>f.type==="Default"))==null?void 0:s.title,u=i.mal_id;v(n,o,u)}}function j(t){fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(e=>e.json()).then(e=>{r=e.data,$(c,r)})}const y=()=>{let t=h.value;j(t)};g.addEventListener("click",y);const m=localStorage.getItem("favouritesList");m?(a=JSON.parse(m),d()):l.innerHTML="<p>No tienes favoritos guardados aún.</p>";
//# sourceMappingURL=main.js.map
