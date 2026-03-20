<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Aprende Comida! 🍎</title>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #FFF8EE;
      --card-bg: #FFFFFF;
      --accent1: #FF6B35;
      --accent2: #4ECDC4;
      --accent3: #FFE66D;
      --text: #2D2D2D;
      --muted: #888;
      --shadow: 0 8px 32px rgba(0,0,0,0.10);
    }

    body {
      font-family: 'Nunito', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 16px 48px;
      background-image:
        radial-gradient(circle at 10% 20%, #FFE66D33 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, #4ECDC433 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, #FF6B3511 0%, transparent 60%);
    }

    header {
      text-align: center;
      padding: 36px 0 24px;
    }

    header h1 {
      font-family: 'Baloo 2', cursive;
      font-size: clamp(2rem, 6vw, 3.2rem);
      font-weight: 800;
      color: var(--accent1);
      letter-spacing: -1px;
      line-height: 1.1;
    }

    header p {
      font-size: 1rem;
      color: var(--muted);
      margin-top: 6px;
      font-weight: 600;
    }

    .progress-bar-wrap {
      width: 100%;
      max-width: 480px;
      background: #E9DDD0;
      border-radius: 99px;
      height: 10px;
      margin: 18px auto 0;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent1), var(--accent2));
      border-radius: 99px;
      transition: width 0.5s ease;
    }

    .counter {
      font-size: 0.9rem;
      color: var(--muted);
      text-align: center;
      margin-top: 8px;
      font-weight: 700;
    }

    /* CARD FLIP */
    .scene {
      width: 340px;
      max-width: 95vw;
      height: 320px;
      margin: 32px auto 0;
      perspective: 900px;
      cursor: pointer;
    }

    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.55s cubic-bezier(.4,0,.2,1);
    }

    .card.flipped {
      transform: rotateY(180deg);
    }

    .card-face {
      position: absolute;
      inset: 0;
      border-radius: 28px;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
      padding: 28px;
      user-select: none;
    }

    .card-front {
      background: var(--card-bg);
      border: 3px solid var(--accent3);
    }

    .card-back {
      background: linear-gradient(135deg, var(--accent2) 0%, #38B2AC 100%);
      transform: rotateY(180deg);
      color: #fff;
    }

    .card-emoji {
      font-size: 6rem;
      line-height: 1;
      margin-bottom: 12px;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.10));
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .card-hint {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--muted);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .card-front .card-word {
      font-family: 'Baloo 2', cursive;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text);
      text-align: center;
    }

    .card-back .card-word {
      font-family: 'Baloo 2', cursive;
      font-size: 2.2rem;
      font-weight: 800;
      color: #fff;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .card-back .card-example {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.85);
      text-align: center;
      margin-top: 10px;
      font-style: italic;
      font-weight: 600;
    }

    .flip-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: var(--muted);
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 14px;
      justify-content: center;
    }

    .flip-label svg {
      width: 16px; height: 16px; opacity: 0.6;
    }

    /* BUTTONS */
    .controls {
      display: flex;
      gap: 16px;
      margin-top: 28px;
      justify-content: center;
    }

    .btn {
      font-family: 'Baloo 2', cursive;
      font-size: 1rem;
      font-weight: 700;
      border: none;
      border-radius: 99px;
      padding: 12px 28px;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 4px 14px rgba(0,0,0,0.10);
    }

    .btn:active { transform: scale(0.96); }

    .btn-prev {
      background: #fff;
      color: var(--text);
      border: 2px solid #E0D6CC;
    }

    .btn-next {
      background: var(--accent1);
      color: #fff;
    }

    .btn:hover {
      box-shadow: 0 6px 20px rgba(0,0,0,0.14);
      transform: translateY(-2px);
    }

    /* CATEGORY FILTER */
    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      max-width: 520px;
      margin: 28px auto 0;
    }

    .cat-btn {
      font-family: 'Nunito', sans-serif;
      font-size: 0.82rem;
      font-weight: 700;
      border: 2px solid transparent;
      border-radius: 99px;
      padding: 6px 16px;
      cursor: pointer;
      background: #fff;
      color: var(--muted);
      transition: all 0.18s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .cat-btn.active, .cat-btn:hover {
      background: var(--accent1);
      color: #fff;
      border-color: var(--accent1);
    }

    /* SCORE */
    .score-wrap {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-top: 22px;
    }

    .score-pill {
      background: #fff;
      border-radius: 99px;
      padding: 8px 22px;
      font-size: 0.88rem;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(0,0,0,0.07);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .score-pill.correct { color: #22C55E; }
    .score-pill.wrong   { color: #EF4444; }

    .btn-know {
      background: #22C55E;
      color: #fff;
      font-size: 0.88rem;
      padding: 10px 20px;
    }

    .btn-learning {
      background: #EF4444;
      color: #fff;
      font-size: 0.88rem;
      padding: 10px 20px;
    }

    .know-controls {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 16px;
    }

    .congrats {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
    }
    .congrats.show { display: flex; }
    .congrats .big-emoji { font-size: 5rem; }
    .congrats h2 {
      font-family: 'Baloo 2', cursive;
      font-size: 2rem;
      color: var(--accent1);
      margin-top: 12px;
    }
    .congrats p { color: var(--muted); margin-top: 8px; font-weight: 600; }

    .btn-restart {
      margin-top: 24px;
      background: var(--accent1);
      color: #fff;
    }

    @media (max-width: 400px) {
      .scene { height: 280px; }
      .card-emoji { font-size: 4.5rem; }
    }
  </style>
</head>
<body>

<header>
  <h1>🍽️ ¡Aprende Comida!</h1>
  <p>Tarjetas didácticas de alimentos en español</p>
</header>

<div class="categories" id="categories"></div>

<div class="score-wrap">
  <div class="score-pill correct">✅ <span id="knownCount">0</span> sé</div>
  <div class="score-pill wrong">📚 <span id="learningCount">0</span> aprendiendo</div>
</div>

<div class="progress-bar-wrap">
  <div class="progress-bar-fill" id="progressFill" style="width:0%"></div>
</div>
<div class="counter" id="counter">Tarjeta 1 de 1</div>

<div class="scene" id="scene" onclick="flipCard()">
  <div class="card" id="card">
    <div class="card-face card-front">
      <div class="card-emoji" id="frontEmoji">🍎</div>
      <div class="card-hint">¿Sabes esta palabra?</div>
      <div class="card-word" id="frontWord">Cargando...</div>
    </div>
    <div class="card-face card-back">
      <div class="card-emoji" id="backEmoji">🍎</div>
      <div class="card-word" id="backWord">Cargando...</div>
      <div class="card-example" id="backExample"></div>
    </div>
  </div>
</div>

<div class="flip-label">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.89"/></svg>
  Toca para ver la respuesta
</div>

<div class="know-controls" id="knowControls" style="display:none;">
  <button class="btn btn-learning" onclick="markCard(false)">📚 Aún no</button>
  <button class="btn btn-know" onclick="markCard(true)">✅ ¡Lo sé!</button>
</div>

<div class="controls">
  <button class="btn btn-prev" onclick="navigate(-1)">← Anterior</button>
  <button class="btn btn-next" onclick="navigate(1)">Siguiente →</button>
</div>

<div class="congrats" id="congrats">
  <div class="big-emoji">🎉</div>
  <h2>¡Felicidades!</h2>
  <p id="congratsMsg">¡Has repasado todas las tarjetas!</p>
  <button class="btn btn-restart" onclick="restart()">🔄 Empezar de nuevo</button>
</div>

<script>
  const ALL_CARDS = [
    // Frutas
    { emoji:"🍎", spanish:"La manzana",   english:"Apple",      category:"Frutas",    example:"Quiero una manzana roja." },
    { emoji:"🍌", spanish:"El plátano",   english:"Banana",     category:"Frutas",    example:"El plátano es amarillo." },
    { emoji:"🍊", spanish:"La naranja",   english:"Orange",     category:"Frutas",    example:"El jugo de naranja es rico." },
    { emoji:"🍇", spanish:"Las uvas",     english:"Grapes",     category:"Frutas",    example:"Las uvas son dulces." },
    { emoji:"🍓", spanish:"La fresa",     english:"Strawberry", category:"Frutas",    example:"Me gustan las fresas." },
    { emoji:"🍉", spanish:"La sandía",    english:"Watermelon", category:"Frutas",    example:"La sandía es refrescante." },
    { emoji:"🍑", spanish:"El durazno",   english:"Peach",      category:"Frutas",    example:"El durazno es suave." },
    { emoji:"🍋", spanish:"El limón",     english:"Lemon",      category:"Frutas",    example:"El limón es ácido." },
    { emoji:"🍍", spanish:"La piña",      english:"Pineapple",  category:"Frutas",    example:"La piña es tropical." },
    { emoji:"🥭", spanish:"El mango",     english:"Mango",      category:"Frutas",    example:"El mango es mi fruta favorita." },
    // Verduras
    { emoji:"🥕", spanish:"La zanahoria", english:"Carrot",     category:"Verduras",  example:"Las zanahorias son anaranjadas." },
    { emoji:"🥦", spanish:"El brócoli",   english:"Broccoli",   category:"Verduras",  example:"El brócoli es muy saludable." },
    { emoji:"🌽", spanish:"El maíz",      english:"Corn",        category:"Verduras",  example:"El maíz es amarillo." },
    { emoji:"🥑", spanish:"El aguacate",  english:"Avocado",    category:"Verduras",  example:"El aguacate es verde por dentro." },
    { emoji:"🍅", spanish:"El tomate",    english:"Tomato",     category:"Verduras",  example:"El tomate está en la ensalada." },
    { emoji:"🥬", spanish:"La lechuga",   english:"Lettuce",    category:"Verduras",  example:"La lechuga va en la ensalada." },
    { emoji:"🧅", spanish:"La cebolla",   english:"Onion",      category:"Verduras",  example:"La cebolla pica los ojos." },
    { emoji:"🥔", spanish:"La papa",      english:"Potato",     category:"Verduras",  example:"Me gustan las papas fritas." },
    // Comidas
    { emoji:"🍕", spanish:"La pizza",     english:"Pizza",      category:"Comidas",   example:"La pizza tiene queso." },
    { emoji:"🌮", spanish:"El taco",      english:"Taco",       category:"Comidas",   example:"El taco es delicioso." },
    { emoji:"🍔", spanish:"La hamburguesa",english:"Burger",   category:"Comidas",   example:"La hamburguesa tiene carne." },
    { emoji:"🍜", spanish:"Los fideos",   english:"Noodles",    category:"Comidas",   example:"Los fideos son largos." },
    { emoji:"🍣", spanish:"El sushi",     english:"Sushi",      category:"Comidas",   example:"El sushi viene del Japón." },
    { emoji:"🍳", spanish:"El huevo frito",english:"Fried egg", category:"Comidas",   example:"El huevo frito es fácil de hacer." },
    { emoji:"🥗", spanish:"La ensalada",  english:"Salad",      category:"Comidas",   example:"La ensalada tiene verduras." },
    { emoji:"🍞", spanish:"El pan",       english:"Bread",      category:"Comidas",   example:"Quiero pan con mantequilla." },
    // Bebidas
    { emoji:"🥛", spanish:"La leche",     english:"Milk",       category:"Bebidas",   example:"La leche es blanca." },
    { emoji:"☕", spanish:"El café",      english:"Coffee",     category:"Bebidas",   example:"Tomo café por la mañana." },
    { emoji:"🧃", spanish:"El jugo",      english:"Juice",      category:"Bebidas",   example:"El jugo de manzana está frío." },
    { emoji:"🍵", spanish:"El té",        english:"Tea",        category:"Bebidas",   example:"Me gusta el té caliente." },
    // Postres
    { emoji:"🍰", spanish:"El pastel",    english:"Cake",       category:"Postres",   example:"El pastel es de chocolate." },
    { emoji:"🍦", spanish:"El helado",    english:"Ice cream",  category:"Postres",   example:"El helado es frío y dulce." },
    { emoji:"🍫", spanish:"El chocolate", english:"Chocolate",  category:"Postres",   example:"Me encanta el chocolate." },
    { emoji:"🍩", spanish:"La dona",      english:"Donut",      category:"Postres",   example:"La dona tiene azúcar encima." },
  ];

  const CATEGORIES = ["Todas", ...new Set(ALL_CARDS.map(c => c.category))];

  let activeCategory = "Todas";
  let cards = [...ALL_CARDS];
  let index = 0;
  let isFlipped = false;
  let known = 0;
  let learning = 0;
  let seen = new Set();

  // Build category buttons
  const catWrap = document.getElementById('categories');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === 'Todas' ? ' active' : '');
    btn.textContent = cat === 'Todas' ? '🌟 Todas' : `${getCatEmoji(cat)} ${cat}`;
    btn.onclick = () => setCategory(cat, btn);
    catWrap.appendChild(btn);
  });

  function getCatEmoji(cat) {
    return { Frutas:'🍓', Verduras:'🥦', Comidas:'🍽️', Bebidas:'🥤', Postres:'🍰' }[cat] || '';
  }

  function setCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cards = cat === 'Todas' ? [...ALL_CARDS] : ALL_CARDS.filter(c => c.category === cat);
    index = 0; known = 0; learning = 0; seen = new Set();
    updateScores();
    resetCard();
    document.getElementById('congrats').classList.remove('show');
    document.getElementById('scene').style.display = '';
    document.getElementById('knowControls').style.display = 'none';
  }

  function resetCard() {
    isFlipped = false;
    document.getElementById('card').classList.remove('flipped');
    document.getElementById('knowControls').style.display = 'none';
    renderCard();
  }

  function renderCard() {
    if (cards.length === 0) return;
    const c = cards[index];
    document.getElementById('frontEmoji').textContent = c.emoji;
    document.getElementById('backEmoji').textContent = c.emoji;
    document.getElementById('frontWord').textContent = c.english;
    document.getElementById('backWord').textContent = c.spanish;
    document.getElementById('backExample').textContent = c.example;
    document.getElementById('counter').textContent = `Tarjeta ${index + 1} de ${cards.length}`;
    const pct = ((seen.size) / cards.length) * 100;
    document.getElementById('progressFill').style.width = pct + '%';
  }

  function flipCard() {
    if (!isFlipped) {
      isFlipped = true;
      document.getElementById('card').classList.add('flipped');
      document.getElementById('knowControls').style.display = 'flex';
      seen.add(index);
      const pct = (seen.size / cards.length) * 100;
      document.getElementById('progressFill').style.width = pct + '%';
    }
  }

  function markCard(didKnow) {
    if (didKnow) known++; else learning++;
    updateScores();
    navigate(1);
  }

  function navigate(dir) {
    isFlipped = false;
    document.getElementById('card').classList.remove('flipped');
    document.getElementById('knowControls').style.display = 'none';

    index += dir;
    if (index < 0) index = cards.length - 1;

    if (index >= cards.length) {
      // End
      document.getElementById('scene').style.display = 'none';
      document.querySelector('.flip-label').style.display = 'none';
      document.querySelector('.controls').style.display = 'none';
      document.getElementById('knowControls').style.display = 'none';
      const congrats = document.getElementById('congrats');
      congrats.classList.add('show');
      document.getElementById('congratsMsg').textContent =
        `Conoces ${known} palabras y estás aprendiendo ${learning}. ¡Sigue así!`;
      return;
    }

    renderCard();
  }

  function updateScores() {
    document.getElementById('knownCount').textContent = known;
    document.getElementById('learningCount').textContent = learning;
  }

  function restart() {
    index = 0; known = 0; learning = 0; seen = new Set();
    updateScores();
    document.getElementById('congrats').classList.remove('show');
    document.getElementById('scene').style.display = '';
    document.querySelector('.flip-label').style.display = '';
    document.querySelector('.controls').style.display = '';
    resetCard();
  }

  renderCard();
</script>
</body>
</html>
