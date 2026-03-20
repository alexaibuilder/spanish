"use client";
import { useState, useEffect, useCallback } from "react";

const ALL_CARDS = [
  { emoji:"🍎", spanish:"La manzana",    english:"Apple",       category:"Frutas",   example:"Quiero una manzana roja." },
  { emoji:"🍌", spanish:"El plátano",    english:"Banana",      category:"Frutas",   example:"El plátano es amarillo." },
  { emoji:"🍊", spanish:"La naranja",    english:"Orange",      category:"Frutas",   example:"El jugo de naranja es rico." },
  { emoji:"🍇", spanish:"Las uvas",      english:"Grapes",      category:"Frutas",   example:"Las uvas son dulces." },
  { emoji:"🍓", spanish:"La fresa",      english:"Strawberry",  category:"Frutas",   example:"Me gustan las fresas." },
  { emoji:"🍉", spanish:"La sandía",     english:"Watermelon",  category:"Frutas",   example:"La sandía es refrescante." },
  { emoji:"🍑", spanish:"El durazno",    english:"Peach",       category:"Frutas",   example:"El durazno es suave." },
  { emoji:"🍋", spanish:"El limón",      english:"Lemon",       category:"Frutas",   example:"El limón es ácido." },
  { emoji:"🍍", spanish:"La piña",       english:"Pineapple",   category:"Frutas",   example:"La piña es tropical." },
  { emoji:"🥭", spanish:"El mango",      english:"Mango",       category:"Frutas",   example:"El mango es mi fruta favorita." },
  { emoji:"🥕", spanish:"La zanahoria",  english:"Carrot",      category:"Verduras", example:"Las zanahorias son anaranjadas." },
  { emoji:"🥦", spanish:"El brócoli",    english:"Broccoli",    category:"Verduras", example:"El brócoli es muy saludable." },
  { emoji:"🌽", spanish:"El maíz",       english:"Corn",        category:"Verduras", example:"El maíz es amarillo." },
  { emoji:"🥑", spanish:"El aguacate",   english:"Avocado",     category:"Verduras", example:"El aguacate es verde por dentro." },
  { emoji:"🍅", spanish:"El tomate",     english:"Tomato",      category:"Verduras", example:"El tomate está en la ensalada." },
  { emoji:"🥬", spanish:"La lechuga",    english:"Lettuce",     category:"Verduras", example:"La lechuga va en la ensalada." },
  { emoji:"🧅", spanish:"La cebolla",    english:"Onion",       category:"Verduras", example:"La cebolla pica los ojos." },
  { emoji:"🥔", spanish:"La papa",       english:"Potato",      category:"Verduras", example:"Me gustan las papas fritas." },
  { emoji:"🍕", spanish:"La pizza",      english:"Pizza",       category:"Comidas",  example:"La pizza tiene queso." },
  { emoji:"🌮", spanish:"El taco",       english:"Taco",        category:"Comidas",  example:"El taco es delicioso." },
  { emoji:"🍔", spanish:"La hamburguesa",english:"Burger",      category:"Comidas",  example:"La hamburguesa tiene carne." },
  { emoji:"🍜", spanish:"Los fideos",    english:"Noodles",     category:"Comidas",  example:"Los fideos son largos." },
  { emoji:"🍣", spanish:"El sushi",      english:"Sushi",       category:"Comidas",  example:"El sushi viene del Japón." },
  { emoji:"🍳", spanish:"El huevo frito",english:"Fried egg",   category:"Comidas",  example:"El huevo frito es fácil de hacer." },
  { emoji:"🥗", spanish:"La ensalada",   english:"Salad",       category:"Comidas",  example:"La ensalada tiene verduras." },
  { emoji:"🍞", spanish:"El pan",        english:"Bread",       category:"Comidas",  example:"Quiero pan con mantequilla." },
  { emoji:"🥛", spanish:"La leche",      english:"Milk",        category:"Bebidas",  example:"La leche es blanca." },
  { emoji:"☕", spanish:"El café",       english:"Coffee",      category:"Bebidas",  example:"Tomo café por la mañana." },
  { emoji:"🧃", spanish:"El jugo",       english:"Juice",       category:"Bebidas",  example:"El jugo de manzana está frío." },
  { emoji:"🍵", spanish:"El té",         english:"Tea",         category:"Bebidas",  example:"Me gusta el té caliente." },
  { emoji:"🍰", spanish:"El pastel",     english:"Cake",        category:"Postres",  example:"El pastel es de chocolate." },
  { emoji:"🍦", spanish:"El helado",     english:"Ice cream",   category:"Postres",  example:"El helado es frío y dulce." },
  { emoji:"🍫", spanish:"El chocolate",  english:"Chocolate",   category:"Postres",  example:"Me encanta el chocolate." },
  { emoji:"🍩", spanish:"La dona",       english:"Donut",       category:"Postres",  example:"La dona tiene azúcar encima." },
];

