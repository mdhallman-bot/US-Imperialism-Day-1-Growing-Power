/* Student Learning Check v2: student-facing questions only. No answer key or
 teacher rationales exist in this file. Scoring/analytics requires separately
 deployed teacher-only Learning Evidence Apps Script. */
'use strict';
(function(){
  const CHECK_VERSION='student-v2',q=[{"id":"U4-D2-Q1","skill":"Corroboration and limits","cognitive":"analysis","stimulus":"multiple_sources","prompt":"A Navy report records officials arranging coal for the USS Oregon in 1898. Alfred Thayer Mahan argued in 1890 that a powerful navy needed access to distant stations. What further evidence would most directly test a claim that the U.S. had to annex foreign land to obtain such access?","source":"Source A: 1898 Navy report describes arranging coal for a warship. Source B: Mahan’s 1890 writing argues that distant naval operations require supporting stations. Both are summarized here; the lesson contains original source excerpts.","choices":["Whether U.S. ship crews were as large as those aboard European battleships in 1898","Whether agreements with independent countries could provide reliable coal access","Whether American steel production could meet the navy’s demand for ships","Whether naval strategists agreed on which types of warship were best"]},{"id":"U4-D2-Q2","skill":"Inference and interpretation","cognitive":"analysis","stimulus":"graph_quantitative","prompt":"The table shows U.S. merchandise exports in nominal dollars. Which conclusion is best justified by these figures alone?","source":"Historical Statistics of the United States (figures used in this lesson): 1870 — approximately $451 million; 1900 — approximately $1,499 million. Nominal dollars show money values without adjusting for changes in prices. For example, if a shirt costs $5 one year and $10 later, the price doubled even if the same number of shirts were sold.","choices":["Every American family experienced a comparable gain in purchasing power","Overseas annexation caused most of the observed increase in export value","Price increases explain almost the entire rise in nominal export value","The dollar value of exports rose, but the figures alone cannot establish why"]},{"id":"U4-D2-Q3","skill":"Causation and perspective","cognitive":"analysis","stimulus":"multiple_sources","prompt":"In 1897, Native Hawaiian petitioners opposed U.S. annexation. In 1898, the U.S. Congress approved a resolution annexing Hawaiʻi. Which interpretation most carefully accounts for both?","source":"Historical record (summarized): Native Hawaiians organized substantial opposition to annexation in 1897; U.S. congressional action proceeded in 1898. Congress did not hold a vote of Hawaiian residents about annexation.","choices":["U.S. officials could exercise political power despite organized Native Hawaiian opposition","Congressional approval demonstrated that most Hawaiian residents favored U.S. rule after being consulted","Anti-annexation petitions show that American investors abandoned Hawaiian trade","The protests show that no Hawaiians supported any political or trading ties"]},{"id":"U4-D2-Q4","skill":"Causation and perspective","cognitive":"application","stimulus":"secondary_source_text","prompt":"Colombia rejected a 1903 canal treaty. The United States then supported Panama’s separation from Colombia and negotiated canal rights with the new Panamanian government. Which question best investigates who gained and who lost decision-making power?","source":"Historical sequence (teacher-written summary): Colombia rejects proposed canal agreement → Panama declares independence with U.S. support → U.S. gains canal rights through a new agreement.","choices":["Would completed canal construction shorten shipping routes for American businesses?","Were U.S. battleships generally made from steel rather than older materials?","How did the events change who could decide canal policy in Colombia, Panama, and the U.S.?","Did traffic through the canal later exceed the estimates of its original planners?"]},{"id":"U4-D2-Q5","skill":"Evidence selection","cognitive":"analysis","stimulus":"secondary_source_text","prompt":"In 1905, U.S. officials helped collect and manage customs taxes in the Dominican Republic. The arrangement reserved 55% of customs revenue for creditor claims and 45% for the Dominican government. Which additional source would be strongest for evaluating how Dominicans judged the arrangement?","source":"Historical arrangement (teacher-written summary based on the 1905 Dominican customs agreement): 55% of collected customs revenue reserved for creditors; 45% delivered to the Dominican government.","choices":["A U.S. naval inventory describing Caribbean patrol ships and supplies in 1905","Dominican newspapers, legislative debates, and petitions discussing the agreement","A geography reference calculating travel distances from Santo Domingo to New York in 1905","A U.S. report on manufactured products exported from 1870 to 1900"]}];
  const root=document.createElement('article');root.id='idls-check';
  root.innerHTML='<p class="small">Independent learning check · approximately 6–8 minutes</p><h2>Final Summary Multiple-Choice Questions</h2>'+
    '<p>Answer all five questions independently. Use the evidence and historical reasoning you practiced in this investigation. Your selections are saved with the rest of your assignment.</p>'+
    '<div id="idls-questions"></div><button type="button" id="idls-submit">Save final answers</button><p id="idls-score" class="note" role="status" aria-live="polite"></p>'+
    '<p class="small">Your completion grade reflects work submitted, not whether multiple-choice answers are correct.</p>';
  $('finish').insertAdjacentElement('afterbegin',root);
  const holder=$('idls-questions');
  for(const item of q){
    const section=document.createElement('div');section.className='idls-check-question';
    section.style.cssText='padding:15px;margin:14px 0;border:1px solid #d0dde6;border-radius:9px;background:#f8fbfc';
    section.innerHTML='<p class="small"><strong>'+esc(item.id)+'</strong></p><p class="reading">'+vocab(item.source)+'</p>'+
      field('idls_'+item.id,item.prompt,item.choices,[],false);
    holder.append(section);
  }
  function status(){
    if(!state)return;
    const complete=q.filter(item=>state.fields['idls_'+item.id]).length;
    const saved=state.fields.idls_student_check_submitted==='yes';
    $('idls-score').textContent=saved
      ? 'All five answers have been recorded with your assignment. Save your work and download your PDF.'
      : complete+' of five questions answered.';
    $('idls-submit').disabled=complete!==q.length;
  }
  $('idls-submit').addEventListener('click',()=>{
    if(!state)return;
    const missing=q.find(item=>!state.fields['idls_'+item.id]);
    if(missing){$( 'idls_'+missing.id).focus();return}
    state.fields.idls_student_check_submitted='yes';changed();status();
  });
  const prevFill=fill;fill=function(){prevFill();status()};
  document.addEventListener('change',e=>{if(e.target.id.startsWith('idls_'))setTimeout(status,0)});
  window.IDLS_STUDENT_CHECK_META=q.map(({id,skill,cognitive,stimulus})=>({id,skill,cognitive,stimulus,check_version:CHECK_VERSION}));
})();