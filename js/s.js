// s.js - Leaderboard JavaScript (frontend)

const apiBase = '/api/leaderboard';

// Fetch leaderboard data
async function fetchLeaderboard(course = 'java') {
  try {
    const headers = isLoggedIn() ? { 'Authorization': 'Bearer ' + localStorage.getItem('quizventure_token') } : {};
    const response = await fetch(`${apiBase}/${course}`, { headers });
    const data = await response.json();

    if (data.success) {
      displayLeaderboard(data.leaderboard);

      if (data.userRank) {
        showUserRank(data.userRank, data.userScore);
      } else {
        const existingRank = document.querySelector('.user-rank-info');
        if (existingRank) existingRank.remove();
      }
    } else {
      throw new Error(data.error || 'Failed to fetch leaderboard');
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    const listEl = document.getElementById('list');
    if (listEl) {
      listEl.innerHTML = `
        <div class="item error">
          <span>Failed to load leaderboard. Please try again later.</span>
        </div>`;
    }
  }
}

function displayLeaderboard(scores) {
  const listElement = document.getElementById('list');
  if (!listElement) return;
  listElement.innerHTML = '';

  if (!scores || scores.length === 0) {
    listElement.innerHTML = `
      <div class="item empty">
        <span>No scores yet. Be the first to submit a score!</span>
      </div>`;
    return;
  }

  scores.forEach((entry) => {
    const item = document.createElement('div');
    item.className = 'item';

    if (entry.rank <= 3) {
      item.classList.add('top-three');
      if (entry.rank === 1) item.classList.add('first');
      if (entry.rank === 2) item.classList.add('second');
      if (entry.rank === 3) item.classList.add('third');
    }

    const timeMinutes = Math.floor((entry.completionTime || 0) / 60);
    const timeSeconds = (entry.completionTime || 0) % 60;
    const timeString = `${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`;

    item.innerHTML = `
      <span class="rank">${entry.rank}</span>
      <span class="name">${entry.username || 'Unknown'}</span>
      <span class="score">${entry.percentage ?? entry.score ?? 0}%</span>
      <span class="details">${entry.score ?? 0}/${entry.totalQuestions ?? 0} • ${timeString}</span>
    `;

    listElement.appendChild(item);
  });
}

function showUserRank(rank, score) {
  const existing = document.querySelector('.user-rank-info');
  if (existing) existing.remove();

  const userInfo = document.createElement('div');
  userInfo.className = 'user-rank-info';
  userInfo.innerHTML = `
    <h3>Your Rank: #${rank}</h3>
    <p>Score: ${score.score}/${score.totalQuestions} (${score.percentage}%)</p>
    <p>Time: ${Math.floor((score.completionTime||0) / 60)}:${((score.completionTime||0) % 60).toString().padStart(2, '0')}</p>
  `;

  const title = document.querySelector('.title');
  if (title) {
    title.parentNode.insertBefore(userInfo, title.nextSibling);
  }
}

function isLoggedIn() {
  return !!localStorage.getItem('quizventure_token');
}

function addCourseFilters() {
  const filterDiv = document.createElement('div');
  filterDiv.className = 'course-filters';
  filterDiv.innerHTML = `
    <button class="filter-btn active" data-course="java">Java</button>
    <button class="filter-btn" data-course="html">HTML</button>
    <button class="filter-btn" data-course="css">CSS</button>
    <button class="filter-btn" data-course="javascript">JavaScript</button>
    <button class="filter-btn" data-course="python">Python</button>
    <button class="filter-btn" data-course="overall">Overall</button>
  `;

  const board = document.querySelector('.board');
  if (board) {
    const title = board.querySelector('.title');
    if (title) title.parentNode.insertBefore(filterDiv, title.nextSibling);
  }

  filterDiv.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
      filterDiv.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const course = this.dataset.course;
      await fetchLeaderboard(course);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  addCourseFilters();
  fetchLeaderboard();

  const refreshBtn = document.createElement('button');
  refreshBtn.className = 'refresh-btn';
  refreshBtn.innerHTML = '🔄 Refresh';
  refreshBtn.addEventListener('click', () => {
    const active = document.querySelector('.filter-btn.active');
    const course = active ? active.dataset.course : 'java';
    fetchLeaderboard(course);
  });

  const nav = document.querySelector('.nav-inner');
  if (nav) nav.appendChild(refreshBtn);
});