/* IDLS preview ranking recovery and explicit save. Does not change production, IDs or storage format. */
'use strict';
(function(){
  const sections=['oregon','economy','panama'];
  const issues=[];
  function safe(s){return esc(String(s));}
  function ensureRankings(){
    if(!state)return;
    const roots=[...document.querySelectorAll('.rank-widget[data-rank]')];
    if(!roots.length){issues.push('No motive-ranking widgets found');return;}
    try{rankUi();}catch(err){console.error('IDLS preview ranking renderer failed:',err);}
    for(const root of roots){
      const id=root.dataset.rank,sec=id.split('_')[0],base=RICH[sec]?.rank;
      const target=root.querySelector('.rank-items');
      if(!base||!target){issues.push(id+': missing ranking choices container');continue;}
      const current=state.fields[id];
      const stored=current?current.split('|'):[];
      const valid=stored.length===base.length&&new Set(stored).size===base.length&&stored.every(v=>base.includes(v));
      const order=valid?stored:base.slice();
      if(target.querySelectorAll('.rank-row').length!==base.length){
        // Deterministic recovery from a failed/deferred UI render. Only write DOM,
        // never overwrite an existing saved ranking or auto-award completion credit.
        target.replaceChildren();
        order.forEach((name,i)=>{
          const row=document.createElement('div');row.className='rank-row';
          row.innerHTML='<strong>'+(i+1)+'</strong><span>'+safe(name)+'</span>'+
            '<button type="button" data-rank-move="'+safe(id)+'" data-idx="'+i+'" data-dir="-1" '+(i===0?'disabled':'')+' aria-label="Move '+safe(name)+' up">↑</button>'+
            '<button type="button" data-rank-move="'+safe(id)+'" data-idx="'+i+'" data-dir="1" '+(i===order.length-1?'disabled':'')+' aria-label="Move '+safe(name)+' down">↓</button>';
          target.appendChild(row);
        });
        issues.push(id+': ranking choices restored');
      }
      const hidden=document.getElementById(id);
      if(hidden)hidden.value=order.join('|');
      if(!root.querySelector('[data-rank-confirm]')){
        const controls=document.createElement('div');controls.className='idls-ranking-record';
        controls.innerHTML='<button type="button" data-rank-confirm="'+safe(id)+'">Record this ranking</button>'+
          '<span class="rank-confirmed" role="status" aria-live="polite"></span>';
        root.appendChild(controls);
      }
      const status=root.querySelector('.rank-confirmed');
      if(status)status.textContent=valid?'Ranking saved. You can revise the order.':'Choose your order with the arrows, then select “Record this ranking.”';
      target.setAttribute('role','list');
      for(const row of target.querySelectorAll('.rank-row')){
        row.classList.add('drag-rank-row');
        row.draggable=true;
        row.setAttribute('role','listitem');
      }
    }
  }
  // The original renderer is invoked after the student's alias has loaded.
  // Also audit every step change so a blank widget cannot go unnoticed.
  document.getElementById('open')?.addEventListener('click',()=>setTimeout(ensureRankings,70));
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-page-tab],[data-page-next],[data-page-back]'))setTimeout(ensureRankings,0);
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-rank-confirm]');
    if(!button||!state)return;
    // Revamp has a separate listener which records the existing input value;
    // this verification runs afterward, checking that saving actually happened.
    setTimeout(()=>{
      const id=button.dataset.rankConfirm,base=RICH[id.split('_')[0]]?.rank;
      const chosen=state?.fields?.[id]?.split('|')||[];
      const valid=!!base&&chosen.length===base.length&&new Set(chosen).size===base.length&&chosen.every(v=>base.includes(v));
      const status=button.parentElement.querySelector('.rank-confirmed');
      if(status)status.textContent=valid?'Ranking recorded and saved locally.':'Ranking not recorded. Please tell your teacher.';
      if(valid)completion();
    },0);
  });
  const style=document.createElement('style');
  style.textContent='.idls-ranking-record{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0 4px}.idls-ranking-record button{font-size:15px}.idls-ranking-record .rank-confirmed{color:#265069;font-size:14px}.rank-widget .rank-items:empty:before{content:"Ranking choices failed to load. Refresh this page and tell your teacher.";display:block;color:#8a2d2d;padding:12px;border:1px solid #b35454}';
  document.head.appendChild(style);
  if(state)ensureRankings();
  window.IDLS_RANKING_AUDIT=()=>({expectedSections:sections,widgets:[...document.querySelectorAll('.rank-widget[data-rank]')].map(root=>({id:root.dataset.rank,rows:root.querySelectorAll('.rank-row').length,recordControl:!!root.querySelector('[data-rank-confirm]'),saved:!!state?.fields?.[root.dataset.rank]})),issues:issues.slice()});
})();