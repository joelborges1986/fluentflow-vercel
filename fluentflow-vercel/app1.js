// ══════════════════════════════════════════════
//  FIREBASE CONFIG
// ══════════════════════════════════════════════
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB6Onj1ZBkGML924eSyqbGsle6RL7fG650",
  authDomain: "fluentflow-2087b.firebaseapp.com",
  projectId: "fluentflow-2087b",
  storageBucket: "fluentflow-2087b.firebasestorage.app",
  messagingSenderId: "820077192769",
  appId: "1:820077192769:web:ac560de1d89bdfc74408c0"
};

// ══════════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════════
const CEFR_LEVELS = ['A1','A2','B1','B2','C1','C2'];
const CEFR_DESCS = {
  A1:'Iniciante',A2:'Básico',B1:'Intermediário',B2:'Intermediário avançado',C1:'Avançado',C2:'Proficiente'
};

const PLACEMENT_QUESTIONS = [
  // READING (6 questions — A1 to C1 difficulty)
  { skill:'reading', level:'A1', type:'mcq',
    q: 'Choose the correct word: "She ___ a teacher."',
    options:['is','are','am','be'], answer:0 },
  { skill:'reading', level:'A2', type:'mcq',
    q: 'Which sentence is correct?',
    options:['He don\'t like coffee.','He doesn\'t likes coffee.','He doesn\'t like coffee.','He not like coffee.'], answer:2 },
  { skill:'reading', level:'B1', type:'mcq',
    q: '"Despite the rain, they ___ the match." Choose the best option.',
    options:['decided to cancel','decided cancelling','have decided cancel','deciding to cancel'], answer:0 },
  { skill:'reading', level:'B2', type:'mcq',
    q: 'The report was ___ with errors that the manager had to rewrite it entirely.',
    options:['so full','such full','such a full','so much full'], answer:0 },
  { skill:'reading', level:'C1', type:'mcq',
    q: '"Had she arrived earlier, she ___ the presentation." Choose the correct form.',
    options:['would catch','would have caught','had caught','was catching'], answer:1 },
  { skill:'reading', level:'C1', type:'mcq',
    q: 'The word closest in meaning to "exacerbate" is:',
    options:['improve','worsen','examine','explain'], answer:1 },
  // LISTENING comprehension (via reading a dialogue)
  { skill:'listening', level:'A2', type:'mcq',
    q: 'Read: "Tom: Can we meet at 3pm? Sarah: I\'m busy until 4, but after that works." When can they meet?',
    options:['At 3pm','At 4pm','After 4pm','They can\'t meet'], answer:2 },
  { skill:'listening', level:'B1', type:'mcq',
    q: 'Read: "The project was behind schedule, so we had to cut some features to meet the deadline." What did they do?',
    options:['Extended the deadline','Removed some features','Added more resources','Cancelled the project'], answer:1 },
  { skill:'listening', level:'B2', type:'mcq',
    q: 'Read: "The CEO was candid about the challenges, acknowledging that Q3 results fell short of projections." What does "candid" mean here?',
    options:['Angry','Honest and direct','Vague','Optimistic'], answer:1 },
  { skill:'listening', level:'C1', type:'mcq',
    q: 'Read: "The nuanced argument hinged on a distinction that most listeners failed to grasp." What is the main point?',
    options:['The argument was simple','Few people understood the key distinction','The speaker was unclear','Listeners disagreed with the argument'], answer:1 },
  // WRITING (open ended — scored by AI)
  { skill:'writing', level:'B1', type:'writing',
    q: 'Write 2-3 sentences describing your job or daily routine in English.',
    placeholder:'I work as a... / Every day I...', aiScore:true },
  { skill:'writing', level:'B2', type:'writing',
    q: 'You need to tell your team that a project deadline has been pushed back by one week. Write a brief message (3-4 sentences).',
    placeholder:'Hi team, I wanted to let you know...', aiScore:true },
  // SPEAKING (voice or text — scored by AI)
  { skill:'speaking', level:'B1', type:'speaking',
    q: 'Describe a challenge you faced at work or school and how you solved it. Answer in 3-4 sentences.',
    placeholder:'One challenge I faced was...', aiScore:true },
  { skill:'speaking', level:'B2', type:'speaking',
    q: 'What is your opinion on remote work? Is it more productive than working from the office? Explain your view.',
    placeholder:'In my opinion, remote work...', aiScore:true },
];

const MOTIVATIONAL = [
  '"<strong>Fluency isn\'t about being perfect.</strong> It\'s about being understood — and getting better every single day."',
  '"<strong>Every session counts.</strong> 30 minutes a day, compounding over months, creates something remarkable."',
  '"<strong>The best way to speak better English</strong> is to speak it — imperfectly, bravely, consistently."',
  '"<strong>You already know more than you think.</strong> Today\'s session is about unlocking it."',
  '"<strong>Consistency beats intensity.</strong> Showing up daily is worth more than occasional marathon study sessions."',
];

const SEED_SESSIONS = [{
  id:1, topic:"Remote Work & Productivity",
  shadowing:{
    title:"The async-first team",
    text:"We shifted to an <em>async-first</em> culture about two years ago. At first, it felt strange — we were used to <em>jumping on quick calls</em> for everything. But over time, people were more focused, decisions were documented, and the team communicated <em>more thoughtfully</em>. A good Slack message <em>saves hours of back-and-forth</em>.",
    audio_text:"We shifted to an async-first culture about two years ago. At first it felt strange. But over time people were more focused, decisions were documented, and the team communicated more thoughtfully. A good Slack message saves hours of back-and-forth."
  },
  phrases:[
    {en:"Let me circle back on that.",pt:"Deixa eu retomar isso depois.",example:"\"I don't have the answer now — let me circle back on that by end of day.\""},
    {en:"I'll take this offline.",pt:"Vou resolver isso fora da reunião.",example:"\"This is getting complex — let's take it offline.\""},
    {en:"Can we get on the same page?",pt:"Podemos alinhar?",example:"\"Before we move forward, can we get on the same page about the timeline?\""},
    {en:"I want to flag something.",pt:"Quero chamar atenção para algo.",example:"\"I want to flag something before we finalize — the budget might be an issue.\""},
    {en:"That's a fair point.",pt:"Esse é um ponto válido.",example:"\"That's a fair point, actually. I hadn't considered that perspective.\""},
  ],
  questions:[
    {q:"Describe your ideal remote work setup. What tools or routines make you most productive?",tip:"Try: *I find it helpful to...*, *The key thing for me is...*"},
    {q:"Have you ever had to disagree with a colleague professionally? How did you handle it?",tip:"Try: *I expressed my concern by...*, *In the end, we...*"},
    {q:"How do you manage distractions when working from home?",tip:"Try: *What works for me is...*, *One strategy I've adopted is...*"},
  ],
  challenge:{tag:"Work Meeting",title:"Disagree professionally in a meeting",prompt:"Your manager proposes moving the product launch date forward by 3 weeks. You believe this is risky because QA hasn't finished testing. How do you raise your concern clearly and constructively?",
    cues:[{label:"Acknowledge first",example:"I understand the business case for launching earlier..."},{label:"Express concern",example:"My concern is that QA hasn't completed the full test cycle..."},{label:"Propose alternative",example:"What if we did a soft launch for beta users first?"}]}
}];

const NEWS_TOPICS = [
  {tag:"tech",icon:"🤖",title:"AI in the workplace",desc:"How professionals are adapting to AI tools.",topic:"AI and automation transforming jobs and skills in 2025"},
  {tag:"biz",icon:"🏢",title:"Remote vs. office debate",desc:"Companies weigh productivity, culture, and talent.",topic:"remote work vs return to office trends 2025"},
  {tag:"tech",icon:"🔋",title:"Clean energy & business",desc:"How companies are adapting to new energy realities.",topic:"clean energy transition business opportunities 2025"},
  {tag:"biz",icon:"🤝",title:"The art of negotiation",desc:"Core principles that transcend culture.",topic:"modern business negotiation strategies"},
  {tag:"world",icon:"🌐",title:"Global economy updates",desc:"Key economic shifts affecting professionals worldwide.",topic:"global economy trends affecting professionals 2025"},
  {tag:"life",icon:"🧠",title:"Mental health at work",desc:"Burnout prevention and healthy boundaries.",topic:"workplace mental health wellbeing strategies"},
  {tag:"tech",icon:"💬",title:"Async communication",desc:"Teams replacing meetings with docs and async video.",topic:"asynchronous communication tools remote teams"},
  {tag:"biz",icon:"🚀",title:"Startup & innovation",desc:"What's being built right now.",topic:"startup innovation funding trends 2025"},
];

const COMMON_ERRORS = [
  {error:'"I am agree with you"',fix:'"I agree with you"',note:"'Agree' é verbo, não adjetivo."},
  {error:'"Make a meeting"',fix:'"Have / schedule a meeting"',note:"Em inglês não se 'faz' reunião."},
  {error:'"Explain me this"',fix:'"Explain this to me"',note:"'Explain' precisa de 'to' antes da pessoa."},
  {error:'"Depends of the situation"',fix:'"Depends on the situation"',note:"'Depend' usa 'on', não 'of'."},
  {error:'"I will give a feedback"',fix:'"I\'ll give feedback" (sem artigo)',note:"'Feedback' é incontável em inglês."},
];

// ══════════════════════════════════════════════
//  FIREBASE
// ══════════════════════════════════════════════
let db,auth,currentUser=null,firebaseReady=false;

