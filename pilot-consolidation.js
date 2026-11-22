/* IDLS preview consolidation: preserve each historical prediction, remove redundant
   context MC and short factual writing. Replace optional China investigation with a
   required five-minute cartoon observation + two evidence-based inferences.
   This operates on the preview only; never deletes saved student state. */
'use strict';
(function(){
  const main=['oregon','economy','hawaii','panama','dominican'];
  const removed=[];
  function unregister(id){
    for(let i=registry.length-1;i>=0;i--){
      if(registry[i].id===id){registry.splice(i,1);removed.push(id);}
    }
  }
  for(const id of main){
    // Context is already read before prediction; the prediction supplies the
    // necessary immediate thinking check. Later source analysis remains unchanged.
    for(const old of [id+'_mainidea',id+'_context_direct']){
      const control=document.getElementById(old);
      if(control){
        const block=control.closest('.idls-mainidea,.idls-quick-answer,.field');
        if(block && block.id!=='idls-china-cartoon')block.remove();
      }
      unregister(old);
    }
  }
  const china=document.getElementById('china');
  const cartoon=document.getElementById('idls-china-cartoon');
  if(china && cartoon){
    // Cartoon fields already exist with unique IDs, two specific sentence frames,
    // state bindings, and PDF registration. Move them intact.
    cartoon.remove();
    for(let i=registry.length-1;i>=0;i--){
      if(registry[i].id.startsWith('china_') && !registry[i].id.startsWith('china_cartoon_')){
        removed.push(registry[i].id);
        registry.splice(i,1);
      }
    }
    const oldChinaIdx=LESSON_DATA.findIndex(x=>x.id==='china');
    if(oldChinaIdx>=0)LESSON_DATA.splice(oldChinaIdx,1); // removes only obsolete stage rendering, not saved answers
    china.replaceChildren();
    const minutes=document.createElement('p');minutes.className='small';minutes.textContent='REQUIRED · About 5 minutes';
    const title=document.createElement('h2');title.textContent='China: What does this cartoon suggest about American expansion?';
    const intro=document.createElement('p');intro.innerHTML=vocab('The Philippines appear as a stepping-stone toward China. In this 1900 cartoon, look carefully at what Uncle Sam carries and what the cartoonist suggests the United States wanted. Observe first; then support two inferences with visible details.');
    china.append(minutes,title,intro,cartoon);
    cartoon.classList.add('idls-required-cartoon');
    const h=cartoon.querySelector('h3');if(h)h.textContent='Notice → Infer → Support';
    for(const id of ['china_cartoon_notice','china_cartoon_infer1','china_cartoon_infer2']){
      const item=registry.find(f=>f.id===id);
      if(item)item.optional=false;
    }
    const first=china.querySelector('textarea');
    if(first)first.setAttribute('aria-label','Observe two or three visible cartoon details');
    // Do not demand two vocabulary terms for three short observations/inferences.
    const extra=document.createElement('p');extra.className='small';
    extra.innerHTML='<strong>Time:</strong> About 5 minutes total. List 2–3 things you notice, then answer the two inference questions in one sentence each. Use a visible cartoon detail as evidence; two vocabulary terms are not required for these brief responses.';
    cartoon.querySelector('h3')?.insertAdjacentElement('afterend',extra);
    const caption=cartoon.querySelector('figcaption');
    if(caption)caption.dataset.idlsVerifiedCaption='Flohri Judge 1900';
  }
  // Text elsewhere was written before the section became required.
  for(const p of document.querySelectorAll('#work > section p')){
    const t=p.textContent||'';
    if(t.includes('the China investigation is optional')){
      // This is a plain paragraph already glossary-annotated; replace with fresh
      // glossary-aware HTML rather than leaking hidden definition text.
      p.innerHTML=vocab('Work independently. Predict first, then examine historical evidence, reconsider your judgment, and reveal the outcome. Complete every required response, including the five-minute China cartoon. Hover, tap or focus underlined words for definitions. Use reading help whenever needed.');
    }
  }
  // The model's completion credit is derived from registry; future responses
  // will use the updated required set. Old answers remain in state for safety.
  const scope=new Set(main.map(id=>id+'_mainidea').concat(main.map(id=>id+'_context_direct')));
  const remaining=registry.filter(f=>scope.has(f.id)||f.id.startsWith('china_')&&!f.id.startsWith('china_cartoon_'));
  const audit={
    removedIds:removed,
    danglingRegistry:remaining.map(x=>x.id),
    missingRequiredChina:['china_cartoon_notice','china_cartoon_infer1','china_cartoon_infer2'].filter(id=>!registry.some(f=>f.id===id&&!f.optional)),
    duplicateIds:[...new Set(registry.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i))],
    requiredQuickChecks:[...document.querySelectorAll('.idls-mainidea,.idls-quick-answer')].length,
    chinaStillInStageData:LESSON_DATA.some(s=>s.id==='china')
  };
  audit.ok= !audit.danglingRegistry.length&&!audit.missingRequiredChina.length&&!audit.duplicateIds.length&&!audit.requiredQuickChecks&&!audit.chinaStillInStageData;
  window.IDLS_CONSOLIDATION_AUDIT=audit;
  if(!audit.ok)console.warn('IDLS section consolidation requires review',audit);
  if(state){fill();completion();}
})();