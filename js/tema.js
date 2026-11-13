(function(){
  var r=document.documentElement,s=null;
  try{s=localStorage.getItem('tema')}catch(e){}
  r.dataset.theme=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  window.addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('tema');if(!b)return;
    function label(){b.textContent=r.dataset.theme==='dark'?'Modo claro':'Modo escuro'}
    label();
    b.addEventListener('click',function(){
      r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';
      try{localStorage.setItem('tema',r.dataset.theme)}catch(e){}
      label();
    });
  });
})();