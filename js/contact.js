document.querySelectorAll('.btn[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.innerHTML;
      btn.innerHTML = '<img src="check.png" alt="" />Copied!';
      btn.style.filter = 'brightness(1.2)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.filter = '';
      }, 1200);
    } catch {
      alert('Copy failed. Please copy manually: ' + text);
    }
  });
});

document.getElementById('resourcefulBtn').addEventListener('click', () => {
  window.location.href = '#resources';
});

const trees = document.querySelectorAll('.tree');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  trees.forEach((tree, i) => {
    const offset = (i + 1) * 0.15;
    tree.style.transform = `translateY(${y * offset * -0.05}px)`;
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('show-focus');
  }
});