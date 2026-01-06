const home=document.getElementById('home');
const screenEl=document.getElementById('screen');

function screen(){home.classList.add('hidden');screenEl.classList.remove('hidden');return screenEl}
function back(){screenEl.classList.add('hidden');home.classList.remove('hidden')}

function showParent(){
 const s=screen();
 s.innerHTML='<h2>Родитель</h2><button onclick="back()">Назад</button>';
}

function showSpeech(){
 const s=screen();
 s.innerHTML='<h2>Логопед</h2><button onclick="back()">Назад</button>';
}

function showAdmin(){
 const s=screen();
 s.innerHTML='<h2>Администратор</h2><button onclick="back()">Назад</button>';
}
