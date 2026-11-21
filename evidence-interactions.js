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
          'Context (not a quotation): The Navy sent the USS Oregon around South America to reinforce its Atlantic fleet. It reached Jupiter Inlet, Florida, on May 24. This record establishes the Navy’s orders and the journey. It does not prove that the United States needed to take control of overseas territory rather than use ports by agreement or pursue other options.')+
        sourceCard('B','Alfred Thayer Mahan: The Influence of Sea Power upon History','Naval strategist’s published argument, 1890',
          'the ships of war of the United States, in war, will be like land birds, unable to fly far from their own shores.',
          'https://www.ruhr-uni-bochum.de/gna/Quellensammlung/07/07_alfredtmahaninfluenceofseapower_1890.htm',
          'Context (not a quotation): Mahan used this comparison to argue that a powerful navy needed places far from home where its ships could obtain coal, make repairs, and find protection. He discussed overseas stations and colonies, but also acknowledged that friendly foreign ports could be useful during peace. His 1890 argument predates the Oregon voyage and does not establish that annexation was the only possible solution.')+
        '</div><div class="source-thinking"><strong>Source-reading prompts</strong><p>Who created each source, when, and for what purpose? Which statement records what happened, and which argues for a national policy? What does Mahan mean by comparing warships to land birds? Does the Oregon voyage alone prove that the United States needed to annex territory?</p></div>';
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

  // Replace instructional summaries elsewhere with explicitly attributed original evidence.
  // Context paragraphs are labeled as teacher descriptions, not original-source quotations.
  const archival={
    economy:{
      a:['Historical merchandise exports','U.S. historical statistical series, selected years',
        '1870: $451 million; 1880: $853 million; 1890: $910 million.',
        'https://www.census.gov/library/publications/1975/compendia/hist_stats_colonial-1970.html',
        'Transcribed nominal-dollar figures from a compiled historical exports series, not a contemporary quotation. The 1900 value remains concealed until the section reveal.'],
      b:['Alfred Thayer Mahan: commerce and naval protection','Published argument, 1890',
        'The ships that thus sail to and fro must have secure ports to which to return',
        'https://www.historians.org/resource/the-influence-of-sea-power-on-history/',
        'Mahan advocates protection for commerce. His argument demonstrates a particular justification for sea power, not agreement among all businesses.'],
      question:'How does the export trend help explain an economic incentive, and what does Mahan add about protecting trade? Which causal claim about territorial expansion remains unproven?',
      frames:['The statistical series establishes ___, while Mahan argues ___. The sources do not prove ___.','The numerical trend documents ___, and Mahan provides an argument for ___. To evaluate whether ___ caused ___, we would need ___.']
    },
    hawaii:{
      a:['Queen Liliʻuokalani protests U.S. ownership','Letter to U.S. House of Representatives, December 1898',
        'I especially protest against such assertion of ownership as a taking of property without due process of law',
        'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands',
        'The queen challenges U.S. claims to Hawaiian Crown Lands. This document offers a Hawaiian leader’s perspective; it is not the 1897 mass petition.'],
      b:['Congress declares annexation','Newlands Resolution, July 1898',
        'the said Hawaiian Islands and their dependencies be, and they are hereby, annexed as a part of the territory of the United States',
        'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands',
        'The congressional resolution establishes the legal action taken by the United States; its assertion of consent refers to the Republic of Hawaii government, not a popular vote.'],
      question:'How do the queen’s protest and the annexation resolution complicate the claim that the islands’ strategic value justified U.S. control? Which voices or evidence are still missing?',
      frames:['The resolution establishes ___, while the queen contests ___. These sources leave unanswered ___.','Although the U.S. government claimed authority to ___, Liliʻuokalani challenged ___; this distinction matters because ___.']
    },
    panama:{
      a:['Hay–Bunau-Varilla Treaty','U.S.–Panama treaty, November 1903',
        'grants to the United States in perpetuity the use, occupation and control of a zone of land',
        'https://avalon.law.yale.edu/20th_century/pan001.asp',
        'The treaty specifies long-term U.S. control of a canal zone; it is the agreement itself, not an interpretation of its fairness.'],
      b:['Panamanian municipal support','Panamanian municipal resolution, December 1903',
        'the canal be excavated for its own service and for the benefit of universal commerce',
        'https://history.state.gov/historicaldocuments/frus1903/d329',
        'Some local political bodies publicly supported building a canal and ratifying the treaty. This does not establish unanimous Panamanian support.'],
      question:'What can the treaty and municipal resolution establish about canal control and some Panamanian support? Why would it be incorrect to conclude that all Panamanians consented?',
      frames:['The treaty establishes ___, and the municipal resolution demonstrates ___. Neither proves ___.','These documents provide evidence of ___ and ___, but the scope of consent remains uncertain because ___.']
    },
    dominican:{
      a:['Roosevelt: U.S. authority to intervene','Annual presidential message to Congress, December 1904',
        'the exercise of an international police power',
        'https://www.archives.gov/milestone-documents/roosevelt-corollary',
        'Roosevelt claimed a U.S. role in regional intervention to prevent foreign pressure and what he called wrongdoing. This is a justification, not evidence that a particular financial division was fair.'],
      b:['An earlier customs-revenue proposal','U.S. diplomatic correspondence reporting negotiations, 1905',
        'Distribute 40 per cent annual receipts among all creditors, remaining 60 to the Dominican Government.',
        'https://history.state.gov/historicaldocuments/frus1905/papers',
        'This recorded proposal precedes the final temporary arrangement. It shows that the allocation was contested and negotiated; it does not reveal the eventual distribution.'],
      question:'How does Roosevelt’s justification differ from the financial proposal? What do these sources establish about U.S. aims, and whose judgment about fairness is still missing?',
      frames:['Roosevelt argued ___, while the proposal would divide ___; neither source establishes ___.','The argument for intervention addresses ___, whereas the allocation proposal concerns ___. A credible evaluation would also require ___ because ___.']
    }
  };
  for(const [id,d] of Object.entries(archival)){
    const sec=document.getElementById(id),box=sec?.querySelector('.evidence-pair');
    if(!box)continue;
    box.innerHTML='<h3>Investigate original historical evidence</h3><p class="small">These are selected, attributed excerpts or historical figures. Read their source context before drawing a conclusion. Short excerpts never represent an entire document.</p><div class="actual-source-grid">'+
      sourceCard('A',...d.a)+sourceCard('B',...d.b)+
      '</div><div class="source-thinking"><strong>Source-reading prompts</strong><p>Who produced each source? What was that person or institution trying to accomplish? Where do the sources agree or conflict? Whose experience is not represented?</p></div>';
    const label=sec.querySelector('label[for="'+id+'_compare"]');
    if(label)label.innerHTML=vocab(d.question);
    const frames=sec.querySelector('#'+id+'_compare')?.parentElement.querySelectorAll('.frame')||[];
    if(frames[0])frames[0].innerHTML=vocab(d.frames[0]);
    if(frames[1])frames[1].innerHTML=vocab(d.frames[1]);
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
