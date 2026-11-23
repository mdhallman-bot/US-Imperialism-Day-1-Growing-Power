/* IDLS mock preview enhancements: not connected to student cloud storage. */
'use strict';
(function(){
const terms={
oregon:['naval readiness','strategic','coaling station','projection of power','geographic constraint'],
economy:['exports','nominal dollars','commercial interest','industrial capacity','causal claim'],
hawaii:['sovereignty','annexation','petition','consent of the governed','commercial leverage'],
panama:['isthmus','treaty','sovereignty','strategic alternative','labor conditions'],
dominican:['customs revenue','creditor','intervention','financial control','Roosevelt Corollary'],
china:['Open Door Policy','trade access','sphere of influence','sovereignty','commercial interest'],
synthesis:['economic growth','naval power','annexation','sovereignty','evidence','perspective','causation']
};
const checks=[
['oregon','What is the main problem described in the historical context?',['The Oregon needed coal and faced a very long route between oceans.','The Oregon lacked an engine and could not sail.','The Panama Canal was too crowded for warships.'],0,'Geography and access to fuel limited the navy.'],
['economy','How did industrialization relate to growing U.S. interest overseas?',['It stopped the United States from exporting goods.','It increased interest in foreign markets and shipping routes.','It proved that taking territory was necessary.'],1,'Industrial growth increased incentives for commercial access.'],
['hawaii','What central conflict does the historical context about Hawaiʻi introduce?',['All Native Hawaiians welcomed annexation.','Hawaiʻi had no economic or naval value.','U.S. interests conflicted with Hawaiian sovereignty and consent.'],2,'Outside strategic interests and Hawaiian self-government could conflict.'],
['panama','What issue complicated the U.S. plan to build a Panama Canal?',['A canal raised questions of who controlled the land and decisions.','A route between oceans had no strategic value.','Colombia had agreed to every U.S. demand.'],0,'Canal plans had strategic benefits and sovereignty costs.'],
['dominican','What did the Dominican customs arrangement illustrate?',['The United States annexed every Caribbean country.','Controlling finances could extend influence without annexation.','Dominican officials controlled all collected revenue.'],1,'Financial control could exert power without territorial annexation.'],
['china','What was the central U.S. goal behind the Open Door approach?',['End all American trade with China.','Annex the whole of China.','Protect commercial access without annexing China.'],2,'The policy sought access to markets, not formal territorial control.']
];
for(const [section,question,choices,key,explanation] of checks){
 const context=$(section)?.querySelector('.sourcekit');if(!context)continue;
 const id=section+'_mainidea',box=document.createElement('div');box.className='idls-mainidea';
 box.innerHTML='<p><strong>10-second historical context check</strong></p>'+field(id,question,choices,[],section==='china')+'<p class="small" id="'+id+'_feedback" aria-live="polite"></p>';
 context.insertAdjacentElement('afterend',box);
}
const writers=registry.filter(f=>$(f.id)?.tagName==='TEXTAREA');
for(const f of writers){
 if(f.id!=='synthesis_1')continue; // selective historical vocabulary: full synthesis only
 const section=f.id.startsWith('synthesis_')?'synthesis':f.id.split('_')[0];
 f.idlsTerms=terms[section]||terms.synthesis;
 const note=document.createElement('div');note.className='idls-writing-vocab';
 note.innerHTML='<strong>Required: Use at least TWO different vocabulary terms in this answer.</strong> Choose from: '+
 f.idlsTerms.map(x=>'<span>'+vocab(x)+'</span>').join(' · ')+
 '. <strong>Full completion credit</strong> with two terms; <strong>half credit</strong> if fewer than two are included. <span class="idls-term-status" id="'+f.id+'_term_status" aria-live="polite"></span>';
 $(f.id).insertAdjacentElement('beforebegin',note);
}
function foundWords(value,words){
 const text=String(value||'').toLocaleLowerCase().replace(/[’']/g,"'").replace(/[\u2010-\u2015]/g,'-');
 return words.filter(word=>{
  const w=word.toLocaleLowerCase().replace(/[’']/g,"'").replace(/[.*+?^$()|[\]{}\\]/g,'\\$&').replace(/ /g,'\\s+');
  return new RegExp('(^|[^a-z])'+w+'(?:s|es)?(?=$|[^a-z])','i').test(text);
 });
}
function summary(){
 const required=registry.filter(f=>!f.optional);let filled=0,credit=0;const deductions=[];
 for(const f of required){
  const answer=(state?.fields?.[f.id]||'').trim();if(!answer)continue;
  filled++;
  if(f.idlsTerms){
   const matched=foundWords(answer,f.idlsTerms);
   if(matched.length<2){credit+=.5;deductions.push({id:f.id,found:matched.length});continue;}
  }
  credit++;
 }
 return {filled,credit,total:required.length,deductions};
}
function feedback(){
 if(!state)return;
 for(const f of writers){
  const target=$(f.id+'_term_status');if(!target)continue;
  const answer=state.fields[f.id]||'',matches=foundWords(answer,f.idlsTerms);
  target.textContent=!answer.trim()?'Not answered yet.':matches.length>=2?'Terms detected: '+matches.join(', ')+'.':'Detected '+matches.length+'/2 terms — half credit so far.';
 }
 for(const [section,question,choices,key,explanation] of checks){
  const id=section+'_mainidea',target=$(id+'_feedback');if(!target)continue;
  const val=state.fields[id],choice=choices.indexOf(val);
  target.textContent=choice===-1?'':choice===key?'Correct. '+explanation:'Review the main idea: '+explanation;
 }
}
const oldCompletion=completion;
completion=function(){
 if(!state)return oldCompletion();
 const s=summary(),pct=s.total?Math.round(100*s.credit/s.total):100;
 const result='Completion grade (vocabulary-adjusted): '+pct+'% ('+s.credit+'/'+s.total+' credits; '+s.filled+'/'+s.total+' required responses filled)';
 $('completion').textContent=result;
 const x=$('idls-vocab-summary');if(x)x.textContent=s.deductions.length?'Half-credit written responses: '+s.deductions.map(d=>d.id+' ('+d.found+'/2 terms)').join('; '):'No vocabulary deductions on completed responses.';
 return result;
};
const oldFill=fill;fill=function(){oldFill();feedback()};
const oldReport=report;report=function(){
 const s=summary();
 return [{label:'Vocabulary-adjusted completion details',answer:s.deductions.length?s.deductions.map(d=>d.id+': '+d.found+' of 2 terms detected; half credit').join('; '):'No vocabulary deductions'}].concat(oldReport());
};
document.addEventListener('input',e=>{if(e.target.matches('textarea[data-field]'))setTimeout(()=>{feedback();completion()},0)});
document.addEventListener('change',e=>{if(e.target.id.endsWith('_mainidea'))setTimeout(()=>{feedback();completion()},0)});
const finish=$('finish');
finish?.insertAdjacentHTML('afterbegin','<div class="note"><strong>How completion credit works:</strong> A selected answer earns one completion credit. Only the first final synthesis response requires two listed vocabulary terms for full completion credit (half credit if it is answered without two terms). Other completed responses receive normal completion credit. Blank required responses receive zero. Vocabulary detection checks for words, not whether they are used correctly. This grade measures completion requirements, NOT historical accuracy.</div><p id="idls-vocab-summary" class="small" aria-live="polite"></p>');
const style=document.createElement('style');style.textContent='.idls-mainidea,.idls-writing-vocab{background:#f1f6fa;border-left:4px solid #507c96;border-radius:6px;padding:12px 15px;margin:12px 0}.idls-mainidea{border:1px solid #c3d7e5}.idls-writing-vocab{font-size:14px;line-height:1.6}.idls-term-status{display:block;font-weight:650;margin-top:5px}';document.head.append(style);
})();
