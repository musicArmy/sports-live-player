* {
  box-sizing: border-box;
  margin: 0;
}

:root {
  --bg: #08111f;
  --bg-2: #0d1728;
  --panel: rgba(15, 23, 42, 0.9);
  --panel-2: rgba(13, 20, 35, 0.92);
  --card: rgba(15, 23, 42, 0.75);
  --border: rgba(148, 163, 184, 0.18);
  --soft: rgba(148, 163, 184, 0.14);
  --text: #edf4ff;
  --muted: #a1b4d1;
  --primary: #5ad4ff;
  --primary-2: #39c1ff;
  --green: #35d07f;
  --amber: #ffb84d;
  --red: #ff5b6b;
  --shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

html, body {
  background:
    radial-gradient(circle at top, rgba(58, 134, 255, 0.18), transparent 24%),
    linear-gradient(180deg, #071422 0%, #0a1320 100%);
  color: var(--text);
  font-family: "Inter", sans-serif;
  min-height: 100%;
}

body {
  min-height: 100vh;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  background: rgba(10, 17, 28, 0.95);
  border-right: 1px solid var(--border);
  padding: 24px 18px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), #6d7cff);
  color: #03101a;
  font-weight: 800;
  font-size: 1.3rem;
  box-shadow: var(--shadow);
}

.eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.brand-wrap h1,
.topbar h2,
.match-meta h3,
.section-header h3 {
  font-weight: 800;
}

.filters {
  margin-bottom: 20px;
  padding: 18px 14px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.72);
  border-radius: 18px;
}

.filter-header,
.filter-row,
.source-header,
.meta-line,
.section-header,
.source-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.filter-header {
  margin-bottom: 12px;
  font-weight: 600;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  border: 1px solid var(--border);
  background: rgba(148, 163, 184, 0.06);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 999px;
  transition: 0.2s ease;
}

.chip.active,
.chip:hover {
  background: rgba(90, 212, 255, 0.14);
  border-color: rgba(90, 212, 255, 0.38);
  color: var(--primary);
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 22px;
}

.stats-panel > div {
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.9);
  border-radius: 14px;
  padding: 14px 10px;
  display: grid;
  gap: 4px;
  text-align: center;
}

.stats-panel span {
  color: var(--muted);
  font-size: 0.75rem;
}

.search-box {
  display: grid;
  gap: 8px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.8);
  border-radius: 14px;
  padding: 12px 14px;
}

.search-box span {
  color: var(--muted);
  font-size: 0.8rem;
}

.search-box input,
.custom-source-box input {
  background: transparent;
  border: 1px solid var(--soft);
  border-radius: 10px;
  outline: none;
  padding: 10px 12px;
  color: var(--text);
}

.main-panel {
  padding: 28px 26px 36px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.ghost-btn,
.primary-btn,
.secondary-btn,
.icon-close {
  border-radius: 12px;
  border: none;
}

.ghost-btn,
.secondary-btn {
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 10px 14px;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #06131d;
  font-weight: 700;
  padding: 12px 16px;
}

.player-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.7fr);
  gap: 20px;
  margin-bottom: 28px;
}

.video-wrap {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  min-height: 420px;
  background: #020b14;
  box-shadow: var(--shadow);
}

#player,
.player-placeholder {
  width: 100%;
  height: 100%;
  min-height: 420px;
}

#player {
  background: #030c14;
  display: none;
}

.player-placeholder {
  display: grid;
  place-items: center;
  text-align: center;
  backdrop-filter: blur(6px);
  background: radial-gradient(circle at center, rgba(90, 212, 255, 0.16), rgba(2, 10, 19, 0.9));
  padding: 24px;
}

.placeholder-icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(90, 212, 255, 0.14);
  border: 1px solid rgba(90, 212, 255, 0.25);
  font-size: 2rem;
  margin-bottom: 18px;
}

.player-sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
  border: 1px solid var(--border);
  border-radius: 22px;
  background: rgba(15, 25, 39, 0.82);
  padding: 18px;
}

.match-meta {
  display: grid;
  gap: 10px;
}

.match-meta h3 {
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  line-height: 1.2;
}

.meta-line {
  justify-content: flex-start;
  flex-wrap: wrap;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.1);
  color: var(--text);
  border: 1px solid var(--border);
  font-size: 0.75rem;
  text-transform: capitalize;
}

.status-pill.live {
  background: rgba(53, 208, 127, 0.12);
  border-color: rgba(53, 208, 127, 0.26);
  color: var(--green);
}

.status-pill.upcoming {
  background: rgba(255, 184, 77, 0.12);
  border-color: rgba(255, 184, 77, 0.26);
  color: var(--amber);
}

.stream-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.source-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 180px;
}

.source-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
  max-height: 260px;
  overflow: auto;
}

.source-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  border: 1px solid var(--border);
  background: rgba(148, 163, 184, 0.05);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
  text-align: left;
}

.source-item.active {
  border-color: rgba(90, 212, 255, 0.45);
  background: rgba(90, 212, 255, 0.08);
}

.source-item span {
  line-height: 1.3;
  font-size: 0.82rem;
  color: var(--muted);
}

.matches-section {
  border: 1px solid var(--border);
  background: rgba(11, 18, 31, 0.8);
  border-radius: 22px;
  padding: 18px;
}

.section-header {
  margin-bottom: 16px;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
}

.match-card {
  position: relative;
  display: grid;
  gap: 12px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(18, 27, 38, 0.8), rgba(10, 16, 28, 0.8));
  border-radius: 18px;
  padding: 16px;
  min-height: 190px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.match-card:hover {
  transform: translateY(-2px);
  border-color: rgba(90, 212, 255, 0.28);
}

.match-card.is-selected {
  border-color: rgba(90, 212, 255, 0.55);
  box-shadow: inset 0 0 0 1px rgba(90, 212, 255, 0.2);
}

.match-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.match-card h4 {
  font-size: 1.02rem;
  line-height: 1.4;
}

.match-card p {
  color: var(--muted);
  font-size: 0.82rem;
}

.card-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.7rem;
}

.match-card button {
  margin-top: auto;
  width: 100%;
  border: none;
  background: rgba(90, 212, 255, 0.12);
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
}

.custom-source-panel {
  position: fixed;
  inset: 0;
  background: rgba(2, 7, 15, 0.72);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  z-index: 50;
}

.custom-source-panel.hidden {
  display: none;
}

.custom-source-box {
  width: min(600px, calc(100vw - 28px));
  background: rgba(11, 17, 29, 0.99);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 18px;
  box-shadow: var(--shadow);
}

.source-box-header {
  margin-bottom: 14px;
}

.icon-close {
  width: 30px;
  height: 30px;
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
  font-size: 1.5rem;
}

.custom-source-box input {
  width: 100%;
  margin-bottom: 14px;
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .player-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .main-panel {
    padding: 18px 14px 26px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .stream-actions {
    grid-template-columns: 1fr;
  }
}
