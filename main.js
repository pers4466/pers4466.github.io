/* ==============================================================
   ДАННЫЕ ПРОЕКТОВ
   
   Как добавить проект:
   1. Добавь объект в массив PROJECTS ниже.
   2. img       — путь к обложке (например "images/1.jpg")
   3. tags      — массив строк, используются в фильтрах автоматически
   4. wide      — true/false: карточка занимает 2 колонки
   5. blocks    — массив блоков контента на странице проекта:
   
      { type: 'img-full',    src: 'images/1.jpg' }
      { type: 'img-2',       items: ['images/a.jpg', 'images/b.jpg'] }
      { type: 'img-3',       items: ['images/a.jpg', 'images/b.jpg', 'images/c.jpg'] }
      { type: 'video-file',  src: 'video.mp4' }
      { type: 'video-embed', url: 'https://vimeo.com/...' }  ← Vimeo или YouTube
      { type: 'text',        label: 'Overview', heading: 'Title', body: 'Text\n\nParagraph 2' }
      { type: 'quote',       text: 'Quote text', author: 'Author name' }
      { type: 'divider' }
   
   ============================================================== */
const PROJECTS = [
  {
    id:           1,
    title:        'Nord Identity',
    client:       'Nord Living',
    tags:         ['brand', 'still'],
    year:         2024,
    img:          '1.jpg',
    wide:         true,
    description:  'A complete visual identity for a Scandinavian furniture brand.',
    role:         'Brand Identity, Art Direction',
    deliverables: 'Logo, Guidelines, Packaging',
    duration:     '12 weeks',
    blocks: [
      { type: 'img-full', src: '1.jpg' },
      { type: 'text',     label: 'Overview', heading: 'Redefining Nordic luxury', body: 'We built a viIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).We built a visual language around negative space and craftsmanship.We built a visual language around negative space and craftsmanship.We built a visual language around negative space and craftsmanship.We built a visual language around negative space and craftsmanship..\n\nEvery touchpoint carries the same quiet confidence.' },
      //{ type: 'img-2',    items: ['2.jpg', '2.jpg'] },
      //{ type: 'quote',    text: 'A brand that feels like it has always existed.', author: 'Creative Director' },
      //{ type: 'img-3',    items: ['4.jpg', '5.jpg', '6.jpg'] },
    ],
  },
  {
    id:           2,
    title:        'Pulse Motion Reel',
    client:       'Internal',
    tags:         ['motion', 'film'],
    year:         2024,
    img:          '2.jpg',
    wide:         false,
    description:  'An internal showreel exploring kinetic typography and 3D environments.',
    role:         'Motion Design, 3D',
    deliverables: '60s Reel',
    duration:     '8 weeks',
    blocks: [
      { type: 'video-embed', url: 'https://vimeo.com/76979871' },
      { type: 'text',        label: 'Process', heading: 'Motion as a language', body: 'No brief, no client, no restrictions.\n\nThe result: 60 seconds of pure kinetic energy.' },
      { type: 'img-full',    src: '2.jpg' },
    ],
  },
  {
    id:           3,
    title:        'Vessel UI',
    client:       'Vessel Co.',
    tags:         ['digital', 'still'],
    year:         2024,
    img:          '3.jpg',
    wide:         false,
    description:  'A mindfulness app built around gesture-driven navigation.',
    role:         'UI/UX Design',
    deliverables: 'iOS App, Design System',
    duration:     '16 weeks',
    blocks: [
      { type: 'img-full', src: '3.jpg' },
      { type: 'text',     label: 'Concept', heading: 'Stillness, made digital', body: 'We stripped back every pattern that demands attention.' },
      { type: 'img-2',    items: ['4.jpg', '5.jpg'] },
    ],
  },
  {
    id:           4,
    title:        'Archaic Campaign',
    client:       'Archaic Brand',
    tags:         ['brand', 'film'],
    year:         2023,
    img:          '4.jpg',
    wide:         true,
    description:  'A cinematic campaign shot across four landscapes.',
    role:         'Art Direction, Photography',
    deliverables: 'Campaign, OOH',
    duration:     '10 weeks',
    blocks: [
      { type: 'img-full',   src: '4.jpg' },
      { type: 'video-file', src: 'campaign.mp4' },
      { type: 'text',       label: 'Direction', heading: 'Beauty from the ground up', body: 'No studio. No post-processed skies. Just light and earth.' },
    ],
  },
  {
    id:           5,
    title:        'Luminary Film',
    client:       'Luminary Audio',
    tags:         ['motion', 'film'],
    year:         2023,
    img:          '5.jpg',
    wide:         true,
    description:  '60-second product launch film combining live action and 3D.',
    role:         'Direction, Motion, 3D',
    deliverables: '60s Film, 15s Cut',
    duration:     '14 weeks',
    blocks: [
      { type: 'video-embed', url: 'https://vimeo.com/1181371097' },
      { type: 'text',        label: 'Concept', heading: 'Sound you can see', body: 'Particle systems that respond to frequency, colour that shifts with timbre.' },
    ],
  },
  
];


/* ==============================================================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
   ============================================================== */

/** Собирает уникальные теги из всех проектов */
function getAllTags() {
  const set = new Set();
  PROJECTS.forEach(p => p.tags.forEach(t => set.add(t)));
  return [...set].sort();
}

/** Превращает Vimeo / YouTube ссылку в embed URL */
function toEmbedUrl(url) {
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0`;

  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  return url;
}


/* ==============================================================
   НАВИГАЦИЯ МЕЖДУ СЕКЦИЯМИ
   ============================================================== */
let currentSection  = 'home';
let previousSection = 'home';

function navigate(sectionId) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    const isActive =
      a.getAttribute('data-section') === sectionId ||
      (a.getAttribute('data-section') === 'works' && sectionId === 'project');
    a.classList.toggle('act', isActive);
  });

  currentSection = sectionId;
  window.scrollTo(0, 0);

  if (sectionId === 'home')  renderGrid('homeGrid',  'all', 'homeFilterTags');
  if (sectionId === 'works') renderGrid('worksGrid', 'all', 'worksFilterTags');
}

/** Возврат со страницы проекта назад */
function goBackToWorks() {
  navigate(previousSection === 'home' ? 'home' : 'works');
}

/** Мобильное меню */
let mobileMenuOpen = false;
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  const links = document.querySelector('.nav-links');
  links.style.display = mobileMenuOpen ? 'flex' : '';

  const spans = document.querySelectorAll('.nav-burger span');
  if (mobileMenuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => s.style = '');
  }
}


/* ==============================================================
   РЕНДЕР СЕТКИ ПРОЕКТОВ
   ============================================================== */

/**
 * Рендерит сетку проектов и кнопки-теги.
 *
 * @param {string} gridId    — id контейнера сетки
 * @param {string} activeTag — активный тег ('all' или конкретный)
 * @param {string} tagsId    — id контейнера кнопок-тегов
 */
function renderGrid(gridId, activeTag, tagsId) {
  renderFilterButtons(tagsId, activeTag, gridId);

  const grid     = document.getElementById(gridId);
  const filtered = activeTag === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeTag));

  const origin = gridId === 'homeGrid' ? 'home' : 'works';

  grid.innerHTML = filtered.map(p => `
    <div class="proj-card ${p.wide ? 'wide' : ''}"
         onclick="openProject(${p.id}, '${origin}')">
      <div class="proj-card-bg"
           style="background-image: url('${p.img}'); background-color: #1a1a1a;"></div>
      <div class="proj-card-overlay">
        <div class="proj-card-meta">
          <span class="proj-card-title">${p.title}</span>
          <div class="proj-card-tags">
            ${p.tags.map(t => `<span class="proj-card-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/** Рендерит кнопки-теги над сеткой (генерируются автоматически из данных) */
function renderFilterButtons(containerId, activeTag, gridId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tags = ['all', ...getAllTags()];

  container.innerHTML = tags.map(tag => `
    <button class="tag-btn ${tag === activeTag ? 'active' : ''}"
            onclick="renderGrid('${gridId}', '${tag}', '${containerId}')">
      ${tag === 'all' ? 'All' : tag}
    </button>
  `).join('');
}


/* ==============================================================
   СТРАНИЦА ПРОЕКТА
   ============================================================== */

function openProject(id, fromSection) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  previousSection = fromSection || 'works';

  document.getElementById('projTopbarName').textContent = project.title;
  document.getElementById('projHeaderEl').innerHTML     = buildProjectHeader(project);
  document.getElementById('projContentEl').innerHTML    = `
    <div class="proj-content">
      ${project.blocks.map(b => buildBlock(b)).join('')}
    </div>
  `;
  document.getElementById('projNavEl').innerHTML = buildProjectNav(project);

  navigate('project');
}

/** HTML-шапка страницы проекта */
function buildProjectHeader(p) {
  return `
    <div class="proj-header">
      <div class="proj-header-left">
        <div class="proj-tags-row">
          ${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}
        </div>
        <h1 class="proj-title">${p.title}</h1>
        <p class="proj-client">${p.client} · ${p.year}</p>
      </div>
      <div class="proj-header-right">
        <p class="proj-desc">${p.description}</p>
        <div class="proj-meta-grid">
          <div>
            <span class="proj-meta-lbl">Role</span>
            <span class="proj-meta-val">${p.role}</span>
          </div>
          <div>
            <span class="proj-meta-lbl">Deliverables</span>
            <span class="proj-meta-val">${p.deliverables}</span>
          </div>
          <div>
            <span class="proj-meta-lbl">Duration</span>
            <span class="proj-meta-val">${p.duration}</span>
          </div>
          <div>
            <span class="proj-meta-lbl">Year</span>
            <span class="proj-meta-val">${p.year}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/** HTML одного контент-блока */
function buildBlock(block) {
  switch (block.type) {

    case 'img-full':
      return `
        <div class="blk-img-full">
          <img src="${block.src}" alt="" loading="lazy">
        </div>`;

    case 'img-2':
      return `
        <div class="blk-img-2">
          ${block.items.map(src => `<img src="${src}" alt="" loading="lazy">`).join('')}
        </div>`;

    case 'img-3':
      return `
        <div class="blk-img-3">
          ${block.items.map(src => `<img src="${src}" alt="" loading="lazy">`).join('')}
        </div>`;

    case 'video-file':
      return `
        <div class="blk-video">
          <video src="${block.src}" controls playsinline></video>
        </div>`;

    case 'video-embed':
      return `
        <div class="blk-video">
          <iframe src="${toEmbedUrl(block.url)}"
                  allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>`;

    case 'text':
      return `
        <div class="blk-text">
          <div class="blk-text-inner">
            <span class="blk-text-label">${block.label || ''}</span>
            <div class="blk-text-body">
              ${block.heading ? `<h2>${block.heading}</h2>` : ''}
              ${(block.body || '').split('\n\n').map(para => `<p>${para}</p>`).join('')}
            </div>
          </div>
        </div>`;

    case 'quote':
      return `
        <div class="blk-quote">
          <div class="blk-quote-inner">
            <p class="blk-quote-text">"${block.text}"</p>
            ${block.author ? `<span class="blk-quote-author">${block.author}</span>` : ''}
          </div>
        </div>`;

    case 'divider':
      return `<div class="blk-divider"></div>`;

    default:
      return '';
  }
}

/** HTML навигации «предыдущий / следующий проект» */
function buildProjectNav(current) {
  const idx  = PROJECTS.indexOf(current);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];

  return `
    <div class="proj-nav-row">
      ${prev
        ? `<button class="proj-nav-btn" onclick="openProject(${prev.id}, '${previousSection}')">
             <div>
               <span class="proj-nav-direction">← Previous</span>
               <div class="proj-nav-title">${prev.title}</div>
             </div>
             <div class="proj-nav-arrow">
               <svg viewBox="0 0 24 24"><polyline points="19 12 5 12"/><polyline points="12 5 5 12 12 19"/></svg>
             </div>
           </button>`
        : '<div style="flex:1"></div>'
      }
      ${next
        ? `<button class="proj-nav-btn" onclick="openProject(${next.id}, '${previousSection}')"
                   style="flex-direction: row-reverse; text-align: right;">
             <div>
               <span class="proj-nav-direction">Next →</span>
               <div class="proj-nav-title">${next.title}</div>
             </div>
             <div class="proj-nav-arrow">
               <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
             </div>
           </button>`
        : '<div style="flex:1"></div>'
      }
    </div>
  `;
}


/* ==============================================================
   ФОРМА КОНТАКТА
   ============================================================== */
function submitForm() {
  const name    = document.getElementById('ctName').value.trim();
  const email   = document.getElementById('ctEmail').value.trim();
  const message = document.getElementById('ctMessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in name, email and message.');
    return;
  }

  document.getElementById('formSuccess').classList.add('show');
  ['ctName', 'ctEmail', 'ctSubject', 'ctMessage'].forEach(id => {
    document.getElementById(id).value = '';
  });
}


/* ==============================================================
   КАСТОМНЫЙ КУРСОР
   ============================================================== */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';

  ringX += (mouseX - ringX) * 0.3;
  ringY += (mouseY - ringY) * 0.3;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();


/* ==============================================================
   ИНИЦИАЛИЗАЦИЯ
   ============================================================== */
renderGrid('homeGrid', 'all', 'homeFilterTags');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));