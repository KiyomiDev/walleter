const menuBtn=document.querySelector(".sidebar .menu__icon"),pageContainer=document.querySelector(".page__container"),headMenuIcon=document.querySelector(".page__container > .head .menu__icon"),sidbarLogo=document.querySelector(".sidebar .img");menuBtn.addEventListener("click",(e=>{pageContainer.classList.toggle("sidebar-closed"),sidbarLogo.classList.toggle("hide"),menuBtn.classList.contains("open__menu")?menuBtn.className="fa-solid fa-bars menu__icon":menuBtn.className="fa-solid fa-bars-staggered menu__icon open__menu"}));