const state = {
  matches: [],
  selectedMatch: null,
  selectedSourceIndex: 0,
  filter: 'all',
  search: '',
  customSource: null,
  hls: null,
  autoRefreshInterval: null
};

const els = {
  totalCount: document.getElementById('totalCount'),
  liveCount: document.getElementById('liveCount'),
  upcomingCount: document.getElementById('upcomingCount'),
  searchInput: document.getElementById('searchInput'),
  matchesGrid: document.getElementById('matchesGrid'),
  sourceList: document.getElementById('sourceList'),
  player: document.getElementById('player'),
  playerPlaceholder: document.getElementById('playerPlaceholder'),
  metaSport: document.getElementById('metaSport'),
  metaTitle: document.getElementById('metaTitle'),
  metaLeague: document.getElementById('metaLeague'),
  metaStatus: document.getElementById('metaStatus'),
  sourceCount: document.getElementById('sourceCount'),
  matchSummary: document.getElementById('matchSummary'),
  pageTitle: document.getElementById('pageTitle'),
  nextSource: document.getElementById('nextSource'),
  playCurrent: document.getElementById('playCurrent'),
  customSourcePanel: document.getElementById('customSourcePanel'),
  customSourceInput: document.getElementById('customSourceInput'),
  manualSourceToggle: document.getElementById('manualSourceToggle'),
  closeSourcePanel: document.getElementById('closeSourcePanel'),
  loadCustomSource: document.getElementById('loadCustomSource')
};

// Demo fallback streams that work
const demoStreams = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
];

const fallbackMatches = [
  {
    title: 'Live Test Stream 1',
    teams: 'Test Stream A vs Test Stream B',
    league: 'Demo League',
    sport: 'streaming',
    status: 'live',
    viewers: '999',
    match_id: 'demo-1',
    server_urls: [demoStreams[0], demoStreams[1]]
  },
  {
    title: 'Live Test Stream 2',
    teams: 'Demo Stream C vs Demo Stream D',
    league: 'Test League',
    sport: 'streaming',
    status: 'live',
    viewers: '888',
    match_id: 'demo-2',
    server_urls: [demoStreams[2]]
  },
  {
    title: 'Upcoming Demo Stream',
    teams: 'Stream E vs Stream F',
    league: 'Demo Series',
    sport: 'streaming',
    status: 'upcoming',
    viewers: '42',
    match_id: 'demo-3',
    server_urls: [demoStreams[1]]
  }
];

function normalizeMatches(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((match) => ({
    ...match,
    status: (match.status || 'upcoming').toLowerCase(),
    viewers: match.viewers || '0',
    league: match.league || 'General',
    sport: match.sport || 'sport',
    title: match.title || 'Untitled Match',
    teams: match.teams || match.title || 'Unknown Teams',
    match_id: match.match_id || match.title || 'unknown'
  }));
}

function getStreamSources(match) {
  const candidates = [];

  if (Array.isArray(match.server_urls) && match.server_urls.length) {
    match.server_urls.forEach((url) => {
      if (typeof url === 'string' && url.trim()) {
        candidates.push(url.trim());
      }
    });
  }

  ['stream_url', 'hls_url', 'url', 'source', 'stream'].forEach((key) => {
    const value = match[key];
    if (typeof value === 'string' && value.trim()) {
      candidates.push(value.trim());
    }
  });

  return [...new Set(candidates)];
}

function getVisibleMatches() {
  const term = state.search.trim().toLowerCase();
  return state.matches.filter((match) => {
    const matchesFilter = state.filter === 'all' || match.status === state.filter;
    const matchesSearch = !term || [match.title, match.teams, match.league, match.sport, match.status].join(' ').toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });
}

function updateSummary() {
  const live = state.matches.filter((m) => m.status === 'live').length;
  const upcoming = state.matches.filter((m) => m.status === 'upcoming').length;

  els.totalCount.textContent = state.matches.length;
  els.liveCount.textContent = live;
  els.upcomingCount.textContent = upcoming;
  els.matchSummary.textContent = `${getVisibleMatches().length} available`;
}

