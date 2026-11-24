/* IDLS mock-student preview. Scoring runs in the Learning Evidence web app. */
'use strict';
(function(){
const ENDPOINT='https://script.google.com/macros/s/AKfycbxsiAq4Uw-W8KcsSAmAB-YLtE6F1JsPTQ3b5e1x5St3-XiHgw8p7n66RomMIPqARi0J/exec';
const CHECK_VERSION='pilot-v2', q=[
{id:'U4-D2-Q1',skill:'Corroboration and limits',cognitive:'Analysis',questionType:'Analysis / Historical text',
 prompt:'A Navy report records officials arranging coal for the USS Oregon in 1898. Alfred Thayer Mahan argued in 1890 that a powerful navy needed access to distant stations. What further evidence would most directly test a claim that the U.S. had to annex foreign land to obtain such access?',
 source:'Source A: 1898 Navy report describes arranging coal for a warship. Source B: Mahan’s 1890 writing argues that distant naval operations require supporting stations. Both are summarized here; the lesson contains original source excerpts.',
 choices:['Whether U.S. ship crews were as large as those aboard European battleships in 1898','Whether agreements with independent countries could provide reliable coal access','Whether American steel production could meet the navy’s demand for ships','Whether naval strategists agreed on which types of warship were best']},
{id:'U4-D2-Q2',skill:'Inference and interpretation',cognitive:'Analysis',questionType:'Analysis / Data',
 prompt:'The table shows U.S. merchandise exports in nominal dollars. Which conclusion is best justified by these figures alone?',
 source:'Historical Statistics of the United States (figures used in this lesson): 1870 — approximately $451 million; 1900 — approximately $1,499 million. Nominal dollars show money values without adjusting for changes in prices. For example, if a shirt costs $5 one year and $10 later, the price doubled even if the same number of shirts were sold.',
 choices:['Every American family experienced a comparable gain in purchasing power','Overseas annexation caused most of the observed increase in export value','Price increases explain almost the entire rise in nominal export value','The dollar value of exports rose, but the figures alone cannot establish why']},
{id:'U4-D2-Q3',skill:'Causation and perspective',cognitive:'Analysis',questionType:'Analysis / Historical text',
 prompt:'In 1897, Native Hawaiian petitioners opposed U.S. annexation. In 1898, the U.S. Congress approved a resolution annexing Hawaiʻi. Which interpretation most carefully accounts for both?',
 source:'Historical record (summarized): Native Hawaiians organized substantial opposition to annexation in 1897; U.S. congressional action proceeded in 1898. Congress did not hold a vote of Hawaiian residents about annexation.',
 choices:['U.S. officials could exercise political power despite organized Native Hawaiian opposition','Congressional approval demonstrated that most Hawaiian residents favored U.S. rule after being consulted','Anti-annexation petitions show that American investors abandoned Hawaiian trade','The protests show that no Hawaiians supported any political or trading ties']},
{id:'U4-D2-Q4',skill:'Causation and perspective',cognitive:'Application',questionType:'Application / Historical scenario/knowledge',
 prompt:'Colombia rejected a 1903 canal treaty. The United States then supported Panama’s separation from Colombia and negotiated canal rights with the new Panamanian government. Which question best investigates who gained and who lost decision-making power?',
 source:'Historical sequence (teacher-written summary): Colombia rejects proposed canal agreement → Panama declares independence with U.S. support → U.S. gains canal rights through a new agreement.',
 choices:['Would completed canal construction shorten shipping routes for American businesses?','Were U.S. battleships generally made from steel rather than older materials?','How did the events change who could decide canal policy in Colombia, Panama, and the U.S.?','Did traffic through the canal later exceed the estimates of its original planners?']},
{id:'U4-D2-Q5',skill:'Evidence selection',cognitive:'Analysis',questionType:'Analysis / Historical scenario/knowledge',
 prompt:'In 1905, U.S. officials helped collect and manage customs taxes in the Dominican Republic. The arrangement reserved 55% of customs revenue for creditor claims and 45% for the Dominican government. Which additional source would be strongest for evaluating how Dominicans judged the arrangement?',
 source:'Historical arrangement (teacher-written summary based on the 1905 Dominican customs agreement): 55% of collected customs revenue reserved for creditors; 45% delivered to the Dominican government.',
 choices:['A U.S. naval inventory describing Caribbean patrol ships and supplies in 1905','Dominican newspapers, legislative debates, and petitions discussing the agreement','A geography reference calculating travel distances from Santo Domingo to New York in 1905','A U.S. report on manufactured products exported from 1870 to 1900']}
];
const root=document.createElement('article');root.id='idls-check';root.innerHTML='<p class="small">~6–8 minutes · Independent transfer</p><h2>Learning Check — America’s Growing Power</h2><p>Try these five new questions after the investigation. Use the evidence and reasoning you practiced, but make your own judgment. Your answers are submitted separately from your assignment.</p><div id="idls-questions"></div><button id="idls-submit" type="button">Submit learning check</button><p id="idls-score" class="note" role="status" aria-live="polite"></p><p class="small">Completion grade and learning-check score measure different things. The first counts filled responses; the second checks answers.</p>';
$('finish').insertAdjacentElement('afterbegin',root);
const holder=$('idls-questions');
for(const item of q){const s=document.createElement('div');s.style.cssText='padding:15px;margin:14px 0;border:1px solid #d0dde6;border-radius:9px;background:#f8fbfc';s.innerHTML='<p class="small"><strong>'+esc(item.id)+'</strong> · '+esc(item.skill)+'</p><p class="reading">'+vocab(item.source)+'</p>'+field('idls_'+item.id,item.prompt,item.choices,[],false);holder.append(s)}
$('nav').insertAdjacentHTML('beforeend','<a href="#idls-check">Independent learning check </a>');

const submitButton = $('idls-submit');
const status = $('idls-score');
function analyticsKey(s) {
  return LESSON + ':' + s.alias + ':learning-check:' + CHECK_VERSION;
}
function attemptFor(s) {
  try { return JSON.parse(localStorage.getItem(analyticsKey(s)) || 'null'); }
  catch (_) { return null; }
}
let sending = false;

function refreshCheck(message) {
  if (!state) return;
  const attempt = attemptFor(state);
  const received = Boolean(attempt?.received);
  const pending = Boolean(attempt);
  const count = q.filter(item => state.fields['idls_' + item.id]).length;
  submitButton.disabled = received || sending;
  submitButton.textContent = pending && !received ? 'Retry submission' : 'Submit learning check';
  for (const item of q) $('idls_' + item.id).disabled = pending || received;
  status.textContent = message || (received ? 'Test submission received.' : pending
    ? 'Test submission pending. Retry to confirm receipt.'
    : count + ' of ' + q.length + ' questions answered.');
}

submitButton.addEventListener('click', async () => {
  if (!state || sending || attemptFor(state)?.received) return;
  const current = state;
  const selected = q.map(item => item.choices.indexOf(current.fields['idls_' + item.id]));
  const missing = selected.indexOf(-1);
  if (missing >= 0) {
    refreshCheck('Answer all five questions before submitting.');
    $('idls_' + q[missing].id).focus();
    return;
  }
  const attempt = attemptFor(current) || {
    id: crypto.randomUUID(), choices: selected.map(index => 'ABCD'[index])
  };
  try { localStorage.setItem(analyticsKey(current), JSON.stringify(attempt)); }
  catch (_) {
    refreshCheck('This device could not save a submission receipt. Tell your teacher.');
    return;
  }
  const payload = {checkVersion: CHECK_VERSION, attemptId: attempt.id, choices: attempt.choices};
  sending = true;
  refreshCheck('Sending submission…');
  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 15000);
  let message;
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
      signal: abort.signal
    });
    const result = await response.json();
    if (response.ok && result.ok && ['recorded', 'duplicate'].includes(result.receipt)) {
      localStorage.setItem(analyticsKey(current), JSON.stringify({...attempt, received: true}));
      message = 'Test submission received.';
    } else if (result.code === 'window_closed') {
      message = 'The learning check is closed. Tell your teacher, then retry when it opens.';
    } else {
      message = 'Receipt could not be confirmed. Your choices are saved on this device.';
    }
  } catch (_) {
    message = 'Receipt could not be confirmed. Your choices are saved on this device.';
  } finally {
    clearTimeout(timeout);
    sending = false;
    refreshCheck(state === current ? message : undefined);
  }
});

const priorFill = fill;
fill = function () {
  priorFill();
  refreshCheck();
};
document.addEventListener('change', event => {
  if (event.target.id.startsWith('idls_')) setTimeout(refreshCheck, 0);
});
})();
