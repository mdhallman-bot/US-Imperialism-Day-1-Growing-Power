/* Imperialism Day 2 mock-student UX cleanup: applied consistently to five
   investigations. No production scripts/endpoints/student saved keys are changed. */
'use strict';
(function(){
 const investigations=['oregon','economy','hawaii','panama','dominican'];
 const perSource={
   oregon:{
     a:'Source A (1898 Navy report): What did Navy officials arrange to help the USS Oregon reach the Atlantic? Identify one action from the quoted report.',
     af:['The Navy arranged ___ to help the Oregon ___.','The report describes ___; this matters because ___.'],
     b:'Source B (Mahan, 1890): What problem did Mahan predict warships would face far from U.S. shores? Use a phrase from his argument.',
     bf:['Mahan warned that American warships might ___ when ___.','Mahan compared warships to ___ to argue that ___.']
   },
   economy:{
     a:'Source A (export figures): How did the value of American exports change between 1870 and 1890? Include both figures.',
     af:['Exports rose from ___ in 1870 to ___ in 1890.','The figures show ___ between 1870 and 1890, but do not explain ___.'],
     b:'Source B (Mahan, 1890): What does Mahan argue commercial ships need in order to support overseas trade?',
     bf:['Mahan argues that ships involved in trade need ___.','In Mahan’s view, overseas commerce depends partly on ___ because ___.']
   },
   hawaii:{
     a:'Source A (Liliʻuokalani, 1898): What action or claim is the queen protesting? Use the quoted words as evidence.',
     af:['The queen protests the U.S. claim that ___.','Her statement challenges ___ because she describes it as ___.'],
     b:'Source B (Newlands Resolution, 1898): What does Congress declare about the Hawaiian Islands?',
     bf:['Congress declares that the islands are ___.','The resolution asserts U.S. authority to ___; this is a legal claim, not proof of ___.']
   },
   panama:{
     a:'Source A (1903 canal treaty): What control did Panama’s government agree to grant the United States?',
     af:['The treaty grants the United States control of ___.','Article II states that the United States would ___, which could affect ___.'],
     b:'Source B (1903 municipal council): What benefit does this council expect from a canal? Quote or identify one detail.',
     bf:['The council expects the canal to benefit ___.','The council supports the canal because it anticipates ___, although this does not establish ___.']
   },
   dominican:{
     a:'Source A (Roosevelt, 1904): Under what circumstances does Roosevelt argue the United States might intervene?',
     af:['Roosevelt argues for intervention when ___.','He claims intervention may be justified by ___; this is his argument about ___.'],
     b:'Source B (1905 diplomatic record): What division of customs money did the Dominican president propose?',
     bf:['The proposed split was ___ for creditors and ___ for the Dominican government.','The recorded proposal would give ___ to ___ and ___ to ___; this describes a proposal, not the final deal.']
   }
 };
 const removed=[];
 function removeRegistry(id){
   for(let i=registry.length-1;i>=0;i--)if(registry[i].id===id){registry.splice(i,1);removed.push(id);}
 }
 for(const id of investigations){
   const section=document.getElementById(id);
   if(!section)continue;
   // Do not leave empty shells from older MC and quick-writing checks.
   for(const old of [id+'_mainidea',id+'_context_direct']){
     const ctrl=document.getElementById(old);
     if(ctrl){const outer=ctrl.closest('.idls-mainidea,.idls-quick-answer');(outer||ctrl.closest('.field'))?.remove();}
     removeRegistry(old);
   }
   // Some already-retired inputs were removed by prior code, leaving empty wrappers.
   for(const box of section.querySelectorAll('.idls-mainidea,.idls-quick-answer')){
     if(!box.querySelector('[data-field]'))box.remove();
   }
   // The opening contains the specific historical prediction. Remove generic
   // headline asking essentially the same question above initial motive ranking.
   for(const group of section.querySelectorAll('.ranking-block')){
     const widget=group.querySelector('.rank-widget');
     if(!widget)continue;
     const headline=[...group.children].find(el=>el.tagName==='H3');
     if(headline)headline.remove();
   }
   // No second guess after students have already read evidence supporting the answer.
   const revised=document.getElementById(id+'_revised');
   if(revised){
     const fieldBox=revised.closest('.field');
     if(fieldBox?.previousElementSibling?.classList.contains('idls-skill-tag'))fieldBox.previousElementSibling.remove();
     fieldBox?.remove();
   }
   removeRegistry(id+'_revised');
   const investigate=document.getElementById(id+'_investigate');
   if(investigate){
     const reevaluate=[...investigate.querySelectorAll('h3')].find(h=>/^Reevaluate$/i.test(h.textContent.trim()));
     reevaluate?.remove();
     const reveal=investigate.querySelector('[data-reveal="'+id+'"]');
     if(reveal)reveal.textContent='Reveal what happened';
   }
   // Summary comparison should never claim the student made a second prediction.
   const comparison=document.getElementById(id+'_comparison');
   if(comparison)comparison.hidden=true;
   // One source-specific sentence for each authentic document, immediately
   // following the documents, then a separate comparison/inference question.
   const records=section.querySelector('.actual-source-grid');
   const close=document.getElementById(id+'_close');
   const target=records?.parentElement;
   const prompts=perSource[id];
   if(records && target && close && prompts){
     let group=section.querySelector('.idls-source-specific');
     if(!group){
       group=document.createElement('div');
       group.className='idls-source-specific';
       group.innerHTML='<h4>What does each historical source actually show?</h4>'+
         '<p class="small">Use the two sources immediately above. Answer each in one or two sentences. Your answers should include a specific detail from the source.</p>';
       records.after(group);
     }
     const oldBox=close.closest('.field');
     if(oldBox){
       const oldSkill=oldBox.previousElementSibling;
       if(oldSkill?.classList.contains('idls-skill-tag'))oldSkill.remove();
       group.appendChild(oldBox);
       const label=oldBox.querySelector('label');
       if(label)label.innerHTML=vocab(prompts.a);
       const frames=oldBox.querySelectorAll('.frame');
       frames.forEach((node,i)=>{if(prompts.af[i])node.innerHTML=vocab(prompts.af[i]);});
       const item=registry.find(f=>f.id===id+'_close');
       if(item)item.label=prompts.a;
       const example=oldBox.querySelector('.idls-close-example');
       if(example)example.remove();
       const textarea=oldBox.querySelector('textarea');if(textarea)textarea.rows=2;
     }
     if(!document.getElementById(id+'_source_b')){
       const container=document.createElement('div');
       container.innerHTML=field(id+'_source_b',prompts.b,null,prompts.bf);
       const el=container.firstElementChild;
       if(el)group.appendChild(el);
       const textarea=el?.querySelector('textarea');if(textarea)textarea.rows=2;
     }
     // Prior passive source-reading advice is replaced by questions that make
     // the source distinctions observable in student work.
     const reminder=section.querySelector('.source-thinking');
     if(reminder)reminder.remove();
   }
   const orientation=section.querySelector('.idls-section-orientation');
   if(orientation){
     for(const p of orientation.querySelectorAll('p')){
       if(p.textContent.includes('Use at least two relevant vocabulary terms')){
         p.innerHTML=vocab('<'+''); // overwritten below without flattening hidden definition nodes
         p.innerHTML='<strong>When writing:</strong> Use specific historical evidence. Vocabulary terms are available for help; two are required only in the first final synthesis answer.';
       }
     }
     // A source-reading move with no student action was repeated in the
     // orientation; source A/B questions now make that action explicit.
     orientation.querySelectorAll('.idls-optional-strategy').forEach(el=>el.remove());
   }
 }
 // More accessible wording for targeted higher-order tasks.
 const economy=document.getElementById('economy');
 const economyAnalysis=economy?.querySelector('#economy_analysis')?.closest('.field');
 if(economyAnalysis){
   const q='The export figures show that American businesses sold more goods abroad between 1870 and 1890. What are two possible reasons for this increase? Which historical information would help you decide whether either reason is correct?';
   economyAnalysis.querySelector('label').innerHTML=vocab(q);
   const frames=[
     'Exports may have increased because ___ and ___. To check these reasons, I would look for ___.',
     'One possible explanation is ___; another is ___. Evidence about ___ would help determine whether either explanation is supported.'
   ];
   economyAnalysis.querySelectorAll('.frame').forEach((el,i)=>{if(frames[i])el.innerHTML=vocab(frames[i]);});
   const entry=registry.find(f=>f.id==='economy_analysis');if(entry)entry.label=q;
 }
 const economyPower=economy?.querySelector('#economy_power')?.closest('.field');
 if(economyPower){
   const q='Suppose U.S. business leaders persuaded Congress and the president to pursue policies that helped American companies sell goods overseas. Who might gain influence—business owners, U.S. officials, workers, or people in the countries where the goods were sold? Whose choices might become more limited? Explain one possible gain and one possible cost.';
   economyPower.querySelector('label').innerHTML=vocab(q);
   const frames=[
     '___ might gain influence because ___. The choices of ___ could become more limited if ___.',
     'If business owners influenced U.S. foreign policy, ___ would gain ___, while ___ might face ___.'
   ];
   economyPower.querySelectorAll('.frame').forEach((el,i)=>{if(frames[i])el.innerHTML=vocab(frames[i]);});
   const item=registry.find(f=>f.id==='economy_power');if(item)item.label=q;
 }
 // Improve the Hawaiʻi multiple-choice judgment: an evidence-choice question
 // tied to consent, not a simple numerical guess. No keyed score in this
 // guided prediction; students will inspect the petition and sources later.
 const hawaii=document.getElementById('hawaii');
 const hawaiiInitial=document.getElementById('hawaii_initial');
 if(hawaii && hawaiiInitial){
   const question='Before examining the evidence, which combination of sources would best help you judge how widely Native Hawaiians supported or opposed U.S. annexation?';
   const options=[
     'Native Hawaiian petition signatures, information about who could sign, and the population represented',
     'Petitions from political organizations and statements from the U.S. Congress that supported annexation',
     'Statements by Hawaiian business leaders and U.S. officials about the islands’ value for trade'
   ];
   const prior=hawaiiInitial.value;
   hawaiiInitial.replaceChildren();
   const blank=document.createElement('option');blank.value='';blank.textContent='Choose your evidence strategy';
   hawaiiInitial.appendChild(blank);
   options.forEach(value=>{const o=document.createElement('option');o.value=value;o.textContent=value;hawaiiInitial.appendChild(o);});
   // Do not delete previous responses. Preserve a prior value for the present
   // session only if it still matches; historic data remain in storage.
   if(options.includes(prior))hawaiiInitial.value=prior;
   const box=hawaiiInitial.closest('.field'),label=box?.querySelector('label');
   if(label)label.innerHTML=vocab(question);
   const reg=registry.find(f=>f.id==='hawaii_initial');if(reg)reg.label=question;
   const note=document.createElement('p');note.className='small';note.textContent='Each option includes some useful information. Choose the combination you think would be strongest, then check that judgment against the historical sources.';
   box?.appendChild(note);
 }
 // Remove stale vocabulary-at-every-answer and historic-context directions.
 document.querySelectorAll('.idls-word-help').forEach(el=>{const title=el.querySelector('summary');if(title)title.textContent='Vocabulary help (optional)';});
 // At least the original evidence comparison remains available for each packet.
 const problems=[];
 for(const id of investigations){
   const el=document.getElementById(id);
   for(const requiredId of [id+'_initial',id+'_close',id+'_source_b',id+'_compare']){
     if(!el?.contains(document.getElementById(requiredId)))problems.push(id+': missing '+requiredId);
   }
   if(el?.querySelector('.idls-mainidea,.idls-quick-answer'))problems.push(id+': leftover question shell');
   if(el?.querySelector('[id="'+id+'_revised"]'))problems.push(id+': revised-prediction dropdown still present');
 }
 const dup=registry.map(x=>x.id).filter((x,i,all)=>all.indexOf(x)!==i);
 if(dup.length)problems.push('Duplicate registered fields: '+dup.join(', '));
 window.IDLS_FINAL_EDIT_AUDIT={pass:problems.length===0,issues:problems,removed};
 if(problems.length)console.warn('IDLS preview edit needs review:',problems);
 if(state){fill();completion();}
 const style=document.createElement('style');
 style.textContent='.idls-source-specific{margin:18px 0;border:1px solid #d3e1e8;border-radius:9px;padding:12px 16px;background:#f6f9fb}.idls-source-specific h4{margin:0 0 8px;color:#1d4965}.idls-source-specific .field{margin-top:14px}.idls-source-specific textarea{min-height:65px}.idls-source-specific .frame{margin:5px 0}.idls-source-specific .small{margin:5px 0 12px}.idls-section-orientation .idls-one-direction{font-size:15px}';
 document.head.appendChild(style);
})();