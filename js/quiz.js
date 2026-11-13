(function(){
  var box=document.getElementById('quiz');if(!box)return;
  var Q=window.ODS15.quiz,i=0,pts=0,travado=false;
  function mostrar(){
    if(i>=Q.length){
      box.innerHTML='<h3>Você acertou '+pts+' de '+Q.length+'</h3><p class="fb">'+(pts>=4?'Ótimo resultado. Compartilhe o que aprendeu.':'Releia as páginas do site e tente de novo.')+'</p><button class="btn" id="again">Refazer quiz</button>';
      document.getElementById('again').onclick=function(){i=0;pts=0;mostrar()};return;
    }
    var q=Q[i];travado=false;
    box.innerHTML='<div class="progress"><i style="width:'+(i/Q.length*100)+'%"></i></div><h3>'+(i+1)+'. '+q.p+'</h3><div class="opts">'+q.o.map(function(t,k){return '<button class="opt" data-k="'+k+'">'+t+'</button>'}).join('')+'</div><p class="fb" aria-live="polite"></p><button class="btn" id="next" hidden>'+(i===Q.length-1?'Ver resultado':'Próxima pergunta')+'</button>';
    box.querySelector('.opts').onclick=function(e){
      var b=e.target.closest('.opt');if(!b||travado)return;travado=true;
      var k=+b.dataset.k,ok=k===q.c;if(ok)pts++;
      b.classList.add(ok?'right':'wrong');
      box.querySelectorAll('.opt')[q.c].classList.add('right');
      box.querySelector('.fb').textContent=(ok?'Correto. ':'Não foi dessa vez. ')+q.e;
      var n=document.getElementById('next');n.hidden=false;n.focus();n.onclick=function(){i++;mostrar()};
    };
  }
  mostrar();
})();