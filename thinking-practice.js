/* Thinking Like a Historian — ungraded skill rehearsal.
   Uses the established optional field() / registry, saving, restoration, PDF pathway.
   No changes to existing fields, completion rules, or backend.
*/
(function () {
  'use strict';
  const introduction=document.querySelector('#work > section:not(#finish)');
  if(!introduction || !document.getElementById('nav'))return;

  const examples=[
    {
      id:'intro_causation_practice',
      label:'A school moved its start time from 7:30 to 8:30 a.m. The next month, attendance improved. What is the most defensible conclusion?',
      options:[
        'The later start time definitely caused better attendance.',
        'The start-time change may have helped, but other factors could also explain the improvement.',
        'The later start time could not have affected attendance.'
      ],
      correct:1,
      skill:'Causation and perspective',
      title:'1. Causation: Does one change explain another?',
      story:'Imagine your school moves its start time from 7:30 to 8:30 a.m. During the next month, more students attend class. You want to explain why.',
      task:'Decide what this information does—and does not—establish about the cause of better attendance.',
      success:'Recognize the difference between a possible cause and a cause proven by evidence.',
      feedback:'The attendance increase followed the schedule change, so the later start could be a contributing cause. But it is not proven. Transportation, weather, attendance rules, or differences in the students counted might also help explain the change.',
      bridge:'Later, when exports rise as the United States expands overseas, we will ask: Does this trend prove that imperialism caused the growth?',
      word:'A cause is something that helps produce an event. A causal claim argues that one thing helped cause another.'
    },
    {
      id:'intro_corroboration_practice',
      label:'Two students witnessed an incident. Student A says Jordan pushed Sam for no reason. Student B says they saw Jordan push Sam but did not see what happened beforehand. What do the accounts establish together?',
      options:[
        'Both accounts support that Jordan pushed Sam, but the reason for the push remains uncertain.',
        'Both students prove that Jordan pushed Sam without any reason.',
        'The two accounts disagree about whether Jordan pushed Sam.'
      ],
      correct:0,
      skill:'Corroboration and limits',
      title:'2. Corroboration: What can two accounts establish?',
      story:'Two students describe an incident in a hallway. Student A says, “Jordan pushed Sam for no reason.” Student B says, “I saw Jordan push Sam, but I didn’t see what happened before that.”',
      task:'Compare the accounts. Identify what both support and what remains uncertain.',
      success:'Explain where accounts agree without assuming that they prove every detail or motive.',
      feedback:'Both accounts support the conclusion that a push occurred. They do not jointly establish why it happened: Student B did not see what came before. A camera recording or another firsthand account might help, though it could have limits too.',
      bridge:'In Section 1, a Navy report records what happened while Mahan argues for a naval policy. Ask whether the two sources prove the same conclusion.',
      word:'To corroborate is to compare sources to see what they confirm or challenge. A source’s limits are things it cannot tell us.'
    }
  ];

  const section=document.createElement('div');
  section.className='thinking-practice';
  section.innerHTML='<h3>Thinking Like a Historian</h3>'+
    '<p class="thinking-intro">Before investigating the USS <em>Oregon</em>, try two everyday examples of the same thinking skills identified in your learning report. These are <strong>ungraded practice</strong>. You will get feedback about the reasoning, not points for guessing correctly.</p>';
  for(const x of examples){
    const card=document.createElement('div');card.className='thinking-example';
    card.innerHTML='<div class="thinking-skill-label">'+vocab(x.skill)+' · Learning-report skill</div>'+
      '<h4>'+vocab(x.title)+'</h4>'+
      '<p>'+vocab(x.story)+'</p>'+
      '<p class="thinking-guidance"><strong>Your task:</strong> '+vocab(x.task)+'</p>'+
      '<p class="thinking-guidance"><strong>Success looks like:</strong> '+vocab(x.success)+'</p>'+
      '<p class="thinking-word">'+vocab(x.word)+'</p>'+
      field(x.id,x.label,x.options,null,true)+
      '<button type="button" class="thinking-check" data-skill-check="'+x.id+'">Check my reasoning</button>'+
      '<div class="thinking-feedback" id="'+x.id+'_feedback" role="status" aria-live="polite" hidden></div>';
    section.append(card);
  }
  const note=document.createElement('p');
  note.className='thinking-transition';
  note.textContent='The examples above are practice. Now apply the same habits of thinking to real historical decisions and documents.';
  section.append(note);
  introduction.insertBefore(section,document.getElementById('nav'));

  const byId=Object.fromEntries(examples.map(x=>[x.id,x]));
  document.addEventListener('click',event=>{
    const btn=event.target.closest('[data-skill-check]');
    if(!btn)return;
    const info=byId[btn.dataset.skillCheck];
    if(!info||!state)return;
    const value=document.getElementById(info.id)?.value||'';
    if(!value){document.getElementById(info.id)?.focus();alert('Select the conclusion you think is best supported, then check your reasoning.');return}
    const correct=value===info.options[info.correct];
    const feedback=document.getElementById(info.id+'_feedback');
    feedback.hidden=false;
    feedback.innerHTML='<strong>'+(correct?'Well-supported reasoning.':'Consider what the evidence actually shows.')+'</strong><p>'+vocab(info.feedback)+'</p><p><strong>Historical connection:</strong> '+vocab(info.bridge)+'</p>';
  });

  const style=document.createElement('style');
  style.textContent='.thinking-practice{margin:24px 0 8px;padding:20px;border:1px solid #cddce7;border-radius:10px;background:#f7fafc}.thinking-practice>h3{margin-top:0;color:#17364b}.thinking-intro{margin-bottom:18px}.thinking-example{border:1px solid #d2dbe1;border-radius:9px;background:white;padding:18px;margin:16px 0}.thinking-example h4{font-size:19px;margin:6px 0 12px;color:#17364b}.thinking-skill-label{font-size:13px;font-weight:700;color:#255c80}.thinking-guidance{margin:8px 0;font-size:15px}.thinking-word{background:#edf5fa;padding:9px;font-size:14px;border-left:3px solid #6291b2}.thinking-feedback{background:#f3f7f0;border-left:3px solid #688d5c;margin-top:12px;padding:12px}.thinking-feedback p{margin:8px 0}.thinking-transition{font-weight:600;margin-top:18px}';
  document.head.append(style);
})();