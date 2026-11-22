/* IDLS pilot presentation: one section orientation followed by uninterrupted historical investigation.
   Only moves or simplifies explanatory DOM, never changes IDs, fields, answer state, persistence, or PDF. */
'use strict';
(function(){
 const sectionNames={
 oregon:'Why did a modern American battleship face such a difficult journey?',
 economy:'How did growing industry change America’s interests overseas?',
 hawaii:'Who benefited from annexing Hawaiʻi, and who had a say?',
 panama:'Who gained power over the canal route, and at whose expense?',
 dominican:'How could the United States exercise power without taking territory?',
 china:'Could the United States seek influence through access instead of annexation?'
 };
 const vocabularyDirection='Use at least two relevant vocabulary terms in each written answer. Your writing boxes show the choices and how completion credit works.';
 const minisequence='Read the context and answer the quick main-idea check. Make an initial prediction or ranking, investigate the evidence, then reconsider your judgment. Historical reasoning matters more than guessing correctly.';
 for(const [sectionId,question] of Object.entries(sectionNames)){
   const section=document.getElementById(sectionId);
   if(!section)continue;
   const heading=section.querySelector('h2');
   const context=section.querySelector('.sourcekit');
   if(!heading||!context)continue;
   const intro=heading.nextElementSibling;
   const oldLeads=[...section.querySelectorAll(':scope > p')].filter(p=>/^(Read the context|Follow the money|Use the USS Oregon problem)/i.test(p.textContent.trim()));
   const orientation=document.createElement('aside');
   orientation.className='idls-section-orientation';
   orientation.setAttribute('aria-label','How to approach this investigation');
   orientation.innerHTML='<p class="idls-driving-question">'+vocab(question)+'</p>'+
     '<p class="idls-one-direction"><strong>Your path:</strong> '+vocab(minisequence)+'</p>'+
     '<p class="idls-one-direction"><strong>When writing:</strong> '+vocab(vocabularyDirection)+'</p>';
   heading.after(orientation);
   // richPrepare left a direction paragraph after the context; move it into the orientation.
   for(const lead of oldLeads){const purpose=document.createElement('p');purpose.className='idls-section-purpose';purpose.textContent=lead.textContent.trim();orientation.insertBefore(purpose,orientation.children[1]);lead.remove();}
   if(intro && intro!==context && intro.tagName==='P'){
     const text=intro.textContent.trim();
     if(text && text!==question){
       const purpose=document.createElement('p');
       purpose.className='idls-section-purpose';
       purpose.textContent=text;
       orientation.insertBefore(purpose,orientation.children[1]);
       intro.remove();
     }
   }
   // Retain glossary access, but place its visual footprint at the top, not mid-story.
   const wordList=context.querySelector('.word-list');
   if(wordList){
     const wordTitle=wordList.previousElementSibling;
     const pack=document.createElement('details');
     pack.className='idls-word-help';
     pack.innerHTML='<summary>Vocabulary for this investigation (tap for definitions)</summary>';
     pack.appendChild(wordList);
     orientation.appendChild(pack);
     if(wordTitle && /^H3$/i.test(wordTitle.tagName) && /words to know/i.test(wordTitle.textContent))wordTitle.remove();
   }
   const readingMove=context.querySelector('.callout');
   if(readingMove){
     const details=document.createElement('details');
     details.className='idls-optional-strategy';
     details.innerHTML='<summary>Need help reading the sources?</summary>';
     details.appendChild(readingMove);
     orientation.appendChild(details);
   }
   for(const p of [...context.querySelectorAll('p')]){
     if(p.textContent.trim().startsWith('Vocabulary direction:'))p.remove();
   }
   const storyboard=context.querySelector('.storyboard');
   if(storyboard){
      storyboard.classList.add('idls-storyboard-quiet');
      const original=storyboard.textContent.trim();
      storyboard.textContent=original.replace(/^Storyboard connection:\s*/,'');
   }
   // The quick check remains immediately after the complete historical context.
   const mini=section.querySelector('.idls-mainidea');
   if(mini)mini.classList.add('idls-mainidea-inline');
   // Remove repeated, wordy rank-widget directions (not its question, ranking controls or answer fields).
   for(const block of section.querySelectorAll('.ranking-block')){
     const widget=block.querySelector('.rank-widget');
     if(!widget)continue;
     const existingTitle=widget.querySelector(':scope > h3');
     if(existingTitle)existingTitle.remove(); // already present in the surrounding heading
     const paragraphs=[...widget.querySelectorAll(':scope > p')];
     const isSecond=widget.dataset.rank.endsWith('_rank_second');
     if(isSecond){
       // The student has read this question and criterion on initial ranking.
       // Keep a compact reminder and all controls for the second independent judgment.
       if(paragraphs[0])paragraphs[0].innerHTML='<strong>Rank the same four motives again using the evidence you just analyzed.</strong>';
       if(paragraphs[1])paragraphs[1].textContent='Order them from most to least convincing.';
     }
     if(paragraphs[2])paragraphs[2].textContent='Use the arrows to reorder the motives. Explain your choice below.';
   }
 }
 const style=document.createElement('style');
 style.textContent='.idls-section-orientation{margin:14px 0 18px;padding:16px 18px;border-left:4px solid #b57b37;background:#f5f8f9;border-radius:8px;line-height:1.55}.idls-driving-question{font-weight:750;color:#17364b;font-size:1.2em;line-height:1.4;margin:0 0 8px}.idls-one-direction{font-size:15px;margin:8px 0}.idls-section-purpose{color:#405b6b;margin:5px 0 9px;font-size:15px}.idls-section-orientation details{margin-top:9px}.idls-section-orientation summary{font-weight:650;cursor:pointer;color:#225678}.idls-word-help .word-list{padding:8px 0}.idls-optional-strategy .callout{margin:8px 0 0}.idls-storyboard-quiet{font-size:13px;opacity:.8;line-height:1.4}.idls-mainidea-inline{margin-top:14px;margin-bottom:17px;padding:10px 14px}.idls-mainidea-inline > p:first-child{margin:0}.idls-mainidea-inline .field{margin:3px 0 4px}.idls-mainidea-inline .field label{font-size:15px}.ranking-block h3{margin:14px 0 8px}.rank-widget > p{margin:6px 0 10px}';
 document.head.appendChild(style);
})();