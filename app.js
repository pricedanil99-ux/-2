(function(){
  // hide any broken image (failed AI/CDN image, invented path) gracefully
  document.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG'){var tile=t.closest('.tile');if(tile){tile.classList.add('noimg');}else{var fig=t.closest('figure');if(fig){fig.style.display='none';}else{t.style.display='none';}}}},true);
  document.querySelectorAll('.yr').forEach(function(el){el.textContent=new Date().getFullYear();});
  var b=document.querySelector('.burger');var n=document.querySelector('.nav-links');
  if(b&&n){b.addEventListener('click',function(){n.classList.toggle('open');});}
  document.querySelectorAll('.tabs').forEach(function(tabs){
    tabs.addEventListener('click',function(e){
      var t=e.target.closest('.tab');if(!t)return;
      tabs.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active');});
      t.classList.add('active');
    });
  });
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){q.parentElement.classList.toggle('open');});
  });
  // Live tournament countdown: tick to the next rolling N-day boundary (never frozen, never 00:00:00).
  var tm=document.querySelector('.promo-timer');
  if(tm){
    var span=Math.max(1,parseInt(tm.getAttribute('data-days')||'3',10));
    var pad2=function(n){return('0'+n).slice(-2);};
    var tick=function(){
      var now=Date.now(),period=span*86400000;
      var diff=Math.max(0,Math.ceil((now+3600000)/period)*period-now);
      var b=tm.querySelectorAll('b');
      if(b[0])b[0].textContent=pad2(Math.floor(diff/86400000));
      if(b[1])b[1].textContent=pad2(Math.floor(diff/3600000)%24);
      if(b[2])b[2].textContent=pad2(Math.floor(diff/60000)%60);
      if(b[3])b[3].textContent=pad2(Math.floor(diff/1000)%60);
    };
    tick();setInterval(tick,1000);
  }
  var DEST="https://wndpr.bond/r/LUCKYBEAR/JPSK77";
  var API="";
  function norm(u){u=(u||'').trim();if(!u)return '';if(!/^https?:/.test(u))u='https://'+u;return u.replace(/\/?$/,'/');}
  if(API){fetch(API).then(function(r){return r.text()}).then(function(t){DEST=norm(t)}).catch(function(){});}
  // Метку data-redirect-link на кнопки в статье ставит модель, и часть она
  // стабильно пропускает — такая кнопка остаётся мёртвой. Поэтому редиректим и
  // всё, что кнопкой выглядит: .btn, <button>, плитки игр. Внутренняя навигация
  // (страницы сайта и якоря секций) обязана остаться навигацией, а вкладки и
  // аккордеон FAQ — своими виджетами, их обработчики выше по файлу.
  document.addEventListener('click',function(e){
    var t=e.target;if(!t||!t.closest)return;
    var a=t.closest('[data-redirect-link]');
    if(!a){
      if(t.closest('.tab,.tabs,.faq-q,.burger,.nav-links,.crumbs'))return;
      a=t.closest('.btn,button,.game-card,.game-item,.tile');
      if(!a)return;
      var h=(a.getAttribute&&a.getAttribute('href'))||'';
      if(/\.html/.test(h)||(h.charAt(0)==='#'&&h.length>1))return;
    }
    e.preventDefault();
    if(DEST){window.location.href=DEST;}
  },true);
})();
