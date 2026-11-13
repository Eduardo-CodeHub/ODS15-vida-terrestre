window.addEventListener('DOMContentLoaded',function(){
  var D=window.ODS15,nav=document.getElementById('nav'),mb=document.getElementById('menu');
  if(mb)mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
  // contadores calculados a partir de data.js (sem números inventados)
  var vals={total:D.animais.length,CR:0,EN:0,VU:0};
  D.animais.forEach(function(a){if(vals[a.risco]!==undefined)vals[a.risco]++});
  var reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-count]').forEach(function(el){
    var alvo=vals[el.dataset.count]||0;
    if(reduz){el.textContent=alvo;return}
    var t0=null;(function passo(t){t0=t0||t;var p=Math.min((t-t0)/900,1);el.textContent=Math.round(alvo*p);if(p<1)requestAnimationFrame(passo)})(performance.now());
  });
  var top=document.getElementById('top');
  if(top){addEventListener('scroll',function(){top.classList.toggle('show',scrollY>500)});top.onclick=function(){scrollTo({top:0})}}
});