const QUIZ_INICIO_PROGRESSO=3;const TOTAL_QUIZZES=13;function progressoAtivo(quizz){return quizz>=QUIZ_INICIO_PROGRESSO;}
function calcularProgresso(quizz){const etapaAtual=quizz-QUIZ_INICIO_PROGRESSO+1;return Math.min((etapaAtual/TOTAL_QUIZZES)*100,100);}
let idadeSelecionada='';function animateScreenIn(screenEl,containerSelector){if(!screenEl)return;const container=containerSelector?screenEl.querySelector(containerSelector):(screenEl.querySelector('.mx-auto.w-100')||screenEl);if(!container)return;screenEl.classList.remove('screen-animate-in');const items=Array.from(container.children);items.forEach(function(item){item.classList.remove('anim-item');item.style.animationDelay='';});void screenEl.offsetWidth;screenEl.classList.add('screen-animate-in');items.forEach(function(item,index){item.classList.add('anim-item');item.style.animationDelay=(index*0.07)+'s';});}
function showImportantPage(idade){if(idade){idadeSelecionada=idade;}
document.querySelectorAll('.quiz-screen').forEach(function(screen){screen.classList.add('d-none');});document.getElementById('quizTop').classList.add('d-none');document.getElementById('important-page').classList.remove('d-none');document.body.style.background='#32145c';document.documentElement.style.background='#32145c';const themeColor=document.querySelector('meta[name="theme-color"]');if(themeColor){themeColor.setAttribute('content','#32145c');}
animateScreenIn(document.getElementById('important-page'));}
function showAnalysisPage(){document.getElementById('important-page').classList.add('d-none');const analysisPage=document.getElementById('analysis-page');const loadingEl=document.getElementById('analysisLoading');const contentEl=document.getElementById('analysisContent');analysisPage.classList.remove('d-none');if(loadingEl)loadingEl.classList.remove('d-none');if(contentEl)contentEl.classList.add('d-none');document.body.style.background='#0d0517';document.documentElement.style.background='#0d0517';const themeColor=document.querySelector('meta[name="theme-color"]');if(themeColor){themeColor.setAttribute('content','#0d0517');}
animateScreenIn(analysisPage,'#analysisLoading');setTimeout(function(){if(loadingEl)loadingEl.classList.add('d-none');if(contentEl)contentEl.classList.remove('d-none');const ageEl=document.getElementById('analysisAgeText');if(ageEl&&idadeSelecionada){ageEl.textContent=idadeSelecionada;}
animateScreenIn(analysisPage,'#analysisContent');},1200);}
function hideAnalysisPage(nextQuestion){setTimeout(function(){document.querySelectorAll('.quiz-screen').forEach(function(screen){screen.classList.remove('d-none');});document.getElementById('analysis-page').classList.add('d-none');document.getElementById('important-page').classList.add('d-none');document.getElementById('quizTop').classList.remove('d-none');document.body.style.background='';document.documentElement.style.background='';const themeColor=document.querySelector('meta[name="theme-color"]');if(themeColor){themeColor.setAttribute('content','#FFFFFF');}
showQuestion(nextQuestion);},150);}
function selectQuizOption(button,nextQuestion){const options=button.closest('.quiz').querySelectorAll('.quiz-option');options.forEach(option=>{option.classList.remove('selected');});button.classList.add('selected');setTimeout(()=>{if(nextQuestion==='loading'){iniciarProcessamento();}else{showQuestion(nextQuestion);}},150);}
function goBackQuestion(){let currentQuestion=null;for(let i=1;i<=17;i++){const el=document.querySelector('.on-off-'+i);if(!el)continue;const display=window.getComputedStyle(el).display;if(display!=='none'){currentQuestion=i;break;}}
if(currentQuestion!==null){const previousQuestion=currentQuestion-1;if(previousQuestion>=1){showQuestion(previousQuestion);}}}
function setProgress(percent){const clamped=Math.max(0,Math.min(100,percent));document.getElementById('progressWrap').querySelector('.progress-bar').style.width=clamped+'%';}
function showQuestion(questionNumber){for(let i=1;i<=17;i++){const el=document.querySelector('.on-off-'+i);if(el){el.style.display='none';}}
const current=document.querySelector('.on-off-'+questionNumber);if(current){current.style.display=current.classList.contains('quiz-center')?'flex':'block';animateScreenIn(current);}
const backButton=document.getElementById('backButton');if(backButton){if(questionNumber>=2){backButton.style.display='block';}else{backButton.style.display='none';}}
const progressWrap=document.getElementById('progressWrap');if(progressWrap){if(progressoAtivo(questionNumber)){progressWrap.style.display='flex';const progressBar=progressWrap.querySelector('.progress-bar');if(progressBar){const progresso=calcularProgresso(questionNumber);progressBar.style.width=progresso+'%';}}else{progressWrap.style.display='none';}}
window.scrollTo(0,0);}
function iniciarProcessamento(){window.scrollTo(0,0);const quizAnterior=document.querySelector('.on-off-15');const quizTop=document.getElementById('quizTop');const loadingScreen=document.querySelector('.loading-screen');const progressBar=document.getElementById("progressBar-loadingScreen");const loadingIcon=document.getElementById("loadingIcon");const loadingTitle=document.getElementById("loadingTitle");const loadingSubtitle=document.getElementById("loadingSubtitle");const loadingContentBlock=document.getElementById("loadingContentBlock");const checklistItems=document.querySelectorAll("#loadingChecklist .loading-check-item");const themeColor=document.querySelector('meta[name="theme-color"]');if(quizAnterior){quizAnterior.style.display="none";}
if(quizTop){quizTop.classList.add('d-none');}
document.body.style.background='linear-gradient(150deg, #ff5f9e 0%, #e0357e 45%, #b0206b 100%)';document.documentElement.style.background='linear-gradient(150deg, #ff5f9e 0%, #e0357e 45%, #b0206b 100%)';if(themeColor){themeColor.setAttribute('content','#c22a72');}
if(loadingScreen){loadingScreen.style.display="flex";}
const etapas=[{icone:"🧠",titulo:"ANALIZANDO TUS RESPUESTAS...",subtitulo:"Procesando tu perfil personalizado"},{icone:"📅",titulo:"PREPARANDO LOS 28 DÍAS...",subtitulo:"Creando tu plan de entrenamiento exclusivo"},{icone:"🎯",titulo:"CALCULANDO TU POTENCIAL...",subtitulo:"Identificando tu objetivo de trasero ideal"},{icone:"📲",titulo:"¡CASI LISTO!",subtitulo:"Preparando tu entrenamiento personalizado"}];const DURACAO_ETAPA=1200;const TOTAL_ETAPAS=etapas.length;function atualizarChecklist(numeroEtapa){checklistItems.forEach(function(item,index){item.classList.remove('is-done','is-active','is-pending');if(index<numeroEtapa){item.classList.add('is-done');}else if(index===numeroEtapa){item.classList.add('is-active');}else{item.classList.add('is-pending');}});}
function trocarConteudo(etapa){if(loadingContentBlock){loadingContentBlock.classList.remove('loading-content-in');}
if(loadingContentBlock){void loadingContentBlock.offsetWidth;}
if(loadingIcon){loadingIcon.textContent=etapa.icone;}
if(loadingTitle){loadingTitle.textContent=etapa.titulo;}
if(loadingSubtitle){loadingSubtitle.textContent=etapa.subtitulo;}
if(loadingContentBlock){loadingContentBlock.classList.add('loading-content-in');}}
function executarEtapa(numeroEtapa){const etapa=etapas[numeroEtapa];trocarConteudo(etapa);atualizarChecklist(numeroEtapa);const inicio=performance.now();function animarProgresso(tempoAtual){const tempoPassado=tempoAtual-inicio;const fracaoEtapa=Math.min(tempoPassado/DURACAO_ETAPA,1);const progressoTotal=((numeroEtapa+fracaoEtapa)/TOTAL_ETAPAS)*100;if(progressBar){progressBar.style.width=progressoTotal+"%";}
if(fracaoEtapa>=1){if(numeroEtapa<TOTAL_ETAPAS-1){setTimeout(function(){executarEtapa(numeroEtapa+1);},250);}
else{finalizarProcessamento();}
return;}
requestAnimationFrame(animarProgresso);}
requestAnimationFrame(animarProgresso);}
function finalizarProcessamento(){if(progressBar){progressBar.style.width="100%";}
atualizarChecklist(TOTAL_ETAPAS);setTimeout(function(){if(loadingScreen){loadingScreen.style.display="none";}
document.body.style.background='';document.documentElement.style.background='';if(themeColor){themeColor.setAttribute('content','#FFFFFF');}
window.location.href = '/vsl';if(typeof enviarLeadAlServidor==='function'){enviarLeadAlServidor(true);}},700);}
executarEtapa(0);}
function validarCampo(idCampo,numeroAvanco){const campo=document.getElementById(idCampo);if(!campo)return false;if(campo.value.trim()===''){tremer(campo);campo.focus();return false;}
showQuestion(numeroAvanco);return true;}
function validarOpcaoQuiz(idQuiz,numeroAvanco){const container=document.getElementById(idQuiz);if(!container)return false;const opcoes=container.querySelectorAll('.quiz-opcao');let selecionada=false;opcoes.forEach(opcao=>{if(opcao.classList.contains('quiz-selecionada')){selecionada=true;}});if(!selecionada){tremer(container);return false;}
showQuestion(numeroAvanco);return true;}
function selecionarOpcaoQuiz(botao){const indicador=botao.querySelector('.quiz-indicador');const jaSelecionado=botao.classList.toggle('quiz-selecionada');if(indicador)indicador.innerHTML=jaSelecionado?'✓':'';}
function validarOpcoesQuiz(idQuiz,numeroAvanco){const quiz=document.getElementById(idQuiz);if(!quiz)return false;const selecionadas=quiz.querySelectorAll('.quiz-selecionada');if(selecionadas.length===0){const opcoes=quiz.querySelector('.quiz-opcoes');if(opcoes){tremer(opcoes);}else{tremer(quiz);}
return false;}
showQuestion(numeroAvanco);return true;}
function tremer(elemento){elemento.classList.add("shake");setTimeout(()=>{elemento.classList.remove("shake");},300);}
function toggleFaq(botao){const item=botao.closest('.faq-item');if(!item)return;item.classList.toggle('open');}
(function(){const STORAGE_KEY='oferta_deadline_10min';const DURACAO_MS=10*60*1000;document.addEventListener('DOMContentLoaded',()=>{const elementos=document.querySelectorAll('.offer-timer-value');if(!elementos.length)return;let deadline=parseInt(localStorage.getItem(STORAGE_KEY),10);if(!deadline||isNaN(deadline)){deadline=Date.now()+DURACAO_MS;try{localStorage.setItem(STORAGE_KEY,deadline);}catch(e){}}
function pad(n){return String(n).padStart(2,'0');}
function atualizar(){const restante=deadline-Date.now();let texto;if(restante<=0){texto='00:00';}else{const minutos=Math.floor(restante/(1000*60));const segundos=Math.floor((restante%(1000*60))/1000);texto=pad(minutos)+':'+pad(segundos);}
elementos.forEach(el=>{el.textContent=texto;});if(restante>0){setTimeout(atualizar,1000);}}
atualizar();});})();(function(){document.addEventListener('DOMContentLoaded',()=>{const barra=document.getElementById('stickyCheckoutBar');const alvo=document.getElementById('pricingSection');if(!barra||!alvo||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(!entry.isIntersecting&&entry.boundingClientRect.top<0){barra.classList.add('show');}else{barra.classList.remove('show');}});},{threshold:0});observer.observe(alvo);});})();