"use client";

import { useState, useEffect } from "react";

const skills = [
  { name: "Membaca Novel", level: 95, emoji: "📚" },
  { name: "Kreativitas", level: 88, emoji: "✨" },
  { name: "Team Work", level: 85, emoji: "🤝" },
  { name: "Komunikasi", level: 80, emoji: "💬" },
  { name: "Problem Solving", level: 82, emoji: "🧩" },
];

const genres = [
  { name: "Romance", icon: "💕", color: "#ff8fab" },
  { name: "Fantasy", icon: "🧙‍♀️", color: "#c77dff" },
  { name: "Mystery", icon: "🔍", color: "#4cc9f0" },
  { name: "Adventure", icon: "🗺️", color: "#f8961e" },
  { name: "Slice of Life", icon: "🌸", color: "#80b918" },
];

const floatingItems = ["📖", "⭐", "🌸", "💫", "🎀", "📝", "🌙", "✨", "🦋", "🌺"];

type Tab = "about" | "skills" | "hobby";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --pink: #ff8fab;
          --soft-pink: #ffc8dd;
          --lavender: #cdb4db;
          --yellow: #ffd166;
          --bg: #fff0f6;
          --text: #3d2b3d;
          --text-light: #7b5e7b;
          --border: rgba(255,143,171,0.3);
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          font-family: "Nunito", sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          min-height: 100vh;
        }
        body::before {
          content:"";
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 60% 40% at 10% 20%, rgba(255,143,171,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 90% 80%, rgba(205,180,219,0.22) 0%, transparent 60%);
          pointer-events:none; z-index:0;
        }
        .floating-bg { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
        .float-item { position:absolute; opacity:0.18; animation:floatAround linear infinite; }
        @keyframes floatAround {
          0%   { transform: translateY(110vh) rotate(0deg); }
          100% { transform: translateY(-20vh) rotate(360deg); }
        }
        .page-wrapper { position:relative; z-index:1; max-width:900px; margin:0 auto; padding:2rem 1.2rem 4rem; }

        /* HERO */
        .hero { display:flex; flex-direction:column; align-items:center; gap:1.5rem; margin-bottom:2.5rem; animation:fadeDown .8s ease both; }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        .photo-wrapper { position:relative; width:160px; height:160px; }
        .photo-frame {
          width:160px; height:160px; border-radius:50%;
          border:5px solid var(--pink);
          box-shadow: 0 0 0 4px var(--soft-pink), 0 12px 40px rgba(255,143,171,0.35);
          overflow:hidden;
          background:linear-gradient(135deg, var(--soft-pink), var(--lavender));
          display:flex; align-items:center; justify-content:center; font-size:5rem;
        }
        .photo-badge {
          position:absolute; bottom:4px; right:4px;
          background:var(--yellow); border-radius:50%; width:38px; height:38px;
          display:flex; align-items:center; justify-content:center; font-size:1.2rem;
          border:3px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.12);
          animation:pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        .hero-text { text-align:center; }
        .hero-name {
          font-family:"Playfair Display",serif; font-size:clamp(1.8rem,5vw,2.6rem); font-weight:900;
          background:linear-gradient(135deg,#ff4d84,#c77dff);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          line-height:1.1; margin-bottom:.4rem;
        }
        .hero-sub { font-family:"Dancing Script",cursive; font-size:1.25rem; color:var(--lavender); margin-bottom:.8rem; }
        .tag-row { display:flex; flex-wrap:wrap; gap:.5rem; justify-content:center; margin-top:.5rem; }
        .tag {
          background:white; border:2px solid var(--border); border-radius:999px;
          padding:.3rem .9rem; font-size:.8rem; font-weight:700; color:var(--text-light);
          box-shadow:0 2px 8px rgba(255,143,171,0.12); transition:transform .2s;
        }
        .tag:hover { transform:translateY(-2px); }
        .tag.pink   { background:var(--soft-pink); color:#c9184a; border-color:var(--pink); }
        .tag.purple { background:#e9d8ff; color:#6a0dad; border-color:var(--lavender); }
        .tag.yellow { background:#fff3cd; color:#9a6200; border-color:var(--yellow); }

        /* TABS */
        .tabs { display:flex; gap:.5rem; justify-content:center; margin-bottom:2rem; flex-wrap:wrap; animation:fadeUp .9s .3s ease both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .tab-btn {
          background:white; border:2.5px solid var(--border); border-radius:999px;
          padding:.55rem 1.3rem; font-family:"Nunito",sans-serif; font-weight:800; font-size:.85rem;
          color:var(--text-light); cursor:pointer; transition:all .25s ease;
          box-shadow:0 2px 8px rgba(0,0,0,0.05);
        }
        .tab-btn:hover { transform:translateY(-2px); border-color:var(--pink); color:var(--pink); }
        .tab-btn.active {
          background:linear-gradient(135deg,var(--pink),#c77dff); border-color:transparent; color:white;
          box-shadow:0 6px 20px rgba(255,143,171,0.4); transform:translateY(-2px);
        }

        /* CARDS */
        .card {
          background:rgba(255,255,255,0.85); backdrop-filter:blur(12px);
          border-radius:24px; border:2px solid var(--border); padding:1.8rem;
          margin-bottom:1.2rem; box-shadow:0 4px 24px rgba(255,143,171,0.10);
          animation:cardIn .5s ease both; transition:transform .2s;
        }
        .card:hover { transform:translateY(-3px); }
        @keyframes cardIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .card-title {
          font-family:"Playfair Display",serif; font-size:1.25rem; font-weight:700; color:var(--text);
          margin-bottom:1rem; display:flex; align-items:center; gap:.5rem;
        }
        .card-title::after { content:""; flex:1; height:2px; background:linear-gradient(90deg,var(--pink),transparent); border-radius:2px; }

        /* INFO GRID */
        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; }
        @media(max-width:500px){ .info-grid{grid-template-columns:1fr;} }
        .info-item {
          display:flex; align-items:flex-start; gap:.7rem; padding:.8rem;
          border-radius:14px; background:rgba(255,143,171,0.06); border:1.5px solid rgba(255,143,171,0.15);
        }
        .info-icon { font-size:1.3rem; flex-shrink:0; margin-top:.05rem; }
        .info-label { font-size:.7rem; font-weight:800; color:var(--pink); text-transform:uppercase; letter-spacing:.05em; }
        .info-value { font-size:.9rem; font-weight:600; color:var(--text); margin-top:.1rem; }

        /* SKILL BARS */
        .skill-item { margin-bottom:1rem; }
        .skill-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:.4rem; }
        .skill-name { font-weight:700; font-size:.9rem; }
        .skill-pct { font-size:.78rem; font-weight:800; color:var(--pink); }
        .skill-bar-bg { height:10px; border-radius:999px; background:rgba(255,143,171,0.15); overflow:hidden; }
        .skill-bar-fill {
          height:100%; border-radius:999px;
          background:linear-gradient(90deg,var(--pink),#c77dff);
          box-shadow:0 2px 8px rgba(255,143,171,0.4);
          transition:width 1.2s cubic-bezier(.4,0,.2,1);
        }

        /* BOOK SHELF */
        .book-shelf { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:.8rem; margin-top:.5rem; }
        .book-card { border-radius:16px; padding:1rem .8rem; text-align:center; border:2px solid; transition:all .25s; cursor:default; }
        .book-card:hover { transform:translateY(-5px) rotate(-2deg); box-shadow:0 8px 24px rgba(0,0,0,0.1); }
        .book-icon { font-size:1.8rem; margin-bottom:.4rem; }
        .book-label { font-size:.78rem; font-weight:800; }

        /* QUOTE */
        .quote-box {
          background:linear-gradient(135deg,rgba(255,143,171,0.12),rgba(205,180,219,0.18));
          border-left:4px solid var(--pink); border-radius:0 16px 16px 0;
          padding:1rem 1.2rem; margin-top:1rem;
          font-family:"Dancing Script",cursive; font-size:1.1rem; color:var(--text-light); font-style:italic;
        }

        /* FOOTER */
        .footer { text-align:center; margin-top:3rem; font-size:.8rem; color:var(--text-light); font-weight:600; }
        .footer span { color:var(--pink); }
      `}</style>

      {/* Floating background */}
      <div className="floating-bg">
        {mounted && floatingItems.map((item, i) => (
          <div key={i} className="float-item" style={{
            left: `${(i * 10 + 5) % 100}%`,
            animationDuration: `${12 + (i * 3) % 10}s`,
            animationDelay: `${(i * 1.5) % 8}s`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          }}>{item}</div>
        ))}
      </div>

      <div className="page-wrapper">

        {/* HERO */}
        <section className="hero">
          <div className="photo-wrapper">
            <div className="photo-frame">
              {/*
              */}
              <img src="/foto.jpeg" alt="Foto Syifa"
                     style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </div>
            <div className="photo-badge">📚</div>
          </div>

          <div className="hero-text">
            <h1 className="hero-name">Mar&apos;atussyifa<br />Ussakinah</h1>
            <p className="hero-sub">✦ Hai nama aku ina ✦</p>
            <div className="tag-row">
              <span className="tag pink">📌 Absen 18</span>
              <span className="tag purple">🏫 XI RPL 6</span>
              <span className="tag yellow">📚 Novel Lover</span>
            </div>
          </div>
        </section>

        {/* TABS */}
        <nav className="tabs">
          {([
            { id: "about", label: "🌸 Tentang Aku" },
            { id: "skills", label: "⚡ Skills" },
            { id: "hobby", label: "📖 Hobi" },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </nav>

        {/* TAB: ABOUT */}
        {activeTab === "about" && (
          <>
            <div className="card">
              <h2 className="card-title">🌸 Halo, Saya Syifa!</h2>
              <p style={{lineHeight:1.75, color:"var(--text-light)", fontSize:"0.95rem"}}>
                Perkenalkan, nama saya{" "}
                <strong style={{color:"var(--pink)"}}>Mar&apos;atussyifa Ussakinah</strong> —
                siswa kelas XI RPL 6 di SMK TELKOM MALANG yang tertarik di dunia teknologi.
                Saya membuat website ini dadakan karena remedial asas produktif huhu
    
              </p>
            </div>
            <div className="card" style={{animationDelay:"0.1s"}}>
              <h2 className="card-title">📋 Info Pribadi</h2>
              <div className="info-grid">
                {[
                  { icon:"🎓", label:"Kelas",          value:"XI RPL 6" },
                  { icon:"🔢", label:"Nomor Absen",     value:"18" },
                  { icon:"💻", label:"Jurusan",         value:"Rekayasa Perangkat Lunak" },
                  { icon:"📚", label:"Hobi",            value:"Membaca Novel" },
                ].map((item) => (
                  <div className="info-item" key={item.label}>
                    <span className="info-icon">{item.icon}</span>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB: SKILLS */}
        {activeTab === "skills" && (
          <>
            <div className="card">
              <h2 className="card-title">⚡ Kemampuan Saya</h2>
              {skills.map((s) => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-header">
                    <span className="skill-name">{s.emoji} {s.name}</span>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{width: mounted ? `${s.level}%` : "0%"}} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{animationDelay:"0.15s"}}>
              <h2 className="card-title">🎯 Jurusan RPL</h2>
              <p style={{color:"var(--text-light)", lineHeight:1.7, fontSize:"0.93rem"}}>
                Sebagai siswa <strong style={{color:"var(--pink)"}}>Rekayasa Perangkat Lunak (RPL)</strong>,
                saya belajar tentang pemrograman, pengembangan aplikasi, dan teknologi informasi.
                Saya antusias membangun solusi digital yang bermanfaat bagi banyak orang.
              </p>
              <div className="tag-row" style={{justifyContent:"flex-start", marginTop:"1rem"}}>
                {["🐍 Python","🌐 Web Dev","📱 Mobile","🗄️ Database"].map((t) => (
                  <span className="tag pink" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB: HOBBY */}
        {activeTab === "hobby" && (
          <>
            <div className="card">
              <h2 className="card-title">📖 Dunia Novel Saya</h2>
              <p style={{color:"var(--text-light)", lineHeight:1.75, fontSize:"0.93rem", marginBottom:"1rem"}}>
                Suka membaca novel dan mendengarkan musik laleilmannino
              </p>
              <h3 style={{fontSize:"0.85rem", fontWeight:800, color:"var(--text-light)",
                marginBottom:"0.8rem", textTransform:"uppercase", letterSpacing:"0.05em"}}>
                Genre Favorit
              </h3>
              <div className="book-shelf">
                {genres.map((g) => (
                  <div key={g.name} className="book-card"
                    style={{background:`${g.color}18`, borderColor:`${g.color}40`}}>
                    <div className="book-icon">{g.icon}</div>
                    <div className="book-label" style={{color:g.color}}>{g.name}</div>
                  </div>
                ))}
              </div>
              <div className="quote-box">
                &ldquo;Sebuah buku yang baik adalah teman terbaik — selalu ada untukmu,
                tidak pernah menghakimi, dan selalu memberimu sesuatu yang baru setiap
                kali kamu kembali.&rdquo;
              </div>
            </div>
            <div className="card" style={{animationDelay:"0.15s"}}>
              <h2 className="card-title">✨ Fun Facts</h2>
              {[
                ["🌙","Suka mengoleksi novel"],
                ["☕","suka matcha dan kopi"],
                ["🔖","ambivert"],
                ["💭","cita cita diploma"],
              ].map(([icon, text], i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:"0.8rem",
                  padding:"0.65rem 0.8rem", borderRadius:"12px",
                  background: i%2===0 ? "rgba(255,143,171,0.06)" : "rgba(205,180,219,0.08)",
                  marginBottom:"0.5rem", fontSize:"0.9rem", fontWeight:600, color:"var(--text-light)",
                }}>
                  <span style={{fontSize:"1.2rem"}}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </>
        )}

        <footer className="footer">
          Made with <span>♥</span> by Mar&apos;atussyifa Ussakinah · XI RPL 6
        </footer>
      </div>
    </>
  );
}