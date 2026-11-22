/* IDLS preview typography regression fix.
 * Applies uniformly to history, source descriptions, orientations and prompts.
 * Preserves text, glossary accessibility, response field IDs, scoring and saving.
 */
(function(){
  'use strict';
  const css=document.createElement('style');
  css.textContent=[
    '.sourcekit p,.sourcekit li,.sourcekit blockquote,.historical-media figcaption,.idls-section-orientation p,.deep-analysis p,.actual-source p,.source-context,.field label,.idls-mainidea p {',
    ' font-family:inherit; font-kerning:normal; letter-spacing:normal; word-spacing:normal;',
    ' white-space:normal; overflow-wrap:break-word; line-height:1.65; text-wrap:pretty;',
    '}',
    // A glossary entry is text within a sentence, not a standalone form button.
    '.sourcekit .term,.idls-section-orientation .term,.deep-analysis .term,.actual-source .term,.field label .term,.historical-media .term,.idls-mainidea .term {',
    ' display:inline; vertical-align:baseline; white-space:normal;',
    ' font:inherit; font-weight:inherit; line-height:inherit; letter-spacing:inherit;',
    ' word-spacing:inherit; margin:0; padding:0; border:0; border-radius:0;',
    ' background:none; color:#215b83; text-decoration:underline dotted;',
    '}',
    '.sourcekit p .def,.idls-section-orientation p .def,.deep-analysis p .def {line-height:1.45; white-space:normal;}',
    '@media(max-width:710px){.sourcekit .context-float-map{float:none;width:100%;max-width:480px;margin:10px 0 16px;} }'
  ].join('');
  document.head.appendChild(css);
  // One-time, non-mutating audit of every historical context section.
  const ids=['oregon','economy','hawaii','panama','dominican','china'];
  const issues=[];
  for(const id of ids){
    const section=document.getElementById(id),context=section?.querySelector('.sourcekit');
    if(!context){issues.push(id+': missing context container');continue;}
    const paragraphs=[...context.querySelectorAll(':scope > p')];
    if(!paragraphs.length)issues.push(id+': no historical-context paragraphs');
    for(const p of paragraphs){
      const t=p.textContent||'';
      if(/[\u200b-\u200d\u2060]/.test(t))issues.push(id+': zero-width character found');
      if(/\s{4,}/.test(t))issues.push(id+': excess whitespace found');
      if(p.querySelector('button button'))issues.push(id+': nested definition button');
    }
  }
  // Regression for the Nov 21 glossary leak: hidden .def nodes must stay hidden
  // after sections are rearranged; never flatten DOM-rich text using textContent.
  for(const section of document.querySelectorAll('.idls-section-orientation,.sourcekit')){
    for(const def of section.querySelectorAll('.def[hidden]')){
      if(getComputedStyle(def).display!=='none')issues.push('hidden glossary definition became visible');
    }
  }
  // Intro directions should contain no flattened definition text.
  for(const p of document.querySelectorAll('.idls-section-purpose')){
    if(/contextThe surrounding historical circumstances|investigatestudy carefully|navalrelated to a navy/i.test(p.textContent))
      issues.push('flattened glossary definition detected in section introduction');
  }
  if(issues.length)console.warn('IDLS historical-context typography audit:',issues);
})();