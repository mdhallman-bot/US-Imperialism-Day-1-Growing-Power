/* IDLS investigation-packet pilot (v1). Presentation only; leaves student save IDs and endpoints unchanged. */
'use strict';
(function(){
 const prompts={
   oregon:{q:'According to the background paragraphs above, what made it difficult to move the USS Oregon from California to Florida in 1898?',
     frames:['The Oregon had difficulty traveling because ___ and ___.','The lack of ___ made the journey harder, while ___ added another obstacle.']},
   economy:{q:'According to the background paragraphs above, how did factories, railroads, and steamships help American businesses reach customers overseas?',
     frames:['Factories ___, while railroads and steamships helped ___.','Industrial production increased ___, and improved transportation made it possible to ___.']},
   hawaii:{q:'According to the background paragraphs above, why did some Native Hawaiians oppose annexation by the United States?',
     frames:['Some Native Hawaiians opposed annexation because ___.','The historical context describes opposition to ___, particularly because ___.']},
   panama:{q:'According to the background paragraphs above, why did Colombia’s rejection of a canal agreement matter to U.S. leaders?',
     frames:['Colombia’s decision mattered because the United States wanted ___.','The rejection created a problem for U.S. plans to ___ because ___.']},
   dominican:{q:'According to the background paragraphs above, how might U.S. control of customs collection affect Dominican decision-making?',
     frames:['U.S. control of customs could limit Dominican control over ___.','Even if the arrangement helped ___, it could reduce the government’s ability to ___.']},
   china:{q:'According to the background paragraphs above, what did U.S. officials want other countries to allow in China?',
     frames:['U.S. officials wanted access to ___.','The policy sought ___ without requiring the United States to ___.']}
 };
 // China is the optional extension; the original build lacked a visible
 // background packet. Wrap its existing lead without duplicating the reading.
 const chinaSection=document.getElementById('china');
 if(chinaSection && !chinaSection.querySelector('.sourcekit')){
   const heading=chinaSection.querySelector('h2');
   const originalLead=heading?.nextElementSibling;
   const context=document.createElement('div');
   context.className='sourcekit';
   context.innerHTML='<h3>Background</h3>';
   if(originalLead?.tagName==='P'){
     // Move the real paragraph so vocabulary buttons and hidden definitions survive.
     context.appendChild(originalLead);
   }
   heading?.insertAdjacentElement('afterend',context);
   const intro=document.createElement('aside');
   intro.className='idls-section-orientation';
   intro.innerHTML='<p class="idls-driving-question">How could the United States seek commercial influence in China without annexing it?</p><p class="idls-one-direction"><strong>Your path:</strong> Read the background, predict, examine the Open Door source, and use the cartoon for a brief evidence-based interpretation.</p>';
   heading?.insertAdjacentElement('afterend',intro);
 }
 const sourceLabels={oregon:'USS Oregon records and Mahan’s argument',economy:'Trade figures and policy choices',hawaii:'Hawaiian political voices and U.S. claims',panama:'Canal plans and political authority',dominican:'Revenue allocation and Dominican sovereignty',china:'John Hay’s Open Door Note'};
 for(const [id,def] of Object.entries(prompts)){
   const section=document.getElementById(id);
   if(!section)continue;
   const context=section.querySelector('.sourcekit');
   if(!context)continue;
   const historicalTitle=[...context.children].find(x=>x.tagName==='H3' && /Historical context/i.test(x.textContent));
   if(historicalTitle)historicalTitle.textContent='Background';
   const paragraphs=[...context.children].filter(x=>x.tagName==='P'&&!x.classList.contains('small'));
   paragraphs.forEach((p,i)=>{
     if(p.dataset.packetParagraph)return;
     const num=i+1;
     p.dataset.packetParagraph=String(num);
     const marker=document.createElement('span');
     marker.className='idls-paragraph-number';
     marker.textContent=''+num+'. ';
     marker.setAttribute('aria-label','Paragraph '+num);
     p.insertBefore(marker,p.firstChild);
   });
   // Existing elements move intact; never flatten glossary-rich text with textContent.
   const orientation=section.querySelector('.idls-section-orientation');
   const heading=section.querySelector('h2');
   const packet=document.createElement('div');
   packet.className='idls-investigation-packet';
   packet.setAttribute('aria-label','One investigation: background, evidence and questions');
   const label=document.createElement('h3');
   label.className='idls-packet-title';
   label.textContent='Your investigation: Read, observe, and reason';
   packet.append(label);
   const siblings=[...section.children];
   const start=siblings.indexOf(context);
   if(start<0)continue;
   const moved=siblings.slice(start).filter(x=>x!==heading && x!==orientation && !x.classList.contains('page-actions'));
   section.insertBefore(packet,context);
   for(const node of moved)packet.appendChild(node);
   const mini=packet.querySelector('.idls-mainidea');
   // Quick context questions are brief recall, not a second long composition.
   const quick=document.createElement('div');
   quick.className='idls-quick-answer';
   quick.innerHTML='<p class="idls-quick-kicker"><strong>Quick response</strong> · One sentence</p>'+
     field(id+'_context_direct',def.q,null,def.frames,id==='china');
   const short=quick.querySelector('textarea');if(short){short.rows=2;short.maxLength=650;}
   const quickLabel=quick.querySelector('label');if(quickLabel)quickLabel.classList.add('idls-quick-label');
   const note=document.createElement('p');note.className='small';note.textContent='Answer using the numbered background paragraphs directly above. This quick response does not require two vocabulary terms.';
   quick.appendChild(note);
   // Remove the generic two-vocabulary condition only for this one-sentence fact check;
   // extended writing tasks keep their existing vocabulary credit requirement.
   if(mini)mini.after(quick);else context.after(quick);
   // Place images in the same reading packet, beside context rather than in a separate card.
   const visual=packet.querySelector('.historical-media');
   if(visual){context.after(visual);visual.classList.add('idls-packet-visual');}
   const investigation=packet.querySelector('#'+id+'_investigate');
   if(investigation){
     const oldTitle=[...investigation.children].find(x=>x.tagName==='H3'&&/Investigate the evidence/i.test(x.textContent));
     if(oldTitle)oldTitle.remove();
     const reading=investigation.querySelector(':scope > .reading');
     if(reading){
       reading.classList.add('idls-continuation');
       const firstLabel=reading.querySelector('label');
       if(firstLabel)firstLabel.textContent='Read the next part of the investigation (choose reading support if useful)';
       const select=reading.querySelector('select');
       if(select){for(const opt of select.options){if(opt.value==='full')opt.textContent='Full background';}}
     }
     const sources=investigation.querySelector('.evidence-pair');
     if(sources){
       sources.classList.add('idls-packet-sources');
       if(reading)reading.after(sources);
       const h=sources.querySelector('h3');if(h)h.textContent=sourceLabels[id]+' — historical evidence';
     }
     const chinaSource=investigation.querySelector('.china-primary-source');
     if(chinaSource){chinaSource.classList.add('idls-packet-sources');if(reading)reading.after(chinaSource);}
     const close=document.getElementById(id+'_close')?.closest('.field');
     if(close){
       const revised='Close read — In the numbered Background paragraphs above, identify one cause-and-effect explanation. Name the paragraph and a detail that supports it. What is one conclusion that those paragraphs alone cannot prove?';
       const label=close.querySelector('label');if(label)label.innerHTML=vocab(revised);
       const reg=registry.find(f=>f.id===id+'_close');if(reg)reg.label=revised;
     }
   }
   const outcome=packet.querySelector('#'+id+'_outcome');if(outcome)outcome.classList.add('idls-packet-outcome');
   packet.dataset.lessonSection=id;
 }
 // The cartoon is a small, optional continuation of the China investigation.
 const china=document.getElementById('china');
 const dest=china?.querySelector('#china_investigate');
 if(dest && !document.getElementById('idls-china-cartoon')){
   const cartoon=document.createElement('section');
   cartoon.id='idls-china-cartoon';cartoon.className='idls-cartoon-mini';
   const img='https://upload.wikimedia.org/wikipedia/commons/4/42/Stepping_Stone_to_China_Market_JUDGE_1900.jpg';
   cartoon.innerHTML='<h3>China: A political cartoon from 1900</h3>'+
     '<p><strong>Look first, then infer.</strong> The figure in red, white, and blue is Uncle Sam, representing the United States. Examine the labels, the goods he carries, and the land beneath his feet.</p>'+
     '<figure class="historical-media"><img src="'+img+'" loading="lazy" alt="Emil Flohri cartoon: Uncle Sam steps on the Philippines on his way toward China carrying industrial materials, goods, and symbols of education and religion." style="max-height:none;width:100%;height:auto" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><p class="note" hidden>Image unavailable. Open the linked archival copy to view the cartoon.</p><figcaption>Emil Flohri, “And, After All, the Philippines Are Only the Stepping-Stone to China,” <em>Judge</em>, March 21, 1900. <a href="https://commons.wikimedia.org/wiki/File:Stepping_Stone_to_China_Market_JUDGE_1900.jpg" target="_blank" rel="noopener noreferrer">Open the historical cartoon and its source</a>. Select image to enlarge.</figcaption></figure>'+
     '<p class="small">A cartoon expresses the artist’s message. It does not, by itself, prove what all Americans or Chinese people believed.</p>'+
     field('china_cartoon_notice','Notice: List two or three objects, words, people, or details you can actually see in the cartoon.',null,[
       'I notice ___, ___, and ___.','Two details that stand out are ___ and ___; I also see ___.'
     ],true)+
     field('china_cartoon_infer1','Inference 1: Why does Uncle Sam appear to use the Philippines as a stepping-stone? Use one detail from the cartoon.',null,[
       'The stepping-stone suggests ___ because ___.','By placing ___ under Uncle Sam, the cartoonist seems to imply ___; the detail ___ supports this.'
     ],true)+
     field('china_cartoon_infer2','Inference 2: What does the cartoon suggest Americans hoped to gain from access to China? Identify one labeled object or sign as evidence.',null,[
       'The cartoon suggests that Americans wanted ___; I can see ___.','The label ___ suggests ___ was important to U.S. goals because ___.'
     ],true);
   dest.appendChild(cartoon);
   for(const id of ['china_cartoon_notice','china_cartoon_infer1','china_cartoon_infer2']){
     const el=document.getElementById(id);if(el){el.rows=2;el.maxLength=800;}
   }
 }
 const style=document.createElement('style');
 style.textContent=[
 '.idls-investigation-packet{border:1px solid #d5dfe5;border-radius:12px;padding:18px 20px;background:#fff;margin-top:16px;}',
 '.idls-packet-title{color:#17364b;font-size:1.05em;border-bottom:1px solid #d9e1e5;padding-bottom:9px;margin:0 0 15px;}',
 '.idls-investigation-packet .sourcekit,.idls-investigation-packet .reading,.idls-investigation-packet .deep-analysis,.idls-investigation-packet .evidence-pair{background:transparent;border:0;box-shadow:none;padding:0;margin:12px 0;}',
 '.idls-investigation-packet .sourcekit{clear:both;}',
 '.idls-investigation-packet .sourcekit>h3{font-size:1.05em;color:#24516b;margin:5px 0 8px;}',
 '.idls-paragraph-number{font-weight:700;color:#315d76;margin-right:6px;}',
 '.idls-investigation-packet .idls-continuation{border-top:1px solid #dbe4eb;padding-top:15px;margin-top:16px;}',
 '.idls-investigation-packet .idls-packet-sources{border-top:1px solid #dbe4eb;padding-top:14px;margin-top:15px;}',
 '.idls-investigation-packet .idls-packet-sources .actual-source{background:#f7f9fb;}',
 '.idls-packet-visual figure{margin:12px 0 16px;}',
 '.idls-quick-answer{border-left:4px solid #64859a;background:#f5f8fa;padding:12px 14px;margin:14px 0;}',
 '.idls-quick-answer .idls-quick-kicker{font-size:14px;margin:0 0 4px;}',
 '.idls-quick-answer .field label{font-size:16px;}',
 '.idls-quick-answer .field textarea,.idls-cartoon-mini textarea{min-height:66px;}',
 '.idls-cartoon-mini{background:#f6f9fb;border:1px solid #ccdbe3;margin:18px 0;padding:15px 18px;}',
 '.idls-cartoon-mini h3{margin:4px 0 12px;}',
 '.idls-cartoon-mini figcaption{font-size:13px;line-height:1.5;}',
 '.idls-investigation-packet h3{margin-top:18px;}',
 '@media(max-width:700px){.idls-investigation-packet{padding:12px;}.idls-cartoon-mini{padding:12px;}}'
 ].join('');
 document.head.appendChild(style);
 if(state){fill();completion();}
})();