function initFirebase(){
  // Safety timeout — if Firebase doesn't respond in 6s, fall back to local mode
  const safetyTimer=setTimeout(()=>{
    console.warn('Firebase timeout — falling back to local mode');
    hideLoading();
    showApp(null);
  },6000);

  try{
    if(!FIREBASE_CONFIG.apiKey||FIREBASE_CONFIG.apiKey.startsWith('FIREBASE_')){
      clearTimeout(safetyTimer);hideLoading();showApp(null);return;
    }
    firebase.initializeApp(FIREBASE_CONFIG);
    db=firebase.firestore(); auth=firebase.auth(); firebaseReady=true;
    auth.onAuthStateChanged(user=>{
      clearTimeout(safetyTimer);
      hideLoading();
      if(user){currentUser=user;showApp(user);}
      else{currentUser=null;showAuthScreen();}
    });
  }catch(e){
    clearTimeout(safetyTimer);
    console.error('Firebase init error:',e);
    hideLoading();showApp(null);
  }
}
function hideLoading(){
  const el=document.getElementById('loading-screen');
  if(el)el.style.display='none';
}
function showAuthScreen(){
  hideLoading();
  const auth=document.getElementById('auth-screen');
  const app=document.getElementById('app');
  if(auth)auth.style.display='flex';
  if(app)app.classList.remove('visible');
}
function showApp(user){
  document.getElementById('auth-screen').style.display='none';
  document.getElementById('app').classList.add('visible');
  setupUserUI(user);
  loadUserState(user).then(()=>{
    renderDashboard();renderNews();
    // First time flow: onboarding → placement test
    if(!state.profile){
      setTimeout(()=>startOnboarding(),800);
    } else if(!state.levels||!state.levels.reading){
      setTimeout(()=>startPlacementTest(),800);
    }
    initPWA();
  });
}

// ── Auth ──
async function signInGoogle(){
  if(!firebaseReady){showToast('Firebase não configurado');return;}
  try{const p=new firebase.auth.GoogleAuthProvider();await auth.signInWithPopup(p);}
  catch(e){showAuthError(e.message,'auth-error');}
}
async function signInEmail(){
  if(!firebaseReady){showToast('Firebase não configurado');return;}
  const email=document.getElementById('auth-email').value.trim();
  const pass=document.getElementById('auth-password').value;
  const btn=document.getElementById('auth-submit-btn');
  if(!email||!pass){showAuthError('Preencha e-mail e senha.','auth-error');return;}
  btn.disabled=true;btn.textContent='Entrando…';
  try{await auth.signInWithEmailAndPassword(email,pass);}
  catch(e){showAuthError(translateAuthError(e.code),'auth-error');btn.disabled=false;btn.textContent='Entrar';}
}
async function createAccount(){
  if(!firebaseReady){showToast('Firebase não configurado');return;}
  const name=document.getElementById('register-name').value.trim();
  const email=document.getElementById('register-email').value.trim();
  const pass=document.getElementById('register-password').value;
  const btn=document.getElementById('register-submit-btn');
  if(!name||!email||!pass){showAuthError('Preencha todos os campos.','register-error');return;}
  if(pass.length<6){showAuthError('Senha: mín. 6 caracteres.','register-error');return;}
  btn.disabled=true;btn.textContent='Criando conta…';
  try{const c=await auth.createUserWithEmailAndPassword(email,pass);await c.user.updateProfile({displayName:name});}
  catch(e){showAuthError(translateAuthError(e.code),'register-error');btn.disabled=false;btn.textContent='Criar conta';}
}
async function signOut(){
  stopAllRecording();
  if(firebaseReady&&auth)await auth.signOut();
  else showApp(null);
  closeUserMenu();
}
function switchToRegister(){document.getElementById('login-form').style.display='none';document.getElementById('register-form').style.display='block'}
function switchToLogin(){document.getElementById('register-form').style.display='none';document.getElementById('login-form').style.display='block'}
function showAuthError(msg,id){const el=document.getElementById(id);el.textContent=msg;el.style.display='block'}
function translateAuthError(code){
  const m={'auth/user-not-found':'E-mail não encontrado.','auth/wrong-password':'Senha incorreta.',
    'auth/email-already-in-use':'E-mail já cadastrado.','auth/invalid-email':'E-mail inválido.',
    'auth/weak-password':'Senha muito fraca.','auth/too-many-requests':'Muitas tentativas. Aguarde.',
    'auth/popup-closed-by-user':'Login cancelado.'};
  return m[code]||'Erro: '+code;
}
function setupUserUI(user){
  const av=document.getElementById('user-avatar');
  const mn=document.getElementById('menu-name');
  const me=document.getElementById('menu-email');
  const ai=document.getElementById('account-info');
  if(!user){av.textContent='?';mn.textContent='Local';me.textContent='Sem login';if(ai)ai.textContent='Modo local.';return;}
  const name=user.displayName||user.email.split('@')[0];
  const ini=name.split(' ').map(p=>p[0]).join('').toUpperCase().slice(0,2);
  av.innerHTML=user.photoURL?`<img src="${user.photoURL}" alt="${name}">`:'';
  if(!user.photoURL)av.textContent=ini;
  mn.textContent=name; me.textContent=user.email;
  if(ai)ai.textContent=`Logado como ${user.email}`;
}
function toggleUserMenu(){document.getElementById('user-menu').classList.toggle('open')}
function closeUserMenu(){document.getElementById('user-menu').classList.remove('open')}
document.addEventListener('click',e=>{
  const m=document.getElementById('user-menu'),a=document.getElementById('user-avatar');
  if(m&&!m.contains(e.target)&&!a.contains(e.target))closeUserMenu();
});

// ══════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════
const DEFAULT_STATE={
  streak:0,totalSessions:0,totalMinutes:0,
  favPhrases:[],recentPhrases:[],sessionHistory:[],
  completedDays:[],weeklyGoal:5,todayCompleted:false,
  aiErrors:[],currentTopic:null,lastStudyDate:null,
  levels:null,
  levelHistory:[],
  profile:null, // { style:'music'|'series'|'text'|'conversation', motivation:'work'|'travel'|'culture'|'general', time:15|30|45 }
};
let state={...DEFAULT_STATE};
let saveTimer=null;

async function loadUserState(user){
  if(user&&firebaseReady){
    try{
      const doc=await db.collection('users').doc(user.uid).get();
      state=doc.exists?Object.assign({...DEFAULT_STATE},doc.data()):{...DEFAULT_STATE};
      if(!doc.exists)await saveState();
    }catch(e){loadLocalState();}
  }else{loadLocalState();}
  const today=new Date().toISOString().split('T')[0];
  if(state.lastStudyDate&&state.lastStudyDate!==today)state.todayCompleted=false;
}
function loadLocalState(){
  try{state=Object.assign({...DEFAULT_STATE},JSON.parse(localStorage.getItem('ff_v4_local')||'{}'));}
  catch{state={...DEFAULT_STATE};}
}
function saveState(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(async()=>{
    if(currentUser&&firebaseReady){
      try{await db.collection('users').doc(currentUser.uid).set(state,{merge:true});}
      catch(e){console.warn(e);}
    }else{
      try{localStorage.setItem('ff_v4_local',JSON.stringify(state));}catch{}
    }
  },800);
}

// ══════════════════════════════════════════════
//  GEMINI API — via Netlify Function (chave no servidor)
// ══════════════════════════════════════════════
const GEMINI_MODEL='gemini-2.0-flash';
const API_PROXY='/api/gemini';

// Verifica se o proxy está disponível (Netlify) ou se estamos rodando local
function isProxyAvailable(){
  return window.location.hostname!=='localhost'&&window.location.hostname!=='127.0.0.1'&&!window.location.protocol.startsWith('file');
}

function updateApiWarning(){
  const w=document.getElementById('api-warning');
  if(w)w.style.display='none'; // Chave centralizada — sem aviso
}

async function callGemini(prompt,system,onChunk,onDone,onError){
  if(!isProxyAvailable()){
    onError('IA disponível apenas na versão hospedada. Acesse o link do Netlify.');return;
  }
  try{
    const res=await fetch(API_PROXY,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        mode:'stream',
        model:GEMINI_MODEL,
        payload:{
          system_instruction:{parts:[{text:system}]},
          contents:[{role:'user',parts:[{text:prompt}]}],
          generationConfig:{maxOutputTokens:700,temperature:0.7}
        }
      })
    });
    if(!res.ok){const e=await res.json().catch(()=>({}));onError(e.error||'Erro '+res.status);return;}
    const data=await res.json();
    if(data.error){onError(data.error);return;}
    // Simulate streaming by delivering text word by word for UX
    const text=data.text||'';
    const words=text.split(' ');
    for(let i=0;i<words.length;i++){
      onChunk((i===0?'':' ')+words[i]);
      if(i%8===7)await new Promise(r=>setTimeout(r,16));
    }
    onDone();
  }catch(e){onError(e.message);}
}

async function callGeminiJSON(prompt,system,useSearch=false){
  if(!isProxyAvailable()){
    throw new Error('IA disponível apenas na versão hospedada.');
  }
  const body={
    mode:'json',
    model:GEMINI_MODEL,
    payload:{
      system_instruction:{parts:[{text:system}]},
      contents:[{role:'user',parts:[{text:prompt}]}],
      generationConfig:{maxOutputTokens:useSearch?2000:1800,temperature:0.8,responseMimeType:useSearch?undefined:'application/json'}
    }
  };
  if(useSearch){
    body.payload.tools=[{google_search:{}}];
    delete body.payload.generationConfig.responseMimeType;
  }
  const res=await fetch(API_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error||'Erro '+res.status);}
  const data=await res.json();
  if(data.error)throw new Error(data.error);
  const text=data.candidates?.[0]?.content?.parts?.[0]?.text||'';
  const m=text.match(/\{[\s\S]*\}/);if(!m)throw new Error('No JSON in response');
  return JSON.parse(m[0]);
}

