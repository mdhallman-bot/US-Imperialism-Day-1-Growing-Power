/* Rigorous primary-source upgrade + accessible motive drag/drop. Does not modify saving implementation. */
'use strict';
(function(){
  function sourceCard(letter,title,origin,excerpt,link,description){
    return '<article class="actual-source"><div class="source-meta">HISTORICAL EVIDENCE '+letter+' · '+origin+'</div><h4>'+title+'</h4><blockquote>'+vocab(excerpt)+'</blockquote><p class="source-context">'+vocab(description)+'</p><p class="small"><a href="'+link+'" target="_blank" rel="noopener noreferrer">Read the original document or source</a></p></article>';
  }
  const section=document.getElementById('oregon');
  if(section){
    const old=section.querySelector('.evidence-pair');
    if(old){
      // Two independently situated primary documents. The descriptions are labeled as editorial context, not quotation.
      old.innerHTML='<h3>Investigate two actual historical sources</h3><p class="small"><strong>Your task:</strong> Source A is an official 1898 record of what the Navy did; Source B is Mahan’s 1890 argument about what a navy needs. First identify the practical problem documented by the Navy. Then explain how Mahan uses strategic reasoning to propose a solution. A record of a problem is not proof that a particular policy was necessary.</p><div class="actual-source-grid">'+
        sourceCard('A','Secretary of the Navy: Report on the USS Oregon','Official government report, 1898',
          'to arrange for coal and to facilitate in every way possible the passage of this powerful vessel to reinforce the fleet in the North Atlantic.',
          'https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/s/spanish-american-war/report-of-the-secretary-of-the-navy-1898-part-2.html',
          'Context (not a quotation): The 1898 report explains that the Navy sent the smaller gunboat Marietta ahead of the Oregon to arrange coal supplies on its trip around South America. The Oregon left San Francisco on March 19 and reached Jupiter Inlet, Florida, on May 24. This is evidence about the logistical challenge of moving a warship between oceans; it does not, by itself, establish that annexing foreign territory was required.')+
        sourceCard('B','Alfred Thayer Mahan: The Influence of Sea Power upon History','Naval strategist’s published argument, 1890',
          'the ships of war of the United States, in war, will be like land birds, unable to fly far from their own shores.',
          'https://www.ruhr-uni-bochum.de/gna/Quellensammlung/07/07_alfredtmahaninfluenceofseapower_1890.htm',
          'Context (not a quotation): Mahan used this comparison to argue that a powerful navy needed places far from home where its ships could obtain coal, make repairs, and find protection. He discussed overseas stations and colonies, but also acknowledged that friendly foreign ports could be useful during peace. His 1890 argument predates the Oregon voyage and does not establish that annexation was the only possible solution.')+
        '</div><div class="source-thinking"><strong>Source-reading prompts</strong><p>Who created each source, when, and for what purpose? What specific difficulty does the Navy record establish? What does Mahan want American policymakers to do, and why? Explain how the Navy’s need for coal might support his argument without proving that annexation was the only possible response.</p></div>';
      const compare=section.querySelector('#oregon_compare');
      if(compare){
        const label=section.querySelector('label[for="oregon_compare"]');
        if(label)label.innerHTML=vocab('Source A records the Navy arranging coal for the USS Oregon. Source B argues that warships need access to secure overseas ports. Do these two sources prove that the United States had to annex territory? Use a specific detail from each source, then explain what further evidence is needed.');
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
        'Historical data compiled later from U.S. trade records—not the words of a historical eyewitness. These figures establish reported export values; they do not tell us what policymakers believed. The 1900 value remains concealed until the reveal.'],
      b:['Alfred Thayer Mahan: commerce and naval protection','Published argument, 1890',
        'The ships that thus sail to and fro must have secure ports to which to return',
        'https://www.historians.org/resource/the-influence-of-sea-power-on-history/',
        'This is Mahan’s own language from an 1890 argument, not evidence that all Americans agreed with him. He links commerce and access to ports as part of a proposed naval strategy.'],
      question:'Source A is historical export data; Source B is Mahan’s argument for naval protection of trade. What change do the numbers actually establish, and what action does Mahan advocate? Explain why neither source proves that annexing territory caused American export growth.',
      frames:['The statistical series establishes ___, while Mahan argues ___. The sources do not prove ___.','The numerical trend documents ___, and Mahan provides an argument for ___. To evaluate whether ___ caused ___, we would need ___.']
    },
    hawaii:{
      a:['Queen Liliʻuokalani protests U.S. ownership','Letter to U.S. House of Representatives, December 1898',
        'I especially protest against such assertion of ownership as a taking of property without due process of law',
        'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands',
        'In this December 1898 protest, the former queen specifically contests U.S. claims to Hawaiian Crown Lands. This is her own argument about property and authority after annexation; it is not the 1897 mass anti-annexation petition.'],
      b:['Congress declares annexation','Newlands Resolution, July 1898',
        'the said Hawaiian Islands and their dependencies be, and they are hereby, annexed as a part of the territory of the United States',
        'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands',
        'This July 1898 congressional resolution records what the United States claimed the law would do. Its statement about consent refers to the Republic of Hawaiʻi government, not a popular vote among Native Hawaiians.'],
      question:'Source A is Queen Liliʻuokalani’s protest against U.S. claims to Crown Lands; Source B is Congress’s resolution declaring annexation. What does Congress claim the United States can do, and what does the queen challenge? Why do these documents not establish whether Native Hawaiians as a whole consented to annexation?',
      frames:['The resolution establishes ___, while the queen contests ___. These sources leave unanswered ___.','Although the U.S. government claimed authority to ___, Liliʻuokalani challenged ___; this distinction matters because ___.']
    },
    panama:{
      a:['Hay–Bunau-Varilla Treaty','U.S.–Panama treaty, November 1903',
        'grants to the United States in perpetuity the use, occupation and control of a zone of land',
        'https://avalon.law.yale.edu/20th_century/pan001.asp',
        'Article II records the legal grant of long-term control to the United States. Treaty language establishes the agreement’s terms, not whether those terms were fair or popular.'],
      b:['Panamanian municipal support','Panamanian municipal resolution, December 1903',
        'the canal be excavated for its own service and for the benefit of universal commerce',
        'https://history.state.gov/historicaldocuments/frus1903/d329',
        'This December 1903 municipal resolution argues that a canal would benefit Panama and commerce. It shows one local government’s expressed support, not a vote by the entire Panamanian population.'],
      question:'Source A is a treaty setting the legal terms of U.S. canal control; Source B is a Panamanian municipal council arguing in favor of the project. What authority does the treaty grant, and what benefits does the council expect? Explain why the council’s support is not proof that every Panamanian agreed.',
      frames:['The treaty establishes ___, and the municipal resolution demonstrates ___. Neither proves ___.','These documents provide evidence of ___ and ___, but the scope of consent remains uncertain because ___.']
    },
    dominican:{
      a:['Roosevelt: U.S. authority to intervene','Annual presidential message to Congress, December 1904',
        'the exercise of an international police power',
        'https://www.archives.gov/milestone-documents/roosevelt-corollary',
        'Roosevelt’s 1904 presidential message argues that the United States might act as a regional police power. This is the president’s justification for intervention, not a report measuring the fairness of a customs arrangement.'],
      b:['An earlier customs-revenue proposal','U.S. diplomatic correspondence reporting negotiations, 1905',
        'Distribute 40 per cent annual receipts among all creditors, remaining 60 to the Dominican Government.',
        'https://history.state.gov/historicaldocuments/frus1905/d314',
        'This January 1905 diplomatic telegram reports a proposed 40/60 customs split. It is a record of a negotiating position, not the later final arrangement; it does not reveal the eventual 55/45 division.'],
      question:'Source A is Roosevelt’s argument justifying American intervention; Source B is a diplomatic record describing a proposed way to divide Dominican customs revenue. What reason does Roosevelt give for intervention, and what concrete financial action does the proposal describe? Whose view would you need before judging the plan’s fairness?',
      frames:['Roosevelt argued ___, while the proposal would divide ___; neither source establishes ___.','The argument for intervention addresses ___, whereas the allocation proposal concerns ___. A credible evaluation would also require ___ because ___.']
    }
  };
  for(const [id,d] of Object.entries(archival)){
    const sec=document.getElementById(id),box=sec?.querySelector('.evidence-pair');
    if(!box)continue;
    box.innerHTML='<h3>Investigate original historical evidence</h3><p class="small"><strong>Your task:</strong> '+vocab(d.question)+'</p><p class="small">Source A and Source B have different purposes. The quotation marks show original historical language; the export figures are compiled historical data. The paragraphs marked Context are teacher explanations, not quotations. Read each source’s creator and date before answering.</p><div class="actual-source-grid">'+
      sourceCard('A',...d.a)+sourceCard('B',...d.b)+
      '</div><div class="source-thinking"><strong>Source-reading move</strong><p>First identify what Source A can establish. Then identify what Source B claims or documents. Compare the two without treating an argument as proof of the event—or one official voice as everyone’s perspective.</p></div>';
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