function updatePageTitle() {
  const labels = {
    all: 'Today's matches',
    live: 'Live now',
    upcoming: 'Upcoming fixtures'
  };
  els.pageTitle.textContent = labels[state.filter] || labels.all;
}

function renderSourceList(match) {
  const sources = getStreamSources(match);

  els.sourceCount.textContent = sources.length;
  if (!sources.length) {
    els.sourceList.innerHTML = '<li class="source-item"><span>No stream source available</span></li>';
    return;
  }

  const activeIndex = Math.min(state.selectedSourceIndex, sources.length - 1);
  state.selectedSourceIndex = activeIndex;

  els.sourceList.innerHTML = sources
    .map(
      (source, idx) => `
    <li>
      <button class="source-item ${idx === activeIndex ? 'active' : ''}" data-source-index="${idx}">
        <strong>Source ${idx + 1}</strong>
        <span>${source.includes('.m3u8') ? 'HLS' : 'Media'}</span>
      </button>
    </li>
  `
    )
    .join('');

  els.sourceList.querySelectorAll('.source-item').forEach((item) => {
    item.addEventListener('click', () => {
      state.selectedSourceIndex = Number(item.dataset.sourceIndex);
      renderSourceList(match);
      loadSelectedStream(match);
    });
  });
}

function renderMatches() {
  const filtered = getVisibleMatches();
  if (!filtered.length) {
    els.matchesGrid.innerHTML = `
      <div class="match-card">
        <h4>No matches found</h4>
        <p>Try another search or filter.</p>
      </div>
    `;
    return;
  }

  els.matchesGrid.innerHTML = filtered
    .map(
      (match) => `
    <article class="match-card ${state.selectedMatch && state.selectedMatch.match_id === match.match_id ? 'is-selected' : ''}">
      <div class="match-card-top">
        <span class="badge">${match.sport || 'sport'}</span>
        <span class="status-pill ${match.status}">${match.status}</span>
      </div>
      <div>
        <h4>${match.title}</h4>
        <p>${match.teams}</p>
      </div>
      <div class="card-badges">
        <span class="badge">${match.league}</span>
        <span class="badge">${match.viewers || '0'} viewers</span>
      </div>
      <button type="button" data-match-id="${match.match_id}">Watch now</button>
    </article>
  `
    )
    .join('');

  els.matchesGrid.querySelectorAll('[data-match-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const match = filtered.find((item) => item.match_id === button.dataset.matchId);
      if (match) selectMatch(match);
    });
  });
}

function selectMatch(match) {
  state.selectedMatch = match;
  state.selectedSourceIndex = 0;
  renderMatches();
  renderMeta(match);
  renderSourceList(match);
  loadSelectedStream(match);
}

function renderMeta(match) {
  const statusText = match.status || 'upcoming';
  els.metaSport.textContent = match.sport || 'Sport';
  els.metaTitle.textContent = match.title || 'Match';
  els.metaLeague.textContent = match.league || 'League';
  els.metaStatus.textContent = statusText;
  els.metaStatus.className = `status-pill ${statusText}`;
}

function stopCurrentPlayer() {
  if (state.hls) {
    try {
      state.hls.destroy();
    } catch (error) {
      console.warn('HLS destroy error:', error);
    }
    state.hls = null;
  }

  if (!els.player.paused) {
    els.player.pause();
  }
  els.player.src = '';
  els.player.removeAttribute('src');
  els.player.load();
}