// ══════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════
function goTo(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+page)?.classList.add('active');
  const idx=['dashboard','placement','session','progress','news','settings'].indexOf(page);
  // nav buttons only for main 5 pages (excluding placement)
  const navIdx=['dashboard','session','progress','news','settings'].indexOf(page);
  document.querySelectorAll('.nav-btn')[navIdx]?.classList.add('active');
  if(page==='dashboard')renderDashboard();
  if(page==='progress')renderProgress();
  if(page==='news')renderNews();
  if(page==='settings')renderSettings();
  window.scrollTo(0,0);
}
function showTab(tab){
  document.querySelectorAll('.tab-content').forEach(t=>{t.style.display='none';t.classList.remove('active');});
  document.querySelectorAll('.prog-tab').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('tab-'+tab);if(el){el.style.display='block';el.classList.add('active');}
  const tabs=['overview','calendar','favorites','errors'];
  document.querySelectorAll('.prog-tab')[tabs.indexOf(tab)]?.classList.add('active');
  if(tab==='favorites')renderFavorites();
  if(tab==='calendar')renderCalendar();
  if(tab==='errors')renderErrors();
}

// ══════════════════════════════════════════════
//  PLACEMENT TEST — v4
// ══════════════════════════════════════════════
let testState={idx:0,answers:[],scores:{reading:0,writing:0,speaking:0,listening:0},counts:{reading:0,writing:0,speaking:0,listening:0}};

function startPlacementTest(){
  testState={idx:0,answers:[],scores:{reading:0,writing:0,speaking:0,listening:0},counts:{reading:0,writing:0,speaking:0,listening:0}};
  // Activate placement page without affecting nav
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-placement').classList.add('active');
  renderTestQuestion();
  window.scrollTo(0,0);
}

