/* Rigorous primary-source upgrade + accessible motive drag/drop. Does not modify saving implementation. */
'use strict';
(function(){
  function sourceCard(letter,title,origin,excerpt,link,description){
    return '<article class="actual-source"><div class="source-meta">PRIMARY SOURCE '+letter+' · '+origin+'</div><h4>'+title+'</h4><blockquote>'+vocab(excerpt)+'</blockquote><p class="source-context">'+vocab(description)+'</p><p class="small"><a href="'+link+'" target="_blank" rel="noopener noreferrer">Read the original document or source</a></p></article>';
  }
  const section=document.getElementById('oregon');
  if(section){
    const old=section.querySelector('.evidence-pair');
    if(old){
      // Two independently situated primary documents. The descriptions are labeled as editorial context, not quotation.
      old.innerHTML='<h3>Investigate two actual historical sources</h3><p class="small"><strong>Your task:</strong> Compare what the documents reveal. Source A records an action. Source B argues for a policy. Which conclusions can you establish, and which need more evidence?</p><div class="actual-source-grid">'+
        sourceCard('A','Secretary of the Navy: Report on the USS Oregon','Official government report, 1898',
          'The Oregon was ordered to proceed from Bremerton, Wash., to San Francisco and prepare for a long voyage.',
          'https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/s/spanish-american-war/report-of-the-secretary-of-the-navy-1898-part-2.html',
          'Context (not a quotation): The Navy sent the USS Oregon around South America to reinforce its Atlantic fleet. It reached Jupiter Inlet, Florida, on May 24. The record establishes operational decisions and the length of the journey; it does not, by itself, establish why policymakers wanted annexation.')+
        sourceCard('B','Alfred Thayer Mahan: The Influence of Sea Power upon History','Naval strategist’s published argument, 1890',
          'The ships that thus sail to and fro must have secure ports to which to return',
          'https://www.historians.org/resource/the-influence-of-sea-power-on-history/',
          'Context (not a quotation): Mahan argued that shipping, naval protection, and strategically located ports were interconnected. His publication predates the 1898 voyage. His argument describes a proposed national strategy, not an official explanation for a particular 1898 decision.')+
        '</div><div class="source-thinking"><strong>Source-reading prompts</strong><p>Who created each source, when, and for what purpose? Which statement is an observation about events, and which is an argument about national policy? Does one necessarily prove the other?</p></div>';
      const compare=section.querySelector('#oregon_compare');
      if(compare){
        const label=section.querySelector('label[for="oregon_compare"]');
        if(label)label.innerHTML=vocab('Using Source A and Source B, assess this claim: “The voyage proves that annexing foreign territory was necessary.” What do the documents establish, and what additional evidence would you need?');
        const frames=compare.parentElement.querySelectorAll('.frame');
        if(frames[0])frames[0].innerHTML=vocab('Source A establishes ___ about the voyage. Source B argues ___. Neither document alone proves ___ because ___.');
        if(frames[1])frames[1].innerHTML=vocab('Although the 1898 report documents ___, Mahan’s earlier argument promotes ___. To evaluate whether annexation was necessary, I would compare ___ with ___.');
      }
    }
  }
  // Drag-and-drop is a *presentation* enhancement. The existing rank-field IDs and
  // changed() save pipeline remain authoritative; no changes to backend, records, or PDFs.
  let dragged=null;
  const ranks=document.querySelectorAll('[data-rank]');
  function items(root){return [...root.querySelectorAll('.rank-row')]}
  function record(root,ordering){
    const id=root.dataset.rank;
    const permitted=RICH[id.split('_')[0]]?.rank;
    if(!permitted||ordering.length!==permitted.length||!ordering.every(x=>permitted.includes(x))||new Set(ordering).size!==permitted.length)return;
    state.fields[id]=ordering.join('|');
    const input=document.getElementById(id);
    if(input)input.value=state.fields[id];
    rankUi();
    // Re-rendered rows require re-applying drag attributes.
    enhance(root);
    const note=root.querySelector('.rank-confirmed');
    if(note)note.textContent='Ranking saved on this device; cloud save pending.';
    changed();
  }
  function enhance(root){
    for(const row of items(root)){
      row.draggable=true;
      row.setAttribute('role','listitem');
      row.setAttribute('aria-label','Drag to reorder this motive, or use the arrow buttons.');
      row.title='Drag this motive to another position. The arrow buttons also work.';
      row.classList.add('drag-rank-row');
    }
    root.querySelector('.rank-items')?.setAttribute('role','list');
    if(!root.querySelector('.drag-hint')){
      const help=document.createElement('p');
      help.className='drag-hint small';
      help.textContent='Drag a motive to move it. On a keyboard or touch device, use ↑ and ↓. Your order is saved when it changes.';
      root.querySelector('h3')?.after(help);
    }
  }
  ranks.forEach(enhance);
  document.addEventListener('dragstart',e=>{
    const row=e.target.closest('.drag-rank-row');
    if(!row||!state)return;
    const root=row.closest('[data-rank]');
    dragged={id:root.dataset.rank,from:items(root).indexOf(row)};
    e.dataTransfer.effectAllowed='move';
    e.dataTransfer.setData('text/plain',root.dataset.rank);
    row.classList.add('dragging');
  });
  document.addEventListener('dragover',e=>{
    const row=e.target.closest('.drag-rank-row');
    if(!row||!dragged||row.closest('[data-rank]').dataset.rank!==dragged.id)return;
    e.preventDefault();
    e.dataTransfer.dropEffect='move';
  });
  document.addEventListener('drop',e=>{
    const row=e.target.closest('.drag-rank-row');
    if(!row||!dragged)return;
    const root=row.closest('[data-rank]');
    if(!root||root.dataset.rank!==dragged.id)return;
    e.preventDefault();
    const target=items(root).indexOf(row),from=dragged.from;
    const names=(state?.fields[dragged.id]||RICH[dragged.id.split('_')[0]].rank.join('|')).split('|');
    if(target>=0&&from>=0&&target!==from){const [motive]=names.splice(from,1);names.splice(target,0,motive);record(root,names)}
    dragged=null;
  });
  document.addEventListener('dragend',e=>{document.querySelectorAll('.dragging').forEach(el=>el.classList.remove('dragging'));dragged=null});
  // rankUi runs during login and after arrow-key moves. Re-enhance after each render.
  const originalRankUi=rankUi;
  rankUi=function(){originalRankUi();ranks.forEach(enhance)};
  const style=document.createElement('style');
  style.textContent='.actual-source-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}.actual-source{margin:0;background:#f0f5f8;border:1px solid #c3d3df;padding:16px;border-radius:9px}.actual-source h4{margin:8px 0}.actual-source blockquote{margin:10px 0;border-left:4px solid #957445;padding:12px;background:white;font-family:Georgia,serif;line-height:1.65}.source-meta{font-size:12px;font-weight:700;color:#345b78;letter-spacing:.04em}.source-context{font-size:15px}.source-thinking{padding:12px;background:#eff4f8;margin-top:16px}.drag-rank-row{cursor:grab;user-select:none;touch-action:pan-y}.drag-rank-row.dragging{opacity:.5;border:2px dashed #4d7899}.drag-rank-row:focus-within{outline:2px solid #b57b37}.drag-hint{margin:5px 0 12px}.actual-source a{overflow-wrap:anywhere}';
  document.head.appendChild(style);
})();
