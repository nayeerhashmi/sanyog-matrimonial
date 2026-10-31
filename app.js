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
const grid=document.querySelector("#profileGrid"),searchInput=document.querySelector("#searchInput"),districtFilter=document.querySelector("#districtFilter");
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

const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();renderProfiles();




// Account avatar dropdown. It preserves the existing header and opens account actions in place.
const accountAvatar = document.getElementById("accountAvatar");
const accountPopover = document.getElementById("accountPopover");
if (accountAvatar && accountPopover && window.supabase) {
  const accountClient = window.supabase.createClient(
    "https://eoziavhnktcsqmtnfuhz.supabase.co",
    "sb_publishable_j1jUq-wkJmt6v_VrHvyimQ_hHu0vSMa"
  );
  const setAccountMenu = async () => {
    const { data: { session } } = await accountClient.auth.getSession();
    const signedIn = Boolean(session);
    const initial = document.getElementById("avatarInitial");
    const popInitial = document.getElementById("popoverInitial");
    const name = document.getElementById("popoverName");
    const email = document.getElementById("popoverEmail");
    const login = document.getElementById("popoverLogin");
    const join = document.getElementById("popoverJoin");
    const logout = document.getElementById("popoverLogout");
    const dashboard = document.getElementById("popoverDashboard");
    const edit = document.getElementById("popoverEdit");
    const settings = document.getElementById("popoverSettings");
    const privacy = document.getElementById("popoverPrivacy");
    if (signedIn) {
      const meta = session.user.user_metadata || {};
      const first = (meta.first_name || meta.display_name || session.user.email || "Member").trim();
      const last = (meta.last_name || "").trim();
      const initials = (first[0] + (last ? last[0] : "")).toUpperCase();
      initial.textContent = initials;
      popInitial.textContent = initials;
      name.textContent = (meta.first_name || meta.display_name || "Your Sanyog account") + (last ? " " + last : "");
      email.textContent = session.user.email || "";
      accountAvatar.classList.add("signed-in");
      login.hidden = true; join.hidden = true; logout.hidden = false;
      dashboard.hidden = false; edit.hidden = false; settings.hidden = false; privacy.hidden = false;
      settings.href = "dashboard.html#settings";
      privacy.href = "dashboard.html#privacy";
      settings.querySelector("small").textContent = "Account and preferences";
      privacy.querySelector("small").textContent = "Manage profile visibility";
    } else {
      initial.textContent = "♙"; popInitial.textContent = "♙";
      name.textContent = "Welcome to Sanyog"; email.textContent = "Log in to manage your profile";
      accountAvatar.classList.remove("signed-in");
      login.hidden = false; join.hidden = false; logout.hidden = true;
      dashboard.hidden = true; edit.hidden = true;
      settings.hidden = false; privacy.hidden = false;
      settings.href = "auth.html";
      privacy.href = "auth.html";
      settings.querySelector("small").textContent = "Sign in to manage preferences";
      privacy.querySelector("small").textContent = "Sign in to manage privacy";
    }
  };
  const closeAccountMenu = () => {
    accountPopover.hidden = true;
    accountAvatar.setAttribute("aria-expanded", "false");
  };
  accountAvatar.addEventListener("click", async () => {
    await setAccountMenu();
    const opening = accountPopover.hidden;
    accountPopover.hidden = !opening;
    accountAvatar.setAttribute("aria-expanded", String(opening));
  });
  document.addEventListener("click", event => {
    if (!accountPopover.contains(event.target) && !accountAvatar.contains(event.target)) closeAccountMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAccountMenu();
  });
  document.getElementById("popoverLogout").addEventListener("click", async () => {
    const { error } = await accountClient.auth.signOut();
    if (error) { alert("Could not log out. Please try again."); return; }
    closeAccountMenu();
    await setAccountMenu();
    window.location.href = "index.html";
  });
  accountClient.auth.onAuthStateChange(() => { setAccountMenu(); });
  setAccountMenu();
}

// Progressive Web App support. The service worker caches only public static files.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Sanyog offline support could not be registered.", error));
  });
}