function renderTestQuestion(){
  const inner=document.getElementById('placement-inner');
  const total=PLACEMENT_QUESTIONS.length;
  const idx=testState.idx;
  if(idx>=total){finishTest();return;}
  const q=PLACEMENT_QUESTIONS[idx];
  const pct=Math.round((idx/total)*100);
  const skillColors={reading:'reading',listening:'listening',writing:'writing',speaking:'speaking'};
  const skillLabels={reading:'📖 Reading',listening:'👂 Listening',writing:'✍ Writing',speaking:'🎙 Speaking'};
  let inputHTML='';
  if(q.type==='mcq'){
    inputHTML=`<div class="test-options">${q.options.map((o,i)=>`<button class="test-option" id="opt-${i}" onclick="selectOption(${i})">${o}</button>`).join('')}</div>`;
  }else{
    inputHTML=`<textarea class="test-textarea" id="test-open" placeholder="${q.placeholder||'Write your answer in English…'}"></textarea>`;
  }
  inner.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
      <div>
        <div style="font-family:'DM Serif Display',serif;font-size:22px">Placement test</div>
        <div style="font-size:13px;color:var(--text2);margin-top:2px">Identifica seu nível em cada habilidade</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="skipTest()">Pular →</button>
    </div>
    <div class="test-progress"><div class="test-progress-fill" style="width:${pct}%"></div></div>
    <div class="test-card">
      <div class="test-skill-tag ${q.skill}">${skillLabels[q.skill]}</div>
      <div class="test-question">${q.question||q.q}</div>
      ${inputHTML}
    </div>
    <div class="test-nav">
      <span class="test-counter">${idx+1} / ${total}</span>
      <button class="btn btn-primary" onclick="nextTestQuestion()">
        ${idx===total-1?'Ver resultados →':'Próxima →'}
      </button>
    </div>`;
}

function selectOption(i){
  document.querySelectorAll('.test-option').forEach(b=>b.classList.remove('selected'));
  document.getElementById('opt-'+i)?.classList.add('selected');
  testState.pendingOption=i;
}

function nextTestQuestion(){
  const q=PLACEMENT_QUESTIONS[testState.idx];
  if(q.type==='mcq'){
    if(testState.pendingOption===undefined){showToast('Selecione uma opção');return;}
    const correct=testState.pendingOption===q.answer;
    testState.answers.push({skill:q.skill,level:q.level,correct,type:'mcq'});
    if(correct)testState.scores[q.skill]++;
    testState.counts[q.skill]++;
    testState.pendingOption=undefined;
  }else{
    const ta=document.getElementById('test-open');
    const ans=ta?ta.value.trim():'';
    if(!ans){showToast('Escreva sua resposta');return;}
    testState.answers.push({skill:q.skill,level:q.level,answer:ans,type:q.type,aiScore:true});
  }
  testState.idx++;
  renderTestQuestion();
}

function skipTest(){
  // Assign default B1 level to all skills
  const defaultLevels={reading:'B1',writing:'B1',speaking:'B1',listening:'B1'};
  applyLevels(defaultLevels,true);
  showToast('Nível B1 definido como padrão — refaça o teste quando quiser.');
  goTo('dashboard');
}

async function finishTest(){
  const inner=document.getElementById('placement-inner');
  inner.innerHTML=`<div style="text-align:center;padding:40px 0"><div class="gen-spinner" style="margin:0 auto 16px"></div><div style="color:var(--text2)">Calculando seu nível com IA…</div></div>`;
  // Score MCQ skills
  const levels={reading:'A2',writing:'A2',speaking:'A2',listening:'A2'};
  ['reading','listening'].forEach(skill=>{
    const total=testState.counts[skill]||1;
    const pct=testState.scores[skill]/total;
    if(pct>=0.83)levels[skill]='C1';
    else if(pct>=0.67)levels[skill]='B2';
    else if(pct>=0.5)levels[skill]='B1';
    else if(pct>=0.33)levels[skill]='A2';
    else levels[skill]='A1';
  });
  // AI scoring for writing and speaking
  const openAnswers=testState.answers.filter(a=>a.aiScore);
  if(isProxyAvailable()&&openAnswers.length>0){
    try{
      const sys=`You are an English language assessor. Score written/spoken responses on the CEFR scale (A1,A2,B1,B2,C1,C2). Return ONLY valid JSON.`;
      const prompt=`Assess these responses and return their CEFR levels:
${openAnswers.map((a,i)=>`${i+1}. Skill: ${a.skill}\nQuestion: ${PLACEMENT_QUESTIONS.find(q=>q.skill===a.skill&&q.type===a.type)?.q||''}\nAnswer: "${a.answer}"`).join('\n\n')}

Return JSON: { "writing": "B1", "speaking": "A2" } — one level per skill assessed.`;
      const result=await callGeminiJSON(prompt,sys);
      if(result.writing)levels.writing=result.writing;
      if(result.speaking)levels.speaking=result.speaking;
    }catch(e){
      // Fallback: use B1 for open answers
      levels.writing='B1';levels.speaking='B1';
    }
  }else{
    // No AI key: rough score from answer length
    openAnswers.forEach(a=>{
      const words=a.answer.split(' ').length;
      const lvl=words>60?'C1':words>40?'B2':words>20?'B1':words>10?'A2':'A1';
      levels[a.skill]=lvl;
    });
  }
  applyLevels(levels,false);
  renderTestResults(levels);
}

function applyLevels(levels,skipped){
  state.levels=levels;
  state.levelHistory.push({date:new Date().toISOString().split('T')[0],levels:{...levels}});
  saveState();
}

function renderTestResults(levels){
  const inner=document.getElementById('placement-inner');
  inner.innerHTML=`
    <div class="test-results">
      <div style="font-size:48px;margin-bottom:12px">🎯</div>
      <h2>Seu nível de inglês</h2>
      <p style="color:var(--text2)">Resultado baseado nas suas respostas. O conteúdo das sessões será adaptado para cada habilidade.</p>
      <div class="results-grid">
        ${['reading','listening','writing','speaking'].map(s=>`
          <div class="result-card">
            <div class="result-skill">${{reading:'📖 Reading',listening:'👂 Listening',writing:'✍ Writing',speaking:'🎙 Speaking'}[s]}</div>
            <div class="result-level"><span class="level-badge level-${levels[s]}">${levels[s]}</span></div>
            <div class="result-desc">${CEFR_DESCS[levels[s]]||''}</div>
          </div>`).join('')}
      </div>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">Você pode refazer o teste a qualquer momento em Configurações → Refazer teste de nível.</p>
      <button class="btn btn-primary" onclick="goTo('dashboard')" style="margin:0 auto">Começar a estudar →</button>
    </div>`;
}

// ══════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════
function renderDashboard(){
  const h=new Date().getHours();
  const name=currentUser?.displayName?.split(' ')[0]||'';
  document.getElementById('greeting-text').textContent=(h<12?'Good morning':h<17?'Good afternoon':'Good evening')+(name?', '+name:'')+(h<12?' ☀️':h<17?' 🌤️':' 🌙');
  document.getElementById('greeting-sub').textContent=state.todayCompleted?'Great job! You already studied today.':'Ready to practice your English today?';
  document.getElementById('streak-count').textContent=state.streak;
  document.getElementById('stat-sessions').textContent=state.totalSessions;
  document.getElementById('stat-phrases').textContent=state.favPhrases.length;
  document.getElementById('stat-minutes').textContent=state.totalMinutes;
  const thisWeek=state.sessionHistory.filter(s=>isThisWeek(s.date)).length;
  document.getElementById('weekly-display').textContent=thisWeek+'/'+state.weeklyGoal;
  const cons=state.totalSessions>0?Math.min(99,Math.round((state.completedDays.length/30)*100)):0;
  document.getElementById('stat-consistency').textContent=state.totalSessions>0?cons+'%':'—';
  const days=['M','T','W','T','F','S','S'];
  document.getElementById('streak-dots').innerHTML=days.map((d,i)=>{
    const cls=i<state.streak%7?'streak-dot done':i===state.streak%7?'streak-dot today':'streak-dot';
    return `<div class="${cls}">${d}</div>`;
  }).join('');
  document.getElementById('motivational-text').innerHTML=MOTIVATIONAL[state.totalSessions%MOTIVATIONAL.length];
  document.getElementById('recent-phrases').innerHTML=state.recentPhrases.length
    ?state.recentPhrases.map(p=>`<span class="phrase-chip">${p}</span>`).join('')
    :'<span style="color:var(--text3);font-size:13px">As frases que você aprender aparecerão aqui.</span>';
  document.getElementById('session-topic-label').textContent=state.currentTopic?'Topic: '+state.currentTopic:'Choose your topic';
  updateApiWarning();
  renderLevelCard();
}

function renderLevelCard(){
  const el=document.getElementById('level-skills-display');
  const profile=getProfileLabels();

  // Show learning profile summary if set
  const profileHTML = profile ? `
    <div style="grid-column:1/-1;display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)">
      <span style="font-size:12px;color:var(--text3)">Perfil:</span>
      <span style="font-size:12px;color:var(--text2)">${profile.style.icon} ${profile.style.title}</span>
      <span style="font-size:12px;color:var(--text3)">·</span>
      <span style="font-size:12px;color:var(--text2)">${profile.motivation.icon} ${profile.motivation.title}</span>
      <span style="font-size:12px;color:var(--text3)">·</span>
      <span style="font-size:12px;color:var(--text2)">⏱ ${profile.time} min/dia</span>
    </div>` : '';

  if(!state.levels){
    el.innerHTML=`${profileHTML}<div style="grid-column:1/-1;font-size:13px;color:var(--text3)">Faça o teste de nivelamento para ver seu nível aqui.</div>`;
    return;
  }
  const skills=['reading','listening','writing','speaking'];
  const icons={reading:'📖',listening:'👂',writing:'✍',speaking:'🎙'};
  el.innerHTML=profileHTML+skills.map(s=>`
    <div class="level-skill">
      <span class="level-skill-name">${icons[s]} ${s.charAt(0).toUpperCase()+s.slice(1)}</span>
      <span class="level-badge level-${state.levels[s]}">${state.levels[s]}</span>
    </div>`).join('');
}

function isThisWeek(ds){return(new Date()-new Date(ds+'T12:00:00'))/(1000*60*60*24)<7;}

// ══════════════════════════════════════════════
//  SESSION — TOPIC CHOOSER
// ══════════════════════════════════════════════
function goToSession(){goTo('session');renderTopicChooser();}

function renderTopicChooser(){
  const hasKey=isProxyAvailable();
  document.getElementById('session-inner').innerHTML=`
    <h2 style="font-family:'DM Serif Display',serif;font-size:24px;margin-bottom:6px">Choose today's topic</h2>
    <p style="color:var(--text2);font-size:14px;margin-bottom:20px">
      ${hasKey
        ?'<span class="ai-badge"><span class="ai-dot"></span>Gemini ativo</span> &nbsp;<span class="live-badge"><span class="live-dot"></span>Google Search</span> &nbsp;Conteúdo atual da internet.'
        :'IA inativa — conteúdo embutido. <button onclick="goTo(\'settings\')" style="background:none;border:none;color:var(--accent);cursor:pointer;font-size:14px;text-decoration:underline">Adicione a chave Gemini (grátis)</button>'}
    </p>
    ${state.levels?`<div style="background:rgba(108,140,255,.08);border:1px solid rgba(108,140,255,.2);border-radius:var(--radius-sm);padding:10px 14px;font-size:12px;color:var(--text2);margin-bottom:16px">
      🎯 <strong style="color:var(--accent)">Conteúdo adaptado para o seu nível</strong> — Shadowing e perguntas calibradas para ${state.levels.speaking} (speaking) e ${state.levels.reading} (reading).
    </div>`:''}
    <div style="margin-bottom:20px">
      <div class="section-title">Tema personalizado</div>
      <div class="custom-input-row">
        <input class="custom-input" id="session-custom-input" placeholder="Digite qualquer tema em inglês ou português…"/>
        <button class="btn btn-primary" onclick="startCustomSession()">Gerar →</button>
      </div>
    </div>
    <div class="topic-chooser">
      ${NEWS_TOPICS.map((t,i)=>`
        <button class="topic-btn" onclick="selectTopic(${i})">
          <div class="topic-btn-icon">${t.icon}</div>
          <div class="topic-btn-name">${t.title}</div>
          <div class="topic-btn-desc">${t.tag.toUpperCase()}</div>
        </button>`).join('')}
    </div>
    <div>
      <div class="section-title">Sessão padrão</div>
      ${SEED_SESSIONS.map((s,i)=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:14px;color:var(--text2)">${s.topic}</span>
          <button class="btn btn-ghost btn-sm" onclick="startBuiltinSession(${i})">Usar →</button>
        </div>`).join('')}
    </div>`;
}

function startCustomSession(){
  const input=document.getElementById('session-custom-input');
  const topic=input?.value.trim();
  if(!topic){showToast('Digite um tema primeiro!');return;}
  launchSession(topic);
}
function startCustomTopic(){
  const input=document.getElementById('custom-topic-input');
  const topic=input?.value.trim();
  if(!topic){showToast('Digite um tema primeiro!');return;}
  goTo('session');setTimeout(()=>launchSession(topic),100);
}
async function selectTopic(idx){launchSession(NEWS_TOPICS[idx].topic,NEWS_TOPICS[idx].title);}

async function launchSession(searchTopic,displayTitle){
  state.currentTopic=displayTitle||searchTopic;saveState();
  if(!isProxyAvailable()){startBuiltinSession(0);showToast('IA disponível apenas no Netlify');return;}
  showGenerating(displayTitle||searchTopic);
  try{const session=await generateSessionLive(searchTopic);startGeneratedSession(session);}
  catch(e){showToast('Erro na IA — conteúdo padrão');startBuiltinSession(0);}
}

function showGenerating(topic){
  document.getElementById('session-inner').innerHTML=`
    <div class="generating-overlay">
      <div class="gen-spinner"></div>
      <div class="gen-text">Gerando sessão sobre <strong style="color:var(--text)">${topic}</strong></div>
      <div class="gen-sub">Gemini está buscando conteúdo atual e adaptando para o seu nível…</div>
      <div class="gen-source"><span class="live-dot"></span> Google Search ativo</div>
    </div>`;
}

// ══════════════════════════════════════════════
//  V4 — ADAPTIVE SESSION GENERATION
// ══════════════════════════════════════════════
async function generateSessionLive(topic){
  const lvls=state.levels||{reading:'B1',writing:'B1',speaking:'B1',listening:'B1'};
  const profile=state.profile||{style:'text',motivation:'work',time:30};

  // Build profile context for the prompt
  const styleInstructions = {
    text:         'Use natural prose texts and professional dialogues as the main content format.',
    music:        'Base the shadowing text on lyrics or song references related to the topic. Choose a well-known song that connects to the theme. Structure phrases around musical vocabulary and rhythm. Keep it natural for speaking practice.',
    series:       'Base the shadowing text on a realistic TV-show-style dialogue or scene related to the topic. Think modern series like Friends, The Office, or Suits depending on the topic. Make it feel like a real script excerpt.',
    conversation: 'Make the shadowing text a natural spoken conversation between two people. Focus on back-and-forth dialogue, interruptions, and real spoken English patterns.',
  };
  const motivationInstructions = {
    work:    'Focus on professional English: meetings, emails, presentations, negotiations, feedback.',
    travel:  'Include travel situations: airports, hotels, restaurants, asking for directions, small talk with strangers.',
    culture: 'Connect to pop culture references, entertainment, social conversations, and current events.',
    general: 'Mix professional and casual English for well-rounded fluency.',
  };

  const system=`You are an expert English teacher for Brazilian professionals. You have Google Search access. Use it to get current real-world information about the topic. Generate content adapted to the student's CEFR level AND their learning profile. Always respond with valid JSON only.`;

  const prompt=`Search for current information about: "${topic}"

Student profile:
- CEFR levels: Reading=${lvls.reading}, Listening=${lvls.listening}, Writing=${lvls.writing}, Speaking=${lvls.speaking}
- Learning style: ${profile.style} — ${styleInstructions[profile.style]||styleInstructions.text}
- Main motivation: ${profile.motivation} — ${motivationInstructions[profile.motivation]||motivationInstructions.general}
- Session length: ${profile.time} minutes

Generate a study session adapted to BOTH the CEFR levels AND the learning style.

Return ONLY this JSON:
{
  "topic": "Topic name",
  "isLive": true,
  "learningStyle": "${profile.style}",
  "targetLevels": { "reading": "${lvls.reading}", "speaking": "${lvls.speaking}" },
  "shadowing": {
    "title": "Short title",
    "text": "3-4 sentence content adapted to the learning style (${profile.style}) and reading level ${lvls.reading}. Mark 4-5 key phrases with <em>tags</em>. Ground in current events via search.",
    "audio_text": "Same without HTML tags.",
    "styleNote": "One sentence explaining what style this is (e.g. 'Based on a dialogue from a workplace drama series')"
  },
  "phrases": [
    { "en": "Natural phrase related to topic and motivation context", "pt": "Tradução", "example": "Example in quotes." }
  ],
  "questions": [
    { "q": "Speaking question connecting topic to ${profile.motivation} context", "tip": "Try: *starter...*, *another...*" }
  ],
  "challenge": {
    "tag": "Situation type",
    "title": "Challenge title",
    "prompt": "2-3 sentence realistic scenario aligned with ${profile.motivation} motivation.",
    "cues": [{ "label": "Step", "example": "Example phrase" }]
  }
}
Rules: 5 phrases, 3 questions, 3 cues. Level B2-C1 language. Ground in real current events via search.`;

  return callGeminiJSON(prompt,system,true);
}

// ══════════════════════════════════════════════
//  SESSION ENGINE
// ══════════════════════════════════════════════
let currentSession=null;
let sessionState={block:0,startTime:null};

function startBuiltinSession(idx){currentSession=SEED_SESSIONS[idx%SEED_SESSIONS.length];sessionState={block:0,startTime:Date.now()};renderBlock(0);}
function startGeneratedSession(s){currentSession=s;sessionState={block:0,startTime:Date.now()};renderBlock(0);}
function renderBlock(idx){
  if(idx>=4){completeSession();return;}
  const blocks=['A','B','C','D'];
  const prog=blocks.map((b,i)=>`<div class="prog-seg ${i<idx?'done':i===idx?'active':''}" title="Block ${b}"></div>`).join('');
  if(idx===0)renderBlockA(prog);
  else if(idx===1)renderBlockB(prog);
  else if(idx===2)renderBlockC(prog);
  else if(idx===3)renderBlockD(prog);
  window.scrollTo(0,0);
}

function renderBlockA(prog){
  const s=currentSession.shadowing;
  const isLive=currentSession.isLive;
  const lvlBadge=currentSession.targetLevels?`<span class="level-badge level-${currentSession.targetLevels.reading}">${currentSession.targetLevels.reading}</span>`:'';
  const styleIcons={text:'📖',music:'🎵',series:'🎬',conversation:'💬'};
  const styleIcon=styleIcons[currentSession.learningStyle||state.profile?.style]||'📖';
  const styleNote=s.styleNote?`<div style="font-size:12px;color:var(--text3);font-style:italic;margin-bottom:12px">${styleIcon} ${s.styleNote}</div>`:'';
  document.getElementById('session-inner').innerHTML=`
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header"><div class="block-letter A">A</div><div><div class="block-title">Shadowing</div><div class="block-desc">Read along, then listen and repeat. Focus on rhythm and intonation.</div></div></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <span style="font-size:13px;font-weight:500;color:var(--text2)">${s.title||''}</span>
      <div style="display:flex;gap:6px">${lvlBadge}${isLive?'<span class="live-badge"><span class="live-dot"></span>Live</span>':''}</div>
    </div>
    ${styleNote}
    <div class="shadow-text">${s.text}</div>
    <button class="play-btn" id="play-btn" onclick="playAudio(${JSON.stringify(s.audio_text)})">
      <div class="play-icon"><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6L1 13V1z"/></svg></div>
      Play audio (Text-to-Speech)
    </button>
    <div style="margin-top:12px;font-size:12px;color:var(--text3)">💡 Shadow along: ouça e repita ao mesmo tempo. Faça 2–3 vezes.</div>
    <div class="nav-bottom"><div class="block-check"><div class="check-toggle" id="check-A" onclick="toggleCheck('A')"></div><span>Mark as done</span></div><button class="btn btn-primary btn-sm" onclick="renderBlock(1)">Next →</button></div>`;
}

function renderBlockB(prog){
  const phrases=currentSession.phrases;
  const saved=state.favPhrases.map(f=>f.en);
  const html=phrases.map((p,i)=>`
    <div class="phrase-card">
      <div class="phrase-en">${p.en}</div>
      <div class="phrase-pt">${p.pt}</div>
      <div class="phrase-example">${p.example}</div>
      <button class="fav-btn ${saved.includes(p.en)?'active':''}" id="fav-${i}" onclick="toggleFav(${i})">${saved.includes(p.en)?'★':'☆'}</button>
    </div>`).join('');
  document.getElementById('session-inner').innerHTML=`
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header"><div class="block-letter B">B</div><div><div class="block-title">Useful phrases</div><div class="block-desc">Read, understand, and mentally use each phrase. Star the ones you love.</div></div></div>
    ${currentSession.isLive?'<div style="margin-bottom:14px"><span class="live-badge"><span class="live-dot"></span>Frases com conteúdo atual</span></div>':''}
    ${html}
    <div class="nav-bottom"><div class="block-check"><div class="check-toggle" id="check-B" onclick="toggleCheck('B')"></div><span>Mark as done</span></div><button class="btn btn-primary btn-sm" onclick="renderBlock(2)">Next →</button></div>`;
}

function renderBlockC(prog){
  const qs=currentSession.questions;
  const speechOk=hasSpeechSupport();
  const lvlBadge=currentSession.targetLevels?`<span class="level-badge level-${currentSession.targetLevels.speaking}">${currentSession.targetLevels.speaking}</span>`:'';
  const html=qs.map((q,i)=>`
    <div class="question-card">
      <div style="font-size:15px;font-weight:500;color:var(--text);margin-bottom:6px">${i+1}. ${q.q}</div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:10px">💬 ${q.tip}</div>
      <div class="voice-area">
        ${speechOk?`
        <div class="input-mode-toggle">
          <button class="mode-btn active" id="mode-voice-${i}" onclick="setMode(${i},'voice')">🎙 Voz</button>
          <button class="mode-btn" id="mode-text-${i}" onclick="setMode(${i},'text')">⌨ Texto</button>
        </div>
        <div id="voice-panel-${i}">
          <div class="mic-row">
            <button class="mic-btn" id="mic-btn-${i}" onclick="toggleRecording(${i})"><span style="font-size:16px">🎙</span><span id="mic-label-${i}">Gravar resposta</span></button>
            <span class="mic-status" id="mic-status-${i}">Pronto para gravar</span>
          </div>
          <textarea class="transcript-box" id="ans-${i}" placeholder="Sua resposta aparece aqui enquanto você fala…" rows="3"></textarea>
          <div class="no-speech-note">${getMobileNote()}</div>
        </div>
        <div id="text-panel-${i}" style="display:none">
          <textarea class="answer-input" id="ans-text-${i}" placeholder="Write your answer in English…" rows="3" oninput="document.getElementById('ans-${i}')&&(document.getElementById('ans-${i}').value=this.value)"></textarea>
        </div>`:`
        <textarea class="answer-input" id="ans-${i}" placeholder="Write your answer in English…" rows="3"></textarea>
        <div class="no-speech-note" style="color:var(--amber)">${getMobileNote()}</div>`}
      </div>
      <button class="ai-feedback-btn" id="fb-btn-${i}" onclick="getAIFeedback(${i})">
        <span class="spinner"></span><span class="btn-label">✦ Get AI feedback</span>
      </button>
      <div class="feedback-box" id="fb-${i}"></div>
    </div>`).join('');
  document.getElementById('session-inner').innerHTML=`
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header"><div class="block-letter C">C</div><div><div class="block-title">Speaking practice</div><div class="block-desc">${speechOk?'Responda em voz alta — grave e receba feedback de IA.':'Escreva suas respostas e receba feedback de IA.'}</div></div></div>
    ${lvlBadge?`<div style="margin-bottom:12px">${lvlBadge} <span style="font-size:12px;color:var(--text2)">Perguntas calibradas para seu nível</span></div>`:''}
    ''
    ${html}
    <div class="nav-bottom"><div class="block-check"><div class="check-toggle" id="check-C" onclick="toggleCheck('C')"></div><span>Mark as done</span></div><button class="btn btn-primary btn-sm" onclick="stopAllRecording();renderBlock(3)">Next →</button></div>`;
}

function renderBlockD(prog){
  const c=currentSession.challenge;
  const cueHTML=(c.cues||[]).map(cu=>`<div class="cue"><strong>${cu.label}:</strong> "${cu.example}"</div>`).join('');
  document.getElementById('session-inner').innerHTML=`
    <div class="session-progress-bar">${prog}</div>
    <div class="block-header"><div class="block-letter D">D</div><div><div class="block-title">Real challenge</div><div class="block-desc">Simule uma situação profissional real.</div></div></div>
    <div class="scenario-card">
      <div class="scenario-tag">${c.tag}</div>
      <div class="scenario-title">${c.title}</div>
      <div class="scenario-prompt">${c.prompt}</div>
      ${cueHTML?`<div style="margin-top:14px"><div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Estrutura sugerida</div>${cueHTML}</div>`:''}
    </div>
    <textarea class="answer-input" id="challenge-ans" placeholder="Escreva como você lidaria com essa situação…" rows="5"></textarea>
    <button class="ai-feedback-btn" id="challenge-fb-btn" onclick="getChallengeAIFeedback()">
      <span class="spinner"></span><span class="btn-label">✦ Get AI feedback</span>
    </button>
    <div class="feedback-box" id="challenge-fb"></div>
    <div class="nav-bottom"><div class="block-check"><div class="check-toggle" id="check-D" onclick="toggleCheck('D')"></div><span>Mark as done</span></div><button class="btn btn-primary" onclick="renderBlock(4)">Finish session ✓</button></div>`;
}

// ── AI Feedback ──
async function getAIFeedback(qIdx){
  const ans=document.getElementById('ans-'+qIdx)?.value.trim();
  const btn=document.getElementById('fb-btn-'+qIdx);
  const fb=document.getElementById('fb-'+qIdx);
  if(!ans||ans.length<5){showToast('Escreva sua resposta primeiro!');return;}
  btn.classList.add('loading');btn.disabled=true;
  fb.style.display='none';fb.textContent='';
  const q=currentSession.questions[qIdx];
  const lvl=state.levels?.speaking||'B1';
  const system=`You are an English coach for a Brazilian professional at approximately ${lvl} level. Give concise, specific, encouraging feedback. Focus on: fluency, naturalness, vocabulary, and grammar. Max 4 sentences. Start with a strength, then give 1-2 concrete improvements with corrected examples. Calibrate your expectations to ${lvl} level.`;
  const prompt=`Question: "${q.q}"\nStudent's answer: "${ans}"\nGive feedback in English.`;
  let text='';
  await callGemini(prompt,system,
    chunk=>{text+=chunk;fb.className='feedback-box good';fb.style.display='block';fb.innerHTML='<div class="fb-header">✦ AI Feedback</div><span class="streaming-cursor">'+text+'</span>';},
    ()=>{fb.innerHTML='<div class="fb-header">✦ AI Feedback</div>'+text;btn.classList.remove('loading');btn.disabled=false;},
    err=>{fb.innerHTML='<div class="fb-header">⚠ Erro</div>'+err;fb.className='feedback-box error';fb.style.display='block';btn.classList.remove('loading');btn.disabled=false;}
  );
}

async function getChallengeAIFeedback(){
  const ans=document.getElementById('challenge-ans')?.value.trim();
  const btn=document.getElementById('challenge-fb-btn');
  const fb=document.getElementById('challenge-fb');
  if(!ans||ans.length<5){showToast('Escreva sua resposta primeiro!');return;}
  btn.classList.add('loading');btn.disabled=true;fb.style.display='none';
  const c=currentSession.challenge;
  const lvl=state.levels?.speaking||'B1';
  const system=`You are an English coach and business communication expert for Brazilian professionals at ${lvl} level. Analyze the response. Give concrete actionable feedback on: English quality, professional tone, persuasiveness, and structure. Max 5 sentences. Be encouraging but specific.`;
  const prompt=`Scenario: "${c.prompt}"\nStudent's response: "${ans}"\nAnalyze their English and communication.`;
  let text='';
  await callGemini(prompt,system,
    chunk=>{text+=chunk;fb.className='feedback-box good';fb.style.display='block';fb.innerHTML='<div class="fb-header">✦ AI Feedback</div><span class="streaming-cursor">'+text+'</span>';},
    ()=>{fb.innerHTML='<div class="fb-header">✦ AI Feedback</div>'+text;btn.classList.remove('loading');btn.disabled=false;},
    err=>{fb.innerHTML='<div class="fb-header">⚠ Erro</div>'+err;fb.className='feedback-box error';fb.style.display='block';btn.classList.remove('loading');btn.disabled=false;}
  );
}

async function generateWeeklyInsight(){
  const btn=document.getElementById('insight-btn');
  const el=document.getElementById('weekly-feedback-text');
  if(!isProxyAvailable()){el.textContent='IA disponível apenas na versão hospedada.';return;}
  btn.textContent='…';btn.disabled=true;el.textContent='';el.classList.add('streaming-cursor');
  const topics=state.sessionHistory.slice(0,5).map(s=>s.topic).join(', ')||'general English';
  const levels=state.levels?`Reading: ${state.levels.reading}, Writing: ${state.levels.writing}, Speaking: ${state.levels.speaking}, Listening: ${state.levels.listening}`:'not assessed yet';
  const system=`You are a supportive direct English coach. Give a personalized 3-sentence weekly insight to a Brazilian professional. Be specific, motivating, and give one concrete action tip tailored to their level.`;
  const prompt=`Stats: ${state.streak} day streak, ${state.totalSessions} sessions, ${state.totalMinutes} minutes. Topics: ${topics}. CEFR levels: ${levels}. Favorites: ${state.favPhrases.length}. Give insight and one specific action for next week.`;
  let text='';
  await callGemini(prompt,system,
    chunk=>{text+=chunk;el.textContent=text;},
    ()=>{el.classList.remove('streaming-cursor');btn.textContent='Regenerate ✦';btn.disabled=false;},
    err=>{el.textContent='Erro: '+err;el.classList.remove('streaming-cursor');btn.textContent='Retry ✦';btn.disabled=false;}
  );
}

// ══════════════════════════════════════════════
//  COMPLETE SESSION
// ══════════════════════════════════════════════
function completeSession(){
  const elapsed=Math.round((Date.now()-sessionState.startTime)/60000);
  const mins=Math.max(20,Math.min(45,elapsed||30));
  const today=new Date().toISOString().split('T')[0];
  state.totalSessions++;state.totalMinutes+=mins;
  state.todayCompleted=true;state.lastStudyDate=today;
  if(!state.completedDays.includes(today)){
    state.completedDays.push(today);
    const yesterday=new Date(Date.now()-86400000).toISOString().split('T')[0];
    state.streak=state.completedDays.includes(yesterday)||state.streak===0?state.streak+1:1;
  }
  state.sessionHistory.unshift({date:today,topic:currentSession.topic||state.currentTopic||'Session',duration:mins,isLive:!!currentSession.isLive});
  currentSession?.phrases?.slice(0,3).forEach(p=>{
    if(!state.recentPhrases.includes(p.en))state.recentPhrases.unshift(p.en);
  });
  state.recentPhrases=state.recentPhrases.slice(0,8);
  saveState();
  // v4: suggest re-test after 10 sessions since last test
  const sessionsSinceTest=state.totalSessions%30===0&&state.totalSessions>0;
  document.getElementById('session-inner').innerHTML=`
    <div class="session-complete">
      <div class="trophy">🎉</div>
      <h2>Session complete!</h2>
      <p>You studied for ~${mins} minutes. That's real progress.</p>
      <div class="xp-badge">+${mins} min · Streak: ${state.streak} days 🔥</div>
      ${sessionsSinceTest?'<div style="background:rgba(108,140,255,.1);border:1px solid rgba(108,140,255,.25);border-radius:var(--radius-sm);padding:12px 16px;font-size:13px;color:var(--accent);margin-bottom:16px">📊 Você completou 30 sessões! Que tal refazer o teste de nível para ver sua evolução?</div>':''}
      <div style="display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto">
        <button class="btn btn-primary" style="justify-content:center" onclick="goTo('dashboard')">Back to home</button>
        <button class="btn btn-ghost" style="justify-content:center" onclick="goTo('progress');setTimeout(()=>showTab('favorites'),100)">View saved phrases</button>
        ${sessionsSinceTest?'<button class="btn btn-ghost" style="justify-content:center;color:var(--accent)" onclick="startPlacementTest()">📊 Refazer teste de nível</button>':''}
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
//  VOICE RECORDING (mobile-aware)
// ══════════════════════════════════════════════
const SpeechRecognitionAPI=window.SpeechRecognition||window.webkitSpeechRecognition;
let activeRecognition=null,activeRecIdx=null;
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;
const isAndroid=/Android/.test(navigator.userAgent);
const isMobile=isIOS||isAndroid;
function hasSpeechSupport(){if(isIOS)return false;return!!SpeechRecognitionAPI;}
function getMobileNote(){
  if(isIOS)return '⚠ iOS Safari não suporta gravação de voz. Use texto ou acesse pelo Chrome no Android.';
  if(isAndroid)return 'Fale em inglês · Chrome Android · Pressione Parar quando terminar';
  return 'Fale em inglês · Chrome/Edge funcionam melhor';
}
function setMode(idx,mode){
  const vp=document.getElementById('voice-panel-'+idx),tp=document.getElementById('text-panel-'+idx);
  const bv=document.getElementById('mode-voice-'+idx),bt=document.getElementById('mode-text-'+idx);
  if(!vp||!tp)return;
  if(mode==='voice'){vp.style.display='block';tp.style.display='none';bv.classList.add('active');bt.classList.remove('active');}
  else{vp.style.display='none';tp.style.display='block';bv.classList.remove('active');bt.classList.add('active');stopRecording(idx);}
}
function toggleRecording(idx){
  if(activeRecIdx===idx&&activeRecognition)stopRecording(idx);
  else{if(activeRecognition)stopRecording(activeRecIdx);startRecording(idx);}
}
function startRecording(idx){
  if(!SpeechRecognitionAPI||isIOS){showToast('Gravação não disponível. Use modo texto.');setMode(idx,'text');return;}
  const rec=new SpeechRecognitionAPI();
  rec.lang='en-US';rec.interimResults=true;rec.continuous=!isMobile;rec.maxAlternatives=1;
  const ta=document.getElementById('ans-'+idx),mb=document.getElementById('mic-btn-'+idx);
  const ml=document.getElementById('mic-label-'+idx),ms=document.getElementById('mic-status-'+idx);
  let final=ta?ta.value:'',shouldRestart=true;
  rec.onstart=()=>{activeRecIdx=idx;mb?.classList.add('recording');if(ml)ml.textContent='Parar';if(ms){ms.textContent='● Gravando…';ms.classList.add('active');}ta?.classList.add('listening');};
  rec.onresult=e=>{
    let interim='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      const t=e.results[i][0].transcript;
      if(e.results[i].isFinal){final+=(final?' ':'')+t.trim();}else{interim=t;}
    }
    if(ta)ta.value=final+(interim?' '+interim:'');
    const tf=document.getElementById('ans-text-'+idx);if(tf)tf.value=ta?.value||'';
  };
  rec.onerror=e=>{
    if(e.error==='no-speech'&&isMobile&&shouldRestart&&activeRecIdx===idx){try{rec.start();}catch{}return;}
    const msgs={'not-allowed':'Permissão de microfone negada.','network':'Erro de rede.','aborted':''};
    const msg=msgs[e.error];if(msg)showToast(msg);
    shouldRestart=false;stopRecording(idx);
  };
  rec.onend=()=>{if(shouldRestart&&activeRecIdx===idx&&activeRecognition===rec){try{rec.start();}catch{stopRecording(idx);}}};
  activeRecognition=rec;
  try{rec.start();}catch(e){showToast('Não foi possível iniciar: '+e.message);}
}
function stopRecording(idx){
  if(activeRecognition){const r=activeRecognition;activeRecognition=null;try{r.stop();}catch{}}
  activeRecIdx=null;
  const mb=document.getElementById('mic-btn-'+idx),ml=document.getElementById('mic-label-'+idx);
  const ms=document.getElementById('mic-status-'+idx),ta=document.getElementById('ans-'+idx);
  mb?.classList.remove('recording');
  if(ml)ml.textContent='Gravar resposta';
  if(ms){ms.textContent=ta?.value.trim()?'✓ Gravação concluída':'Pronto para gravar';ms.classList.remove('active');}
  ta?.classList.remove('listening');
}
function stopAllRecording(){if(activeRecIdx!==null)stopRecording(activeRecIdx);}

// ══════════════════════════════════════════════
//  TTS (iOS-safe)
// ══════════════════════════════════════════════
function playAudio(text){
  if(!('speechSynthesis' in window)){showToast('Áudio não suportado.');return;}
  const btn=document.getElementById('play-btn');
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='en-US';u.rate=0.88;u.pitch=1;
  if(btn){btn.innerHTML=`<div class="play-icon" style="background:var(--green)"><svg width="10" height="10" viewBox="0 0 10 10" fill="white"><rect x="1" y="1" width="3" height="8" rx="1"/><rect x="6" y="1" width="3" height="8" rx="1"/></svg></div> Playing…`;}
  u.onend=()=>{if(btn)btn.innerHTML=`<div class="play-icon"><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6L1 13V1z"/></svg></div> Play again`;};
  u.onerror=()=>{if(btn)btn.innerHTML=`<div class="play-icon"><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6L1 13V1z"/></svg></div> Tentar novamente`;};
  function speak(){
    const voices=window.speechSynthesis.getVoices();
    const v=voices.find(v=>v.lang.startsWith('en')&&v.name.includes('Google'))||voices.find(v=>v.lang==='en-US')||voices.find(v=>v.lang.startsWith('en'));
    if(v)u.voice=v;
    window.speechSynthesis.speak(u);
  }
  const voices=window.speechSynthesis.getVoices();
  if(voices.length>0){speak();}
  else{window.speechSynthesis.speak(u);window.speechSynthesis.onvoiceschanged=()=>{window.speechSynthesis.onvoiceschanged=null;};}
}

// ══════════════════════════════════════════════
//  PWA — v5
// ══════════════════════════════════════════════
let deferredInstallPrompt=null;

function initPWA(){
  // Register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(e=>console.log('SW reg failed (expected in file:// mode)',e));
  }
  // Capture install prompt (Chrome/Edge/Android)
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredInstallPrompt=e;
    // Show banner on dashboard after a moment
    setTimeout(()=>{
      const banner=document.getElementById('pwa-banner');
      if(banner&&!localStorage.getItem('pwa_dismissed'))banner.classList.add('show');
      const installBtn=document.getElementById('pwa-install-btn');
      if(installBtn)installBtn.style.display='inline-flex';
    },2000);
  });
  // Detect if already installed
  if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone){
    const msg=document.getElementById('pwa-installed-msg');
    if(msg)msg.style.display='block';
    return;
  }
  // iOS: show manual instructions
  if(isIOS){
    const tip=document.getElementById('pwa-ios-tip');
    if(tip)tip.style.display='block';
  }
}

