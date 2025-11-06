
// Sample data (you can replace icons with real images in /img)
const items = [
  {title:'Toy Bear Matrix', price:'★ 9 800', img:'img/item1.svg'},
  {title:'Desk Calendar Dead Line', price:'★ 820', img:'img/item2.svg'},
  {title:'Sharp Tongue', price:'★ 8 800', img:'img/item3.svg'},
  {title:'Easter Egg Pepe', price:'★ 1 600', img:'img/item4.svg'},
  {title:'Tama Gadget (Random)', price:'★ 200', img:'img/item5.svg'}
];

const caseItems = [
  {name:`Durov's Cap Dipper`, meta:'★ <span class="gold">96 000</span> / <span class="gem">650</span>', img:'img/case1.svg'},
  {name:'Vintage Cigar The Gentleman', meta:'★ <span class="gold">88 800</span> / <span class="gem">420</span>', img:'img/case2.svg'},
  {name:'Loot Bag City Life', meta:'★ <span class="gold">20 000</span> / <span class="gem">100</span>', img:'img/case3.svg'},
  {name:'Plush Pepe (Random)', meta:'★ <span class="gold">130 000</span> / <span class="gem">650</span>', img:'img/case4.svg'}
];

const strip = document.getElementById('strip');
items.forEach(i=>{
  const el = document.createElement('div');
  el.className='card';
  el.innerHTML = `<img src="${i.img}" alt=""><div class="title">${i.title}</div><div class="price">${i.price}</div>`;
  strip.appendChild(el);
});

const grid = document.getElementById('caseGrid');
caseItems.forEach(c=>{
  const el = document.createElement('div');
  el.className='case';
  el.innerHTML = `<img src="${c.img}" alt=""><div class="name">${c.name}</div><div class="meta">${c.meta}</div>`;
  grid.appendChild(el);
});

// Open button fake animation
const openBtn = document.getElementById('openBtn');
const loader = document.getElementById('loader');
openBtn.addEventListener('click', () => {
  loader.hidden = false;
  openBtn.disabled = true;
  // simple "spin" imitation: scroll strip to a random item then stop
  const cards = [...document.querySelectorAll('.strip .card')];
  const idx = Math.floor(Math.random()*cards.length);
  const target = cards[idx];
  target.scrollIntoView({inline:'center', behavior:'smooth'});
  setTimeout(()=>{
    loader.hidden = true;
    openBtn.disabled = false;
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.sendData) {
      Telegram.WebApp.sendData(JSON.stringify({win: items[idx].title}));
    } else {
      alert('Выпал приз: ' + items[idx].title);
    }
  }, 1400);
});

// Telegram WebApp init if exists
try { if (window.Telegram && Telegram.WebApp) Telegram.WebApp.init(); } catch(e){}
