/* IDLS mock preview usability improvements; storage and production endpoint unchanged. */
'use strict';
(function(){
  const style=document.createElement('style');
  style.textContent=[
    '#viewer{width:min(96vw,1500px);height:min(94vh,1050px);max-width:none;max-height:none;padding:12px 16px;background:#f4f7fa;overflow:hidden;}',
    '#viewer[open]{display:flex;flex-direction:column;align-items:stretch;gap:10px;}',
    '#viewer #large{width:100%;max-width:100%;height:calc(94vh - 95px);max-height:calc(94vh - 95px);object-fit:contain;flex:1;min-height:0;}',
    '#viewer #closeImage{align-self:flex-start;flex-shrink:0;}',
    '#viewer::backdrop{background:rgba(9,24,35,.85);}',
    '.idls-vocab-visible{display:block;margin-top:8px;}',
    '.idls-vocab-visible .word-list{display:flex;gap:8px;flex-wrap:wrap;}',
    '.rank-widget .rank-row{cursor:grab;user-select:none;touch-action:none;background:#f6f9fb;transition:background .1s,border-color .1s;}',
    '.rank-widget .rank-row:before{content:"⋮⋮";font-size:26px;color:#637d8d;margin-right:8px;letter-spacing:-5px;}',
    '.rank-widget .rank-row[aria-grabbed="true"],.rank-widget .rank-row.idls-drop-target{background:#e2eff8;border:2px solid #42789d;}',
    '.rank-widget .rank-row button[data-rank-move]{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;}',
    '.rank-widget .rank-row button[data-rank-move]:focus-visible{position:static;width:auto;height:auto;overflow:visible;}',
    '.idls-evidence-review{margin:18px 0;padding:14px 16px;border:1px solid #c6d6e2;background:#f3f7fa;border-radius:10px;}',
    '.idls-evidence-review table{font-size:14px;background:#fff;}',
    '.idls-evidence-review td{white-space:pre-wrap;overflow-wrap:anywhere;}',
    '.idls-source-open{display:inline;text-align:left;background:transparent;border:0;padding:0;margin:0;color:#174e72;text-decoration:underline dotted;font:inherit;font-weight:700;}',
    '#idls-source-dialog{width:min(92vw,790px);max-width:none;max-height:90vh;overflow:auto;padding:25px;background:#fffaf0;border:2px solid #9c8a71;}',
    '#idls-source-dialog h3{margin-top:8px;}',
    '#idls-source-dialog blockquote{white-space:pre-wrap;font:20px/1.65 Georgia,serif;background:#f6eedf;border-left:4px solid #9c754b;padding:18px;margin:12px 0;}',
    '#idls-source-dialog .source-context{font-size:15px;}'
  ].join('');
  document.head.appendChild(style);

  // Vocabulary terms are visible, while individual definitions remain click/tap.
  for(const details of document.querySelectorAll('.idls-word-help')){
    const parent=details.parentNode;
    const box=document.createElement('div');
    box.className='idls-vocab-visible';
    const heading=document.createElement('p');heading.innerHTML='<strong>Vocabulary to know (tap a term for its definition)</strong>';
    box.append(heading);
    const list=details.querySelector('.word-list');
    if(list)box.append(list);
    parent?.replaceChild(box,details);
  }
  for(const p of document.querySelectorAll('.idls-section-orientation .idls-one-direction')){
    if(p.textContent.includes('two are required only'))p.innerHTML='<strong>When writing:</strong> Cite historical evidence. Two vocabulary terms are required only in the first final synthesis answer.';
  }

  // Remove old arrow instruction text when the visual sorting interaction replaces it.
  for(const root of document.querySelectorAll('.rank-widget')){
    for(const p of root.querySelectorAll(':scope > p')){
      if(/arrows|↑|↓|drag the four/i.test(p.textContent))p.innerHTML='Drag the motive cards into order from <strong>most convincing (1)</strong> to <strong>least convincing (4)</strong>. Explain your top choice in the question below.';
    }
  }
  for(const p of document.querySelectorAll('.ranking-block > p')){
    if(/arrow/i.test(p.textContent))p.textContent='Drag a card to change its position. Choose “Record this ranking” when you are satisfied.';
  }
  // Keep existing rank IDs, save format and keyboard arrow controls for accessibility.
  function commitOrder(root,items){
    const id=root.dataset.rank, base=RICH[id.split('_')[0]]?.rank;
    if(!state||!base||items.length!==base.length||!items.every(t=>base.includes(t)))return;
    const value=items.join('|');
    state.fields[id]=value;
    $(id).value=value;
    rankUi();
    const status=root.querySelector('.rank-confirmed');
    if(status)status.textContent='Ranking saved. Drag again to revise.';
    changed();
  }
  let dragging=null;
  document.addEventListener('dragstart',e=>{
    const row=e.target.closest('.rank-widget .rank-row');
    if(!row||!state)return;
    const root=row.closest('.rank-widget');
    dragging={root,id:root.dataset.rank,from:[...row.parentElement.children].indexOf(row)};
    row.setAttribute('aria-grabbed','true');
    if(e.dataTransfer){e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragging.id);}
  });
  document.addEventListener('dragover',e=>{
    const row=e.target.closest('.rank-widget .rank-row');
    if(row&&dragging&&row.closest('.rank-widget')===dragging.root){e.preventDefault();row.classList.add('idls-drop-target');}
  });
  document.addEventListener('dragleave',e=>{e.target.closest('.rank-row')?.classList.remove('idls-drop-target');});
  document.addEventListener('drop',e=>{
    const row=e.target.closest('.rank-widget .rank-row');
    if(!row||!dragging||row.closest('.rank-widget')!==dragging.root)return;
    e.preventDefault();
    const {root,from}=dragging,to=[...row.parentElement.children].indexOf(row);
    const names=$(root.dataset.rank).value.split('|');
    if(from>=0&&to>=0&&from!==to){const item=names.splice(from,1)[0];names.splice(to,0,item);commitOrder(root,names);}
    document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('idls-drop-target'));
    dragging=null;
  });
  document.addEventListener('dragend',()=>{dragging=null;document.querySelectorAll('.rank-row').forEach(r=>{r.removeAttribute('aria-grabbed');r.classList.remove('idls-drop-target');});});
  // Pointer-based drag for touch screens where HTML5 drag events are unreliable.
  let touch=null;
  document.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'||e.target.closest('button')||!state)return;
    const row=e.target.closest('.rank-widget .rank-row');
    if(row)touch={root:row.closest('.rank-widget'),from:[...row.parentElement.children].indexOf(row),startX:e.clientX,startY:e.clientY};
  });
  document.addEventListener('pointerup',e=>{
    if(!touch)return;
    const info=touch;touch=null;
    if(Math.hypot(e.clientX-info.startX,e.clientY-info.startY)<12)return;
    const row=document.elementFromPoint(e.clientX,e.clientY)?.closest('.rank-widget .rank-row');
    if(!row||row.closest('.rank-widget')!==info.root)return;
    const to=[...row.parentElement.children].indexOf(row);
    const names=$(info.root.dataset.rank).value.split('|');
    if(info.from!==to&&to>=0){const item=names.splice(info.from,1)[0];names.splice(to,0,item);commitOrder(info.root,names);}
  });
  document.addEventListener('pointercancel',()=>{touch=null;});

  // Source titles open an accessible readable transcription of the displayed
  // historical excerpt—not an invented photograph of the original manuscript.
  const dlg=document.createElement('dialog');dlg.id='idls-source-dialog';
  dlg.innerHTML='<button type="button" id="idls-source-close">Close document</button><div id="idls-source-body"></div>';
  document.body.appendChild(dlg);
  dlg.querySelector('#idls-source-close').onclick=()=>dlg.close();
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
  for(const article of document.querySelectorAll('.actual-source')){
    const title=article.querySelector('h4');if(!title)continue;
    const name=title.textContent.trim();
    title.replaceChildren();
    const button=document.createElement('button');
    button.type='button';button.className='idls-source-open';button.textContent=name;
    button.title='Open the excerpt and source information in a larger reading view';
    button.addEventListener('click',()=>{
      const body=dlg.querySelector('#idls-source-body');body.replaceChildren();
      const h=document.createElement('h3');h.textContent=name;body.appendChild(h);
      const meta=article.querySelector('.source-meta')?.cloneNode(true);
      if(meta)body.appendChild(meta);
      const quote=article.querySelector('blockquote')?.cloneNode(true);
      if(quote)body.appendChild(quote);
      const ctx=article.querySelector('.source-context')?.cloneNode(true);
      if(ctx)body.appendChild(ctx);
      const link=article.querySelector('a[href]')?.cloneNode(true);
      if(link){link.textContent='Open the full original source';body.appendChild(link);}
      const note=document.createElement('p');note.className='small';note.textContent='Enlarged transcription of the excerpt shown in this lesson; this is not a photograph of the original document.';
      body.insertBefore(note,quote||ctx||null);
      dlg.showModal();
    });
    title.appendChild(button);
  }

  // Scaffold synthesis through student's own evidence, rather than supplying
  // a model answer; response cells refresh as work changes.
  const synthesis=document.getElementById('synthesis');
  if(synthesis&&!synthesis.querySelector('.idls-evidence-review')){
    const review=document.createElement('div');review.className='idls-evidence-review';
    review.innerHTML='<h3>Evidence you collected</h3><p class="small">Review your own earlier answers as you write the final synthesis. You can use evidence from any two investigations; you do not need to include everything in this table.</p><table><thead><tr><th scope="col">Investigation</th><th scope="col">Your earlier evidence or interpretation</th></tr></thead><tbody></tbody></table>';
    const first=synthesis.querySelector('.field');if(first)synthesis.insertBefore(review,first);
    const rows=[
      ['USS Oregon','oregon_source_a','oregon_compare'],
      ['Economic growth','economy_source_a','economy_analysis'],
      ['Hawaiʻi','hawaii_source_a','hawaii_compare'],
      ['Panama','panama_source_a','panama_power'],
      ['Dominican Republic','dominican_source_a','dominican_analysis'],
      ['China cartoon','china_cartoon_infer2','china_cartoon_infer1']
    ];
    function refresh(){
      const tbody=review.querySelector('tbody');tbody.replaceChildren();
      for(const [name,...ids] of rows){
        const tr=document.createElement('tr');
        const th=document.createElement('th');th.scope='row';th.textContent=name;
        const td=document.createElement('td');
        const answer=ids.map(id=>state?.fields?.[id]?.trim()).find(Boolean);
        td.textContent=answer||'No response yet';
        tr.append(th,td);tbody.appendChild(tr);
      }
    }
    document.addEventListener('input',()=>{if(state)refresh();});
    document.addEventListener('change',()=>{if(state)refresh();});
    document.addEventListener('click',e=>{if(e.target.closest('[data-page-tab],[data-page-next],[data-page-back]'))refresh();});
    const originalFill=fill;
    fill=function(){originalFill();refresh();};
    refresh();
  }

  // Vocabulary barriers in the independently scored final learning check.
  Object.assign(GLOSSARY,{
    'nominal':'A money amount shown in the dollars of its time, without adjusting for how prices changed.',
    'nominal dollars':'Dollar values from different years that have not been adjusted for inflation.',
    'inflation':'When prices generally rise, so the same amount of money buys less.',
    'plebiscite':'A direct vote in which people decide a political question.',
    'administer':'To organize and manage a process, such as collecting public money.',
    'customs collection':'Collecting taxes charged on goods entering or leaving a country.'
  });
  const questions=document.querySelectorAll('#idls-questions > div');
  for(const q of questions){
    const text=q.textContent;
  }
  window.IDLS_UX_FIX_AUDIT=()=>({
    visibleVocab:document.querySelectorAll('.idls-vocab-visible').length,
    sourceButtons:document.querySelectorAll('.idls-source-open').length,
    rankingWidgets:document.querySelectorAll('.rank-widget').length,
    synthesisReview:!!document.querySelector('.idls-evidence-review'),
    sourceModal:!!document.querySelector('#idls-source-dialog')
  });
})();