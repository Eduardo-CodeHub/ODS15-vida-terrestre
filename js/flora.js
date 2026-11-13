(function(){
  var tabs=document.querySelectorAll('.tab'),panels=document.querySelectorAll('.panel');
  if(!tabs.length)return;
  function abrir(id,foco){
    tabs.forEach(function(t){var on=t.dataset.p===id;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;if(on&&foco)t.focus()});
    panels.forEach(function(p){
      p.hidden=p.id!==id;
      if(p.hidden)p.querySelectorAll('video').forEach(function(v){v.pause()});
    });
    history.replaceState(null,'','#'+id);
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){abrir(t.dataset.p)});
    t.addEventListener('keydown',function(e){
      var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
      if(d)abrir(tabs[(i+d+tabs.length)%tabs.length].dataset.p,true);
    });
  });
  var h=location.hash.slice(1);
  abrir(document.getElementById(h)&&document.getElementById(h).classList.contains('panel')?h:'reflorestamento');
})();