async function installPWA(){
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    const{outcome}=await deferredInstallPrompt.userChoice;
    deferredInstallPrompt=null;
    const banner=document.getElementById('pwa-banner');
    if(banner)banner.classList.remove('show');
    if(outcome==='accepted'){showToast('✓ FluentFlow instalado com sucesso!');}
  }else{
    showToast('Para instalar: use o menu do navegador → "Adicionar à tela inicial"');
  }
}
function dismissPWA(){
  localStorage.setItem('pwa_dismissed','1');
  const banner=document.getElementById('pwa-banner');
  if(banner)banner.classList.remove('show');
}

// ══════════════════════════════════════════════
//  PROGRESS
// ══════════════════════════════════════════════
function renderProgress(){
  const thisWeek=state.sessionHistory.filter(s=>isThisWeek(s.date)).length;
  document.getElementById('ov-sessions').textContent=thisWeek+' / '+state.weeklyGoal;
  document.getElementById('ov-bar').style.width=Math.round(Math.min(1,thisWeek/state.weeklyGoal)*100)+'%';
  const counts={};
  state.sessionHistory.forEach(s=>{counts[s.topic]=(counts[s.topic]||0)+1;});
  document.getElementById('topics-list').innerHTML=Object.entries(counts).length
    ?Object.entries(counts).map(([t,c])=>`<span class="topic-tag">${t} <strong style="color:var(--accent)">${c}×</strong></span>`).join('')
    :'<span style="color:var(--text3);font-size:13px">Nenhuma sessão ainda.</span>';
  // CEFR progression card
  const cfCard=document.getElementById('cefr-progress-card');
  if(state.levels){
    const skills=['reading','listening','writing','speaking'];
    const icons={reading:'📖',listening:'👂',writing:'✍',speaking:'🎙'};
    cfCard.innerHTML=`
      <div class="section-title" style="margin-bottom:10px">Níveis atuais</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${skills.map(s=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface2);border-radius:var(--radius-sm)">
            <span style="font-size:12px;color:var(--text2)">${icons[s]} ${s.charAt(0).toUpperCase()+s.slice(1)}</span>
            <span class="level-badge level-${state.levels[s]}">${state.levels[s]}</span>
          </div>`).join('')}
      </div>
      ${state.levelHistory.length>1?`<div style="margin-top:10px;font-size:12px;color:var(--text3)">Teste mais recente: ${state.levelHistory[state.levelHistory.length-1].date}</div>`:''}
      <button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="startPlacementTest()">📊 Refazer teste</button>`;
  }else{
    cfCard.innerHTML=`<p style="font-size:13px;color:var(--text2)">Faça o teste de nivelamento para ver seu progresso CEFR. <button onclick="startPlacementTest()" style="background:none;border:none;color:var(--accent);cursor:pointer;font-size:13px;text-decoration:underline">Fazer agora →</button></p>`;
  }
  showTab('overview');
}

function renderCalendar(){
  const today=new Date();const cells=[];
  for(let i=27;i>=0;i--){
    const d=new Date(today);d.setDate(today.getDate()-i);
    const ds=d.toISOString().split('T')[0];
    const done=state.sessionHistory.some(s=>s.date===ds)||state.completedDays.includes(ds);
    const isToday=ds===today.toISOString().split('T')[0];
    cells.push(`<div class="cal-day${done?' done':''}${isToday?' today':''}" title="${ds}">${d.getDate()}</div>`);
  }
  document.getElementById('calendar-grid').innerHTML=cells.join('');
  document.getElementById('session-history').innerHTML=state.sessionHistory.slice(0,7).map(s=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px">
      <div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:500">${s.topic}</span>
          ${s.isLive?'<span class="live-badge" style="font-size:10px;padding:1px 6px"><span class="live-dot"></span>live</span>':''}
        </div>
        <div style="color:var(--text3);font-size:11px;margin-top:2px">${new Date(s.date+'T12:00').toLocaleDateString('pt-BR',{weekday:'short',month:'short',day:'numeric'})}</div>
      </div>
      <div style="color:var(--green);font-size:12px">~${s.duration} min ✓</div>
    </div>`).join('')||'<p style="color:var(--text3);font-size:13px;padding:16px 0">Nenhuma sessão ainda.</p>';
}

