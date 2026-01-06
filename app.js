
// ====== ДАННЫЕ ======
const PRICE=16000;
const store=JSON.parse(localStorage.getItem("razum"))||{};

const data={
  "Васюкова Анастасия Александровна":["Фёдор","Артём","Мирослава","Александр","Яся"],
  "Прокопенко Светлана Геннадьевна":["Давид","Максим","Илья"],
  "Сафронова Наталья Николаевна":["Майя"]
};

const home=document.getElementById("home");
const screenEl=document.getElementById("screen");
function save(){localStorage.setItem("razum",JSON.stringify(store))}
function screen(){home.classList.add("hidden");screenEl.classList.remove("hidden");return screenEl}
function back(){screenEl.classList.add("hidden");home.classList.remove("hidden")}

function initChild(name,log){
 if(store[name])return;
 store[name]={name,log,lessonsLeft:8,reward:0,attendance:[],tasks:[
  {text:"Произнести слова со звуком «Р»",status:"active"},
  {text:"Артикуляционная гимнастика",status:"active"}
 ]};
 save();
}

// ====== РОДИТЕЛЬ ======
function showParent(){
 const s=screen();s.innerHTML="<h2>Выберите логопеда</h2>";
 Object.keys(data).forEach(l=>s.innerHTML+=`<button onclick="parentKids('${l}')">${l}</button>`);
 s.innerHTML+=`<button class='back' onclick='back()'>Назад</button>`;
}

function parentKids(log){
 const s=screen();s.innerHTML=`<h2>${log}</h2>`;
 data[log].forEach(k=>s.innerHTML+=`<button onclick="parentChild('${k}','${log}')">${k}</button>`);
 s.innerHTML+=`<button class='back' onclick='showParent()'>Назад</button>`;
}

function parentChild(name,log){
 initChild(name,log);
 const c=store[name];
 const s=screen();
 s.innerHTML=`<h2>${name}</h2>
 <div class='card'>Осталось занятий: ${c.lessonsLeft}<br>Награды: ${c.reward}</div>
 <div class='card'>
 ${c.tasks.map((t,i)=>`
 <label><input type='checkbox' onchange='toggle("${name}",${i})'> ${t.text}</label><br>`).join("")}
 <button onclick='send("${name}")'>Я выполнил задания</button>
 </div>
 <button class='back' onclick='parentKids("${log}")'>Назад</button>`;
}

function toggle(name,i){
 store[name].tasks[i].checked=!store[name].tasks[i].checked;
 save();
}
function send(name){
 const c=store[name];
 if(!c.tasks.every(t=>t.checked))return alert("Выполните все задания");
 c.tasks.forEach(t=>{t.status="review";delete t.checked});
 save();alert("Задания отправлены логопеду");
}

// ====== ЛОГОПЕД ======
function showSpeech(){
 const s=screen();s.innerHTML="<h2>Логопеды</h2>";
 Object.keys(data).forEach(l=>s.innerHTML+=`<button onclick="speechKids('${l}')">${l}</button>`);
 s.innerHTML+=`<button class='back' onclick='back()'>Назад</button>`;
}

function speechKids(log){
 const s=screen();s.innerHTML=`<h2>${log}</h2>`;
 data[log].forEach(k=>s.innerHTML+=`<button onclick="speechChild('${k}','${log}')">${k}</button>`);
 s.innerHTML+=`<button class='back' onclick='showSpeech()'>Назад</button>`;
}

function speechChild(name,log){
 initChild(name,log);
 const c=store[name];
 const s=screen();
 s.innerHTML=`<h2>${name}</h2>
 <div class='card'>
 <button onclick='mark("${name}","present")'>Пришёл</button>
 <button onclick='mark("${name}","absent")'>Не пришёл</button>
 </div>
 <button class='back' onclick='speechKids("${log}")'>Назад</button>`;
}

function mark(name,status){
 store[name].attendance.push({date:new Date().toLocaleDateString(),status});
 if(status==="present")store[name].lessonsLeft--;
 save();alert("Отмечено");
}

// ====== АДМИН ======
function showAdmin(){
 const s=screen();
 let total=0;
 Object.values(store).forEach(c=>total+=c.attendance.filter(a=>a.status==="present").length);
 s.innerHTML=`<h2>Администратор</h2>
 <div class='card'>Проведено занятий: ${total}<br>Доход: ${(total*2000).toLocaleString()} ₽</div>
 <button class='back' onclick='back()'>Назад</button>`;
}
