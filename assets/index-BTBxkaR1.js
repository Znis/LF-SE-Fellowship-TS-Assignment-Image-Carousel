var G=Object.defineProperty;var O=(e,t,s)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var o=(e,t,s)=>(O(e,typeof t!="symbol"?t+"":t,s),s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const a=document.getElementById("image-carousel__img-wrapper"),y=document.getElementById("image-status-count"),g=document.getElementById("arrow-right"),I=document.getElementById("arrow-left");var l=0;let P=2e3;const L=5;let v=100,n=parseInt(a.style.left)||0,w=!1,u,d;function S(){n=parseInt(a.style.left)||0,(n>0||n%100!=100)&&(n=n>0?0:n,n+=n%100,a.style.left=`${n}%`)}function m(e){S(),v=(e-l)*100;const t=n;d=setInterval(()=>{Math.abs(n-t)>=Math.abs(v)?clearInterval(d):v>0?n+=L:n-=L,a.style.left=`${-1*n}%`;for(let s=0;s<h.length;s++)E[s].updateGlowStatus()},1)}function f(){u=setInterval(()=>{l<h.length-1?(m(l+1),l++):(m(0),l=0);for(let e=0;e<h.length;e++)E[e].updateGlowStatus()},P)}g==null||g.addEventListener("click",()=>{l<h.length-1&&(clearInterval(u),clearInterval(d),m(l+1),l++,f())});I==null||I.addEventListener("click",()=>{l>0&&(clearInterval(u),clearInterval(d),m(l-1),l--,f())});class b{constructor(t,s,c){o(this,"w");o(this,"h");o(this,"src");o(this,"element");this.w=t||100,this.h=s||100,this.src=c||"",this.element=document.createElement("img"),this.element.setAttribute("src",this.src),this.element.style.minWidth=`${this.w}%`,this.element.style.minHeight=`${this.h}%`,this.element.style.objectFit="contain",this.element.style.zIndex="1",this.element.addEventListener("mouseover",()=>{clearInterval(u),w=!0}),this.element.addEventListener("mouseout",()=>{w&&f(),w=!1})}}class ${constructor(t,s,c,i){o(this,"id");o(this,"w");o(this,"h");o(this,"color");o(this,"element");this.id=t,this.w=s,this.h=c,this.color=i,this.element=document.createElement("div"),this.element.style.width=`${this.w}px`,this.element.style.height=`${this.h}px`,this.element.style.background=this.color,this.element.style.borderRadius="50%",this.element.style.opacity="0.5",this.element.style.zIndex="2",this.element.style.cursor="pointer",this.element.addEventListener("mouseover",()=>{this.glow(),this.element.style.scale="1.4"}),this.element.addEventListener("mouseout",()=>{this.resetGlow(),this.element.style.scale="1"}),this.element.addEventListener("click",()=>{clearInterval(u),clearInterval(d),m(this.id),l=this.id,this.updateGlowStatus(),f()}),this.updateGlowStatus()}updateGlowStatus(){l==this.id?this.glow():this.resetGlow()}glow(){this.element.style.opacity="1"}resetGlow(){this.element.style.opacity="0.5"}}const A=[1,2,3,4,5,6,7,8],h=A.map(e=>`images/${e}.jpg`),E=[];for(let e=0;e<h.length;e++){const t=new b(100,100,h[e]),s=new $(e,8,8,"white");E.push(s),a==null||a.appendChild(t.element),y==null||y.append(s.element)}f();
