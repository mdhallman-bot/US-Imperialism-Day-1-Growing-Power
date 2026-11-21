/* IDLS Visible Intellectual Purpose — presentation only.
   No changes to field IDs, completion, saving, backend or PDF. */
(function () {
'use strict';
const skill={
knowledge:'Historical knowledge',
evidence:'Evidence selection',
inference:'Inference and interpretation',
corroboration:'Corroboration and limits',
causation:'Causation and perspective'
};
const scenarios={
oregon:{focus:'the 1898 voyage of the USS Oregon between San Francisco and Florida',claim:'a claim that geography limited American naval operations',sources:'the 1898 Navy account and Alfred Thayer Mahan’s argument about naval strategy',motives:'why U.S. leaders wanted greater naval reach and overseas ports',power:'American naval leaders, sailors and people living near proposed naval bases'},
economy:{focus:'the growth of American exports between 1870 and 1900',claim:'a claim that industrialization encouraged overseas commercial interests',sources:'historical export statistics and Mahan’s argument about commercial shipping',motives:'why American businesses and officials sought overseas economic influence',power:'American business leaders, U.S. policymakers and people affected by trade decisions'},
hawaii:{focus:'organized Hawaiian opposition to U.S. annexation in 1897',claim:'a claim about growing American influence in Hawaiʻi',sources:'Queen Liliʻuokalani’s protest and the U.S. annexation resolution',power:'U.S. officials, Native Hawaiian political organizations and the Hawaiian monarchy'},
panama:{focus:'Roosevelt’s response to Colombia’s rejection of the 1903 canal treaty',claim:'a claim about how trade and military distance encouraged a canal',sources:'the 1903 canal treaty and documented Panamanian support for the project',motives:'why U.S. leaders pursued and sought control of a Panama canal',power:'U.S. officials, Colombia, Panamanian groups and canal workers'},
dominican:{focus:'the 1905 arrangement for Dominican customs revenue',claim:'a claim linking Dominican debt, European pressure and U.S. intervention',sources:'Roosevelt’s justification and diplomatic evidence about Dominican customs',power:'Dominican officials, American administrators and foreign creditors'},
china:{focus:'U.S. demands for commercial access to China in 1899',power:'Chinese authorities and foreign powers seeking trade access'}
};
const tasks={
prediction:{skill:'inference',task:s=>'Make an initial prediction about '+s.focus+'.',success:'Use the historical situation to make a reasonable prediction. Your first answer is a starting point for investigation, not a graded guess.'},
rank_first:{skill:'causation',task:s=>'Rank competing motives for '+s.motives+'.',success:'Explain why your top motive appears stronger than another one based on what you know so far.'},
close:{skill:'evidence',task:s=>'Find specific textual evidence supporting '+s.claim+'.',success:'Identify a detail or phrase that supports the claim, and explain something the reading cannot establish.'},
compare:{skill:'corroboration',task:s=>'Compare '+s.sources+'.',success:'Explain what each source establishes, how they support or complicate each other, and what evidence is still missing.'},
analysis:{skill:'inference',task:s=>({
oregon:'Decide whether the USS Oregon voyage better supports the need for a canal or for overseas naval bases.',
economy:'Judge whether rising export values prove that imperialism caused American trade growth.',
hawaii:'Distinguish Hawaiʻi’s strategic location from evidence about consent to annexation.',
panama:'Assess whether a canal’s advantages prove U.S. control was the only possible policy.',
dominican:'Determine whether control of Dominican revenue could be a form of imperial power without annexation.'
})[s.id]||'Evaluate the historical explanation.',success:'Defend a plausible interpretation using evidence while recognizing what the evidence does not prove.'},
power:{skill:'causation',task:s=>'Analyze whose power changed: '+s.power+'.',success:'Identify who could make decisions, who experienced limits, and why those differences mattered.'},
rank_second:{skill:'causation',task:s=>'Re-rank the motives for '+s.motives+' after investigating evidence.',success:'Defend your final order with a historical detail. Changing your ranking is not required; sound reasoning is.'},
revised:{skill:'inference',task:s=>'Revisit your original prediction about '+s.focus+' before the historical reveal.',success:'Explain to yourself how the evidence supports your revised estimate or strengthens your original judgment.'},
after:{skill:'causation',task:s=>'Explain what the revealed outcome means for '+s.focus+'.',success:'Connect a historical result to an earlier cause or decision instead of simply reporting the answer.'}
};
function panel(skillName,task,success,compact){
const el=document.createElement('div');el.className='idls-purpose'+(compact?' compact':'');el.setAttribute('role','note');
const head=document.createElement('div');head.className='idls-purpose-head';head.textContent=skill[skillName]+'  ·  Skill from your learning report';
const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent='Your task: ';p.append(strong,task);
const q=document.createElement('p');const successStrong=document.createElement('strong');successStrong.textContent='Success looks like: ';q.append(successStrong,success);
el.append(head,p,q);return el;
}
function beforeField(id,kind,s){
const field=document.getElementById(id)?.closest('.field');const spec=tasks[kind];
if(field&&spec)field.before(panel(spec.skill,spec.task(s),spec.success,true));
}
function beforeRank(id,kind,s){
const el=document.querySelector('[data-rank="'+id+'"]'),spec=tasks[kind];
if(el&&spec)el.before(panel(spec.skill,spec.task(s),spec.success,false));
}
const intro=document.querySelector('#work > section:not(#finish)');
if(intro){
const heading=intro.querySelector('h2');
if(heading){const note=document.createElement('aside');note.className='idls-goals';note.innerHTML='<strong>Connect today’s work to your learning report.</strong> The skill labels in this lesson match the five categories in your report. If a skill is one of your goals, look for its name beside an activity and use the “Success looks like” statement to guide your work. You do not need to share your individual results.';heading.after(note)}
}
for(const [id,s] of Object.entries(scenarios)){
s.id=id;const section=document.getElementById(id);if(!section)continue;
const h=section.querySelector('h2');if(h){const n=document.createElement('div');n.className='idls-skill-note';n.textContent='You will see historical-thinking skill labels throughout this investigation. These match the categories on your learning report.';h.after(n)}
beforeField(id+'_initial','prediction',s);
beforeField(id+'_close','close',s);
beforeField(id+'_compare','compare',s);
beforeField(id+'_analysis','analysis',s);
beforeField(id+'_power','power',s);
beforeField(id+'_revised','revised',s);
beforeField(id+'_after','after',s);
if(s.motives){beforeRank(id+'_rank_first','rank_first',s);beforeRank(id+'_rank_second','rank_second',s)}
}
const synth=document.getElementById('synthesis');
if(synth){
const f1=document.getElementById('synthesis_1')?.closest('.field');
if(f1)f1.before(panel('knowledge','Recall specific economic and military examples from the unit and connect them in an explanation.','Use accurate historical examples and explain how they contributed to American expansion, rather than listing facts.',false));
const f2=document.getElementById('synthesis_2')?.closest('.field');
if(f2)f2.before(panel('corroboration','Identify what further historical evidence is needed to judge whether U.S. expansion was justified.','Describe what the available sources establish, whose perspective is missing and why more evidence would matter.',false));
}
const style=document.createElement('style');
style.textContent='.idls-goals{margin:14px 0 22px;padding:12px 15px;background:#edf4f8;border-left:4px solid #497b9c;border-radius:5px;line-height:1.5}.idls-skill-note{font-size:13px;color:#486174;margin:4px 0 16px}.idls-purpose{margin:18px 0 9px;border-left:3px solid #6a96b3;padding:10px 13px;background:#f3f8fa;border-radius:0 6px 6px 0}.idls-purpose.compact{margin:13px 0 7px;padding:8px 11px}.idls-purpose-head{font-size:12px;font-weight:750;color:#22577b;letter-spacing:.01em}.idls-purpose p{font-size:14px;line-height:1.5;margin:5px 0}.idls-purpose.compact p{font-size:13.5px}.idls-purpose strong{color:#17364b}';
document.head.append(style);
})();