function renderFavorites(){
  document.getElementById('fav-count').textContent=state.favPhrases.length;
  const empty=document.getElementById('fav-empty'),list=document.getElementById('fav-list');
  if(!state.favPhrases.length){list.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  list.innerHTML=state.favPhrases.map((p,i)=>`
    <div class="fav-phrase">
      <div><div class="fav-phrase-en">${p.en}</div><div class="fav-phrase-pt">${p.pt}</div>${p.example?`<div style="font-size:12px;color:var(--text3);margin-top:3px;font-style:italic">${p.example}</div>`:''}</div>
      <button class="btn-icon btn" onclick="removeFav(${i})" title="Remover">✕</button>
    </div>`).join('');
}
function removeFav(i){state.favPhrases.splice(i,1);saveState();renderFavorites();showToast('Removido');}

function renderErrors(){
  document.getElementById('errors-list').innerHTML=COMMON_ERRORS.map(e=>`
    <div class="error-item">
      <div class="error-dot"></div>
      <div>
        <div style="font-size:13px"><span style="color:var(--coral);text-decoration:line-through">${e.error}</span> → <span style="color:var(--green)">${e.fix}</span></div>
        <div style="color:var(--text3);font-size:12px;margin-top:3px">${e.note}</div>
      </div>
    </div>`).join('');
}

// ══════════════════════════════════════════════
//  NEWS
// ══════════════════════════════════════════════
function renderNews(){
  const hasKey=isProxyAvailable();
  const lb=document.getElementById('live-badge');if(lb)lb.style.display=hasKey?'inline-flex':'none';
  document.getElementById('news-list').innerHTML=NEWS_TOPICS.map((n,i)=>`
    <div class="news-card" onclick="startFromTopic(${i})">
      <div class="news-card-top">
        <div><div class="news-tag ${n.tag}">${n.icon} ${n.tag.toUpperCase()}</div><div class="news-title">${n.title}</div></div>
        ${hasKey?'<span class="live-badge" style="flex-shrink:0;font-size:10px"><span class="live-dot"></span>live</span>':''}
      </div>
      <div class="news-desc">${n.desc}</div>
      <div class="news-footer"><div class="news-meta">${n.topic}</div><span style="font-size:12px;color:var(--accent)">Estudar este →</span></div>
    </div>`).join('');
}
function startFromTopic(idx){goTo('session');setTimeout(()=>selectTopic(idx),100);}

// ══════════════════════════════════════════════
//  SETTINGS
// ══════════════════════════════════════════════
function renderSettings(){
  setupUserUI(currentUser);
}

// ══════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════
function toggleCheck(letter){
  const btn=document.getElementById('check-'+letter);if(!btn)return;
  btn.classList.toggle('done');btn.textContent=btn.classList.contains('done')?'✓':'';
}
function toggleFav(i){
  const p=currentSession.phrases[i];const btn=document.getElementById('fav-'+i);
  const idx=state.favPhrases.findIndex(f=>f.en===p.en);
  if(idx>=0){state.favPhrases.splice(idx,1);btn.textContent='☆';btn.classList.remove('active');showToast('Removido dos favoritos');}
  else{state.favPhrases.push({en:p.en,pt:p.pt,example:p.example});btn.textContent='★';btn.classList.add('active');showToast('⭐ Salvo nos favoritos!');}
  saveState();
}
function exportData(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='fluentflow-progress.json';a.click();
}
function clearData(){
  if(!confirm('Resetar TODOS os dados? Isso não pode ser desfeito.'))return;
  state={...DEFAULT_STATE};saveState();renderDashboard();showToast('Dados resetados.');
}
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600);
}

// ══════════════════════════════════════════════
//  ONBOARDING — Learning profile (v5.5)
// ══════════════════════════════════════════════
const LEARNING_STYLES = [
  { id:'text',         icon:'📖', title:'Texto & leitura',     desc:'Prefiro ler artigos, diálogos e textos naturais' },
  { id:'music',        icon:'🎵', title:'Música',              desc:'Aprendo melhor com letras e ritmo de músicas' },
  { id:'series',       icon:'🎬', title:'Séries & filmes',     desc:'Gosto de aprender com diálogos de séries e filmes' },
  { id:'conversation', icon:'💬', title:'Conversação',         desc:'Quero praticar situações reais de diálogo' },
];

const MOTIVATIONS = [
  { id:'work',    icon:'💼', title:'Trabalho',        desc:'Reuniões, apresentações e comunicação profissional' },
  { id:'travel',  icon:'✈️',  title:'Viagem',          desc:'Me virar em outros países e situações cotidianas' },
  { id:'culture', icon:'🎭', title:'Cultura & entretenimento', desc:'Séries, música, filmes e cultura pop' },
  { id:'general', icon:'🌍', title:'Fluência geral',  desc:'Quero falar inglês bem em qualquer situação' },
];

const TIME_OPTIONS = [
  { mins:15, label:'Sessão rápida', desc:'dias corridos' },
  { mins:30, label:'Sessão padrão', desc:'recomendado' },
  { mins:45, label:'Sessão completa', desc:'aprendizado intenso' },
];

let onboardingProfile = { style: null, motivation: null, time: 30 };

function startOnboarding() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-onboarding').classList.add('active');
  onboardingProfile = { style: null, motivation: null, time: 30 };
  renderOnboardingStep(0);
  window.scrollTo(0, 0);
}

function renderOnboardingStep(step) {
  const inner = document.getElementById('onboarding-inner');
  const dots = [0,1,2].map(i =>
    `<div class="onboarding-dot ${i < step ? 'done' : i === step ? 'active' : ''}"></div>`
  ).join('');

  if (step === 0) {
    // Style selection
    inner.innerHTML = `
      <div class="onboarding-wrap">
        <div class="onboarding-dots">${dots}</div>
        <div class="onboarding-header">
          <h2>Como você aprende melhor?</h2>
          <p>Vamos adaptar o conteúdo das suas sessões ao seu estilo de aprendizado.</p>
        </div>
        <div class="profile-grid">
          ${LEARNING_STYLES.map(s => `
            <div class="profile-card ${onboardingProfile.style===s.id?'selected':''}" onclick="selectStyle('${s.id}')">
              <div class="profile-card-icon">${s.icon}</div>
              <div class="profile-card-title">${s.title}</div>
              <div class="profile-card-desc">${s.desc}</div>
            </div>`).join('')}
        </div>
        <div class="onboarding-nav">
          <span style="font-size:13px;color:var(--text3)">1 de 3</span>
          <button class="btn btn-primary" onclick="onboardingNext(0)" ${onboardingProfile.style?'':'disabled'} id="ob-next-0">Próximo →</button>
        </div>
      </div>`;
  } else if (step === 1) {
    // Motivation
    inner.innerHTML = `
      <div class="onboarding-wrap">
        <div class="onboarding-dots">${dots}</div>
        <div class="onboarding-header">
          <h2>Por que você quer aprender inglês?</h2>
          <p>Vamos priorizar os temas e situações mais relevantes para você.</p>
        </div>
        <div class="profile-grid">
          ${MOTIVATIONS.map(m => `
            <div class="profile-card ${onboardingProfile.motivation===m.id?'selected':''}" onclick="selectMotivation('${m.id}')">
              <div class="profile-card-icon">${m.icon}</div>
              <div class="profile-card-title">${m.title}</div>
              <div class="profile-card-desc">${m.desc}</div>
            </div>`).join('')}
        </div>
        <div class="onboarding-nav">
          <button class="btn btn-ghost btn-sm" onclick="renderOnboardingStep(0)">← Voltar</button>
          <span style="font-size:13px;color:var(--text3)">2 de 3</span>
          <button class="btn btn-primary" onclick="onboardingNext(1)" ${onboardingProfile.motivation?'':'disabled'} id="ob-next-1">Próximo →</button>
        </div>
      </div>`;
  } else if (step === 2) {
    // Time
    inner.innerHTML = `
      <div class="onboarding-wrap">
        <div class="onboarding-dots">${dots}</div>
        <div class="onboarding-header">
          <h2>Quanto tempo por dia?</h2>
          <p>Seja realista — consistência diária vale mais que sessões longas e esporádicas.</p>
        </div>
        <div class="time-options">
          ${TIME_OPTIONS.map(t => `
            <button class="time-btn ${onboardingProfile.time===t.mins?'selected':''}" onclick="selectTime(${t.mins})">
              <span class="time-btn-mins">${t.mins} min</span>
              <span class="time-btn-label">${t.label}</span>
              <span style="font-size:10px;color:var(--text3);display:block;margin-top:2px">${t.desc}</span>
            </button>`).join('')}
        </div>
        <div class="onboarding-nav">
          <button class="btn btn-ghost btn-sm" onclick="renderOnboardingStep(1)">← Voltar</button>
          <span style="font-size:13px;color:var(--text3)">3 de 3</span>
          <button class="btn btn-primary" onclick="finishOnboarding()">Começar →</button>
        </div>
      </div>`;
  }
}

function selectStyle(id) {
  onboardingProfile.style = id;
  document.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  const btn = document.getElementById('ob-next-0');
  if (btn) btn.disabled = false;
}

function selectMotivation(id) {
  onboardingProfile.motivation = id;
  document.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  const btn = document.getElementById('ob-next-1');
  if (btn) btn.disabled = false;
}

function selectTime(mins) {
  onboardingProfile.time = mins;
  document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function onboardingNext(step) {
  if (step === 0 && !onboardingProfile.style) { showToast('Selecione um estilo'); return; }
  if (step === 1 && !onboardingProfile.motivation) { showToast('Selecione uma motivação'); return; }
  renderOnboardingStep(step + 1);
  window.scrollTo(0, 0);
}

function finishOnboarding() {
  // Save profile to state
  state.profile = { ...onboardingProfile };
  state.weeklyGoal = onboardingProfile.time >= 45 ? 7 : onboardingProfile.time >= 30 ? 5 : 4;
  saveState();

  // Show result screen briefly then go to placement test
  const inner = document.getElementById('onboarding-inner');
  const styleInfo = LEARNING_STYLES.find(s => s.id === onboardingProfile.style);
  const motivInfo = MOTIVATIONS.find(m => m.id === onboardingProfile.motivation);

  inner.innerHTML = `
    <div class="onboarding-wrap" style="text-align:center;padding:40px 0">
      <div style="font-size:52px;margin-bottom:16px">🎯</div>
      <h2 style="font-family:'DM Serif Display',serif;font-size:28px;margin-bottom:8px">Perfil criado!</h2>
      <p style="color:var(--text2);font-size:14px;margin-bottom:24px;line-height:1.6">
        O conteúdo das suas sessões será adaptado ao seu estilo e objetivos.
      </p>
      <div class="profile-summary">
        <div class="profile-summary-item">
          <div class="profile-summary-icon">${styleInfo.icon}</div>
          <div class="profile-summary-label">Estilo</div>
          <div class="profile-summary-value">${styleInfo.title}</div>
        </div>
        <div class="profile-summary-item">
          <div class="profile-summary-icon">${motivInfo.icon}</div>
          <div class="profile-summary-label">Foco</div>
          <div class="profile-summary-value">${motivInfo.title}</div>
        </div>
        <div class="profile-summary-item">
          <div class="profile-summary-icon">⏱</div>
          <div class="profile-summary-label">Por dia</div>
          <div class="profile-summary-value">${onboardingProfile.time} min</div>
        </div>
      </div>
      <p style="font-size:13px;color:var(--text3);margin-bottom:20px">
        Agora vamos identificar seu nível de inglês para adaptar o conteúdo ao seu patamar atual.
      </p>
      <button class="btn btn-primary" onclick="startPlacementTest()" style="margin:0 auto">
        Fazer teste de nível →
      </button>
    </div>`;
}

// Profile labels for display
function getProfileLabels() {
  if (!state.profile) return null;
  const s = LEARNING_STYLES.find(x => x.id === state.profile.style);
  const m = MOTIVATIONS.find(x => x.id === state.profile.motivation);
  return { style: s, motivation: m, time: state.profile.time };
}