function loadSelectedStream(match) {
  const sources = getStreamSources(match);
  if (!sources.length) {
    stopCurrentPlayer();
    els.playerPlaceholder.style.display = 'grid';
    els.player.style.display = 'none';
    return;
  }

  const url = sources[state.selectedSourceIndex] || sources[0];
  els.playerPlaceholder.style.display = 'none';
  els.player.style.display = 'block';

  stopCurrentPlayer();

  // HLS support
  if (url.includes('.m3u8')) {
    if (window.Hls && Hls.isSupported()) {
      state.hls = new Hls({
        liveBackBufferLength: 90,
        lowLatencyMode: false,
        backBufferLength: 90,
        enableWorker: true,
        maxMaxBufferLength: 30,
        maxBufferLength: 10,
        maxBufferSize: 60 * 1000 * 1000
      });

      state.hls.on(Hls.Events.ERROR, (event, data) => {
        console.warn('HLS Error:', data);
        if (data.fatal) {
          nextSource(match);
        }
      });

      state.hls.loadSource(url);
      state.hls.attachMedia(els.player);
      els.player.play().catch((error) => console.warn('Play error:', error));
      return;
    } else if (els.player.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      els.player.src = url;
      els.player.load();
      els.player.play().catch((error) => console.warn('Play error:', error));
      return;
    }
  }

  // Direct MP4/video
  els.player.src = url;
  els.player.load();
  els.player.play().catch((error) => console.warn('Play error:', error));
}

function nextSource(match) {
  if (!match) return;
  const sources = getStreamSources(match);
  if (!sources.length) return;
  state.selectedSourceIndex = (state.selectedSourceIndex + 1) % sources.length;
  renderSourceList(match);
  loadSelectedStream(match);
}

async function loadMatches() {
  try {
    const response = await fetch('./data/matches.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('JSON not found');
    const json = await response.json();
    const matches = normalizeMatches(json.matches || json.data || json);
    
    if (matches.length > 0) {
      state.matches = matches;
    } else {
      throw new Error('No matches in JSON');
    }
  } catch (error) {
    console.warn('Using fallback demo streams:', error);
    state.matches = normalizeMatches(fallbackMatches);
  }

  updateSummary();
  updatePageTitle();
  renderMatches();

  // Auto-select and play first live match, or first match
  const liveMatches = state.matches.filter((m) => m.status === 'live');
  const matchToPlay = liveMatches.length > 0 ? liveMatches[0] : state.matches[0];

  if (matchToPlay) {
    selectMatch(matchToPlay);
  }
}

function bindControls() {
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      state.filter = chip.dataset.filter || 'all';
      updatePageTitle();
      renderMatches();
    });
  });

  els.searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderMatches();
  });

  els.nextSource.addEventListener('click', () => nextSource(state.selectedMatch));
  els.playCurrent.addEventListener('click', () => {
    if (state.selectedMatch) loadSelectedStream(state.selectedMatch);
  });

  els.manualSourceToggle.addEventListener('click', () => {
    els.customSourcePanel.classList.remove('hidden');
    els.customSourceInput.focus();
  });

  els.closeSourcePanel.addEventListener('click', () => {
    els.customSourcePanel.classList.add('hidden');
  });

  els.loadCustomSource.addEventListener('click', () => {
    const customUrl = els.customSourceInput.value.trim();
    if (!customUrl) return;

    const title = state.selectedMatch ? state.selectedMatch.title : 'Custom stream';
    const match = {
      ...(state.selectedMatch || {}),
      title,
      server_urls: [customUrl],
      match_id: 'custom-stream-' + Date.now(),
      status: 'live'
    };

    state.selectedMatch = match;
    state.selectedSourceIndex = 0;
    renderMeta(match);
    renderSourceList(match);
    loadSelectedStream(match);
    els.customSourcePanel.classList.add('hidden');
    els.customSourceInput.value = '';
  });

  // Allow Enter to load custom source
  els.customSourceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      els.loadCustomSource.click();
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  bindControls();
  loadMatches();
  
  // Auto-refresh every 30 seconds
  state.autoRefreshInterval = setInterval(() => {
    loadMatches();
  }, 30000);
});

// Cleanup on unload
window.addEventListener('beforeunload', () => {
  if (state.autoRefreshInterval) {
    clearInterval(state.autoRefreshInterval);
  }
  stopCurrentPlayer();
});