const CATEGORIES = ["Todas", ...Array.from(new Set(ALL_CARDS.map(c => c.category)))];

const CAT_EMOJI: Record<string, string> = {
  Frutas:"🍓", Verduras:"🥦", Comidas:"🍽️", Bebidas:"🥤", Postres:"🍰"
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [cards, setCards] = useState(ALL_CARDS);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);
  const [showKnowControls, setShowKnowControls] = useState(false);

  const card = cards[index];
  const progress = cards.length > 0 ? (seen.size / cards.length) * 100 : 0;

  const handleSetCategory = (cat: string) => {
    setActiveCategory(cat);
    setCards(cat === "Todas" ? [...ALL_CARDS] : ALL_CARDS.filter(c => c.category === cat));
    setIndex(0);
    setKnown(0);
    setLearning(0);
    setSeen(new Set());
    setIsFlipped(false);
    setShowKnowControls(false);
    setFinished(false);
  };

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setShowKnowControls(true);
      setSeen(prev => new Set(prev).add(index));
    }
  };

  const navigate = useCallback((dir: number) => {
    setIsFlipped(false);
    setShowKnowControls(false);
    const next = index + dir;
    if (next < 0) { setIndex(cards.length - 1); return; }
    if (next >= cards.length) { setFinished(true); return; }
    setIndex(next);
  }, [index, cards.length]);

  const markCard = (didKnow: boolean) => {
    if (didKnow) setKnown(k => k + 1); else setLearning(l => l + 1);
    navigate(1);
  };

  const restart = () => {
    setIndex(0); setKnown(0); setLearning(0);
    setSeen(new Set()); setIsFlipped(false);
    setShowKnowControls(false); setFinished(false);
  };

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&family=Nunito:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #FFF8EE; --card-bg: #FFFFFF;
          --accent1: #FF6B35; --accent2: #4ECDC4; --accent3: #FFE66D;
          --text: #2D2D2D; --muted: #888;
          --shadow: 0 8px 32px rgba(0,0,0,0.10);
        }
        body {
          font-family: 'Nunito', sans-serif;
          background: var(--bg);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .card-inner {
          width: 100%; height: 100%; position: relative;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(.4,0,.2,1);
        }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-face {
          position: absolute; inset: 0; border-radius: 28px;
          backface-visibility: hidden;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          box-shadow: var(--shadow); padding: 28px; user-select: none;
        }
        .card-front { background: #fff; border: 3px solid var(--accent3); }
        .card-back {
          background: linear-gradient(135deg, var(--accent2) 0%, #38B2AC 100%);
          transform: rotateY(180deg); color: #fff;
        }
        .emoji-float { animation: float 3s ease-in-out infinite; }
        .btn {
          font-family: 'Baloo 2', cursive; font-size: 1rem; font-weight: 700;
          border: none; border-radius: 99px; padding: 12px 28px; cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 14px rgba(0,0,0,0.10);
        }
        .btn:active { transform: scale(0.96) !important; }
        .btn:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.14); transform: translateY(-2px); }
        .cat-btn {
          font-family: 'Nunito', sans-serif; font-size: 0.82rem; font-weight: 700;
          border: 2px solid transparent; border-radius: 99px; padding: 6px 16px;
          cursor: pointer; background: #fff; color: var(--muted);
          transition: all 0.18s; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .cat-btn.active, .cat-btn:hover {
          background: var(--accent1); color: #fff; border-color: var(--accent1);
        }
      `}</style>

      <div style={{
        fontFamily:"'Nunito', sans-serif", background:"#FFF8EE", color:"#2D2D2D",
        minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center",
        padding:"0 16px 48px",
        backgroundImage:`radial-gradient(circle at 10% 20%, #FFE66D33 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, #4ECDC433 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, #FF6B3511 0%, transparent 60%)`
      }}>

        {/* Header */}
        <header style={{textAlign:"center", padding:"36px 0 24px"}}>
          <h1 style={{
            fontFamily:"'Baloo 2', cursive", fontSize:"clamp(2rem,6vw,3.2rem)",
            fontWeight:800, color:"#FF6B35", letterSpacing:"-1px", lineHeight:1.1
          }}>🍽️ ¡Aprende Comida!</h1>
          <p style={{fontSize:"1rem", color:"#888", marginTop:6, fontWeight:600}}>
            Tarjetas didácticas de alimentos en español
          </p>
        </header>

        {/* Category buttons */}
        <div style={{display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", maxWidth:520}}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => handleSetCategory(cat)}>
              {cat === "Todas" ? "🌟 Todas" : `${CAT_EMOJI[cat]} ${cat}`}
            </button>
          ))}
        </div>

        {/* Score */}
        <div style={{display:"flex", gap:20, justifyContent:"center", marginTop:22}}>
          <div style={{background:"#fff", borderRadius:99, padding:"8px 22px", fontSize:"0.88rem",
            fontWeight:700, boxShadow:"0 2px 10px rgba(0,0,0,0.07)", display:"flex", alignItems:"center", gap:6, color:"#22C55E"}}>
            ✅ <span>{known}</span> sé
          </div>
          <div style={{background:"#fff", borderRadius:99, padding:"8px 22px", fontSize:"0.88rem",
            fontWeight:700, boxShadow:"0 2px 10px rgba(0,0,0,0.07)", display:"flex", alignItems:"center", gap:6, color:"#EF4444"}}>
            📚 <span>{learning}</span> aprendiendo
          </div>
        </div>

        {/* Progress */}
        <div style={{width:"100%", maxWidth:480, background:"#E9DDD0", borderRadius:99,
          height:10, margin:"18px auto 0", overflow:"hidden"}}>
          <div style={{height:"100%", background:"linear-gradient(90deg,#FF6B35,#4ECDC4)",
            borderRadius:99, width:`${progress}%`, transition:"width 0.5s ease"}} />
        </div>
        <div style={{fontSize:"0.9rem", color:"#888", textAlign:"center", marginTop:8, fontWeight:700}}>
          Tarjeta {index + 1} de {cards.length}
        </div>

        {!finished ? (
          <>
            {/* Card */}
            <div onClick={handleFlip} style={{
              width:340, maxWidth:"95vw", height:320, margin:"32px auto 0",
              perspective:900, cursor:"pointer"
            }}>
              <div className={`card-inner${isFlipped ? " flipped" : ""}`}>
                <div className="card-face card-front">
                  <div className="emoji-float" style={{fontSize:"6rem", lineHeight:1, marginBottom:12,
                    filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.10))"}}>
                    {card?.emoji}
                  </div>
                  <div style={{fontSize:"0.85rem", fontWeight:700, color:"#888",
                    letterSpacing:1, textTransform:"uppercase", marginBottom:4}}>
                    ¿Sabes esta palabra?
                  </div>
                  <div style={{fontFamily:"'Baloo 2', cursive", fontSize:"1.5rem",
                    fontWeight:800, color:"#2D2D2D", textAlign:"center"}}>
                    {card?.english}
                  </div>
                </div>
                <div className="card-face card-back">
                  <div style={{fontSize:"6rem", lineHeight:1, marginBottom:12}}>{card?.emoji}</div>
                  <div style={{fontFamily:"'Baloo 2', cursive", fontSize:"2.2rem",
                    fontWeight:800, color:"#fff", textAlign:"center",
                    textShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
                    {card?.spanish}
                  </div>
                  <div style={{fontSize:"0.9rem", color:"rgba(255,255,255,0.85)",
                    textAlign:"center", marginTop:10, fontStyle:"italic", fontWeight:600}}>
                    {card?.example}
                  </div>
                </div>
              </div>
            </div>

            {/* Flip hint */}
            <div style={{display:"flex", alignItems:"center", gap:6, fontSize:"0.8rem",
              color:"#888", fontWeight:700, letterSpacing:0.5, textTransform:"uppercase",
              marginTop:14, justifyContent:"center"}}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{opacity:0.6}}>
                <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.89"/>
              </svg>
              Toca para ver la respuesta
            </div>

            {/* Know controls */}
            {showKnowControls && (
              <div style={{display:"flex", gap:12, justifyContent:"center", marginTop:16}}>
                <button className="btn" onClick={() => markCard(false)}
                  style={{background:"#EF4444", color:"#fff", fontSize:"0.88rem", padding:"10px 20px"}}>
                  📚 Aún no
                </button>
                <button className="btn" onClick={() => markCard(true)}
                  style={{background:"#22C55E", color:"#fff", fontSize:"0.88rem", padding:"10px 20px"}}>
                  ✅ ¡Lo sé!
                </button>
              </div>
            )}

            {/* Nav controls */}
            <div style={{display:"flex", gap:16, marginTop:28, justifyContent:"center"}}>
              <button className="btn" onClick={() => navigate(-1)}
                style={{background:"#fff", color:"#2D2D2D", border:"2px solid #E0D6CC"}}>
                ← Anterior
              </button>
              <button className="btn" onClick={() => navigate(1)}
                style={{background:"#FF6B35", color:"#fff"}}>
                Siguiente →
              </button>
            </div>
          </>
        ) : (
          /* Congrats screen */
          <div style={{display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", textAlign:"center", padding:"40px 20px"}}>
            <div style={{fontSize:"5rem"}}>🎉</div>
            <h2 style={{fontFamily:"'Baloo 2', cursive", fontSize:"2rem",
              color:"#FF6B35", marginTop:12}}>¡Felicidades!</h2>
            <p style={{color:"#888", marginTop:8, fontWeight:600}}>
              Conoces {known} palabras y estás aprendiendo {learning}. ¡Sigue así!
            </p>
            <button className="btn" onClick={restart}
              style={{marginTop:24, background:"#FF6B35", color:"#fff"}}>
              🔄 Empezar de nuevo
            </button>
          </div>
        )}
      </div>
    </>
  );
}
