(function(){
  var D=window.ODS15,grid=document.getElementById('grid');if(!grid)return;
  var filtro='todos',busca='',dlg=document.getElementById('modal');
  var chips=document.getElementById('chips'),count=document.getElementById('count');
  var tipos=[['todos','Todos']].concat(Object.keys(D.riscos).map(function(k){return[k,D.riscos[k]]}));
  chips.innerHTML=tipos.map(function(t){return '<button class="chip" data-f="'+t[0]+'" aria-pressed="'+(t[0]==='todos')+'">'+t[1]+'</button>'}).join('');
  function render(){
    var lista=D.animais.filter(function(a){
      return (filtro==='todos'||a.risco===filtro)&&(a.nome+a.cient).toLowerCase().indexOf(busca)>-1;
    });
    count.textContent=lista.length+(lista.length===1?' espécie encontrada':' espécies encontradas');
    grid.innerHTML=lista.length?lista.map(function(a){
      return '<button class="card" data-id="'+a.id+'"><img src="'+D.pasta+a.img+'" alt="'+a.nome+'" loading="lazy"><div><h3>'+a.nome+'</h3><em>'+a.cient+'</em><br><span class="badge b-'+a.risco+'">'+D.riscos[a.risco]+'</span></div></button>';
    }).join(''):'<p>Nenhuma espécie encontrada. Limpe a busca ou escolha outro filtro.</p>';
  }
  chips.addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    filtro=b.dataset.f;
    chips.querySelectorAll('.chip').forEach(function(c){c.setAttribute('aria-pressed',c===b)});
    render();
  });
  document.getElementById('busca').addEventListener('input',function(e){busca=e.target.value.toLowerCase().trim();render()});
  grid.addEventListener('click',function(e){
    var c=e.target.closest('.card');if(!c)return;
    var a=D.animais.filter(function(x){return x.id===c.dataset.id})[0];
    dlg.querySelector('.dlg-body').innerHTML='<h2>'+a.nome+'</h2><em>'+a.cient+'</em><br><span class="badge b-'+a.risco+'">'+D.riscos[a.risco]+'</span><p style="margin-top:12px">'+a.texto+'</p><dl><dt>Peso</dt><dd>'+a.peso+'</dd><dt>Comprimento</dt><dd>'+a.comp+'</dd><dt>Dieta</dt><dd>'+a.dieta+'</dd><dt>Ameaça</dt><dd>'+a.ameaca+'</dd></dl>';
    var im=dlg.querySelector('img');im.src=D.pasta+a.img;im.alt=a.nome;
    dlg.showModal();
  });
  dlg.querySelector('.dlg-close').addEventListener('click',function(){dlg.close()});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  render();
})();