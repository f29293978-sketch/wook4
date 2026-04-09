// 创建粒子效果
function createParticles() {
  const container = document.getElementById('particles');
  setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.opacity = Math.random();
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 20000);
  }, 100);
}

// 交互卡片效果
function initCards() {
  const cards = document.querySelectorAll('.interactive-card');
  
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      triggerEffect(card, index);
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

// 触发效果
function triggerEffect(card, index) {
  card.style.animation = 'glitch 0.3s';
  
  const colors = ['#0ff', '#ff00ff', '#ffff00', '#ff0080'];
  card.style.borderColor = colors[index % colors.length];
  card.style.boxShadow = `0 0 40px ${colors[index % colors.length]}`;
  
  // 随机数字雨效果
  const glitchText = document.getElementById('glitch-text');
  glitchText.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const text = document.createElement('div');
    text.textContent = Math.random().toString(2).substring(2);
    text.style.position = 'absolute';
    text.style.left = Math.random() * 100 + '%';
    text.style.top = Math.random() * 100 + '%';
    text.style.color = colors[index % colors.length];
    text.style.fontSize = Math.random() * 20 + 10 + 'px';
    text.style.opacity = '0.5';
    text.style.fontFamily = 'monospace';
    text.style.animation = 'float 2s ease-in-out';
    glitchText.appendChild(text);
  }
  
  setTimeout(() => {
    card.style.animation = '';
    card.style.borderColor = '';
    card.style.boxShadow = '';
    glitchText.innerHTML = '';
  }, 1000);
}

// 创建数字背景
function createGlitchText() {
  const texts = ['01', '10', '11', '00', 'CYBER', 'PUNK', 'HACK', 'GLITCH'];
  let index = 0;
  
  setInterval(() => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    console.log(randomText);
  }, 2000);
}

// 初始化
window.addEventListener('load', () => {
  createParticles();
  initCards();
  createGlitchText();
});