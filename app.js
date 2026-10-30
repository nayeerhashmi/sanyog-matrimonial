const sampleProfiles = [
  {name:"Aaliya R.",age:27,district:"Srinagar",profession:"Architect",education:"Master's degree",language:"Kashmiri",tone:1,symbol:"ع",note:"Values kindness and curiosity"},
  {name:"Kabir S.",age:29,district:"Jammu",profession:"Civil Engineer",education:"Bachelor's degree",language:"Dogri",tone:2,symbol:"क",note:"Enjoys mountains and family time"},
  {name:"Meher F.",age:26,district:"Poonch",profession:"Teacher",education:"Master's degree",language:"Pahari",tone:3,symbol:"م",note:"Believes in growing together"},
  {name:"Aarav K.",age:30,district:"Udhampur",profession:"Doctor",education:"Medical degree",language:"Hindi",tone:2,symbol:"अ",note:"Quiet weekends and meaningful talks"},
  {name:"Zoya N.",age:28,district:"Anantnag",profession:"Researcher",education:"Master's degree",language:"Urdu",tone:3,symbol:"ز",note:"Curious about people and places"},
  {name:"Rohan D.",age:29,district:"Baramulla",profession:"Entrepreneur",education:"Bachelor's degree",language:"Kashmiri",tone:1,symbol:"र",note:"Grounded, warm, and optimistic"},
  {name:"Tsering L.",age:28,district:"Leh",profession:"Researcher",education:"Master's degree",language:"Ladakhi",tone:2,symbol:"ལ",note:"Values curiosity and the outdoors"},
  {name:"Ananya S.",age:27,district:"Kangra",profession:"Designer",education:"Bachelor's degree",language:"Hindi",tone:3,symbol:"अ",note:"Creative, thoughtful, and family-minded"}
];
const grid=document.querySelector("#profileGrid"),searchInput=document.querySelector("#searchInput"),districtFilter=document.querySelector("#districtFilter"),dialog=document.querySelector("#noticeDialog");
function renderProfiles(){
 const query=searchInput.value.trim().toLowerCase(),district=districtFilter.value;
 const filtered=sampleProfiles.filter(p=>[p.name,p.district,p.profession,p.education,p.language].some(v=>v.toLowerCase().includes(query))&&(district==="all"||p.district===district));
 if(!filtered.length){grid.innerHTML='<div class="empty-state">No demo profiles match those filters. Try another district or search term.</div>';return;}
 grid.innerHTML=filtered.map(p=>`<article class="profile-card"><div class="profile-visual tone-${p.tone}"><span class="profile-chip">FICTIONAL SAMPLE</span><span class="avatar-symbol" aria-hidden="true">${p.symbol}</span></div><div class="profile-body"><h3>${p.name}, ${p.age}</h3><div class="profile-meta">${p.district} · ${p.profession}</div><div class="profile-details"><span>${p.education}</span><span>${p.language}</span></div><div class="profile-foot"><small>${p.note}</small><button class="interest-button" type="button" data-interest="${p.name}">♡ Express interest</button></div></div></article>`).join("");
 grid.querySelectorAll("[data-interest]").forEach(button=>button.addEventListener("click",()=>showNotice("Interest requests aren't active yet. These are fictional sample profiles; no request has been sent.")));
}
function showNotice(message){dialog.querySelector("p").textContent=message||"This is an early visual prototype. Accounts and registration are not connected yet, so please don't submit personal information.";if(typeof dialog.showModal==="function")dialog.showModal();else alert(message||"Prototype only. Registration is not active.");}
searchInput.addEventListener("input",renderProfiles);districtFilter.addEventListener("change",renderProfiles);
["joinButton","heroJoin","closingJoin"].forEach(id=>{const link=document.getElementById(id);if(link)link.addEventListener("click",event=>{event.preventDefault();window.location.href="profile-setup.html";});});
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());document.getElementById("acknowledgeDialog").addEventListener("click",()=>dialog.close());
const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();renderProfiles();




// Account avatar shortcut. Signed-in members go straight to their dashboard.
const accountAvatar = document.getElementById("accountAvatar");
if (accountAvatar && window.supabase) {
  try {
    const accountClient = window.supabase.createClient(
      "https://eoziavhnktcsqmtnfuhz.supabase.co",
      "sb_publishable_j1jUq-wkJmt6v_VrHvyimQ_hHu0vSMa"
    );
    const updateAccountAvatar = async () => {
      const { data: { session } } = await accountClient.auth.getSession();
      const initial = document.getElementById("avatarInitial");
      if (session) {
        const meta = session.user.user_metadata || {};
        const first = (meta.first_name || meta.display_name || session.user.email || "M").trim();
        const last = (meta.last_name || "").trim();
        initial.textContent = (first[0] + (last ? last[0] : "")).toUpperCase();
        accountAvatar.href = "dashboard.html";
        accountAvatar.classList.add("signed-in");
        accountAvatar.setAttribute("aria-label", "Open your Sanyog dashboard");
        accountAvatar.title = "Open dashboard";
      } else {
        initial.textContent = "♙";
        accountAvatar.href = "auth.html";
        accountAvatar.classList.remove("signed-in");
        accountAvatar.setAttribute("aria-label", "Log in to your Sanyog account");
        accountAvatar.title = "Log in";
      }
    };
    updateAccountAvatar();
    accountClient.auth.onAuthStateChange(() => updateAccountAvatar());
  } catch (error) {
    console.warn("Account shortcut could not be initialised.", error);
  }
}

// Progressive Web App support. The service worker caches only public static files.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Sanyog offline support could not be registered.", error));
  });
}
