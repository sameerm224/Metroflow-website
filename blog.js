(function () {
  const data = window.MFBlog;
  if (!data?.posts?.length) return;

  const featuredEl = document.getElementById('blogFeatured');
  const allEl = document.getElementById('blogAll');
  const countEl = document.getElementById('blogCount');
  if (!featuredEl && !allEl) return;

  function formatDate(iso) {
    try {
      return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (_) { return iso; }
  }

  function cardHtml(post, opts = {}) {
    const compact = opts.compact ? ' blog-card-compact' : '';
    const featured = opts.featured ? ' blog-card-featured' : '';
    const tags = (post.tags || []).slice(0, 2).map(t => `<span class="blog-tag">${t}</span>`).join('');
    return `<a href="blog/${post.slug}.html" class="blog-card hover-pop${compact}${featured} reveal">
      <div class="blog-card-img">
        <img src="${post.thumb}" alt="" loading="lazy" width="640" height="360">
        <div class="blog-card-img-overlay"></div>
        <span class="blog-card-badge">${post.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span>${formatDate(post.date)}</span>
          <span class="dot"></span>
          <span>${post.readTime}</span>
        </div>
        <h3>${post.title}</h3>
        <p class="blog-card-sub">${opts.featured ? post.subtitle : post.excerpt}</p>
        <div class="blog-card-footer">
          <div class="blog-card-tags">${tags}</div>
          <span class="blog-card-arrow">Read →</span>
        </div>
      </div>
    </a>`;
  }

  const posts = data.posts;
  if (countEl) countEl.textContent = `${posts.length} articles`;

  if (featuredEl && posts.length) {
    const [hero, ...rest] = posts;
    featuredEl.innerHTML = `
      ${cardHtml(hero, { featured: true })}
      <div class="blog-featured-side">
        ${rest.map(p => cardHtml(p, { compact: true })).join('')}
      </div>`;
  }

  if (allEl) {
    allEl.innerHTML = posts.map(p => cardHtml(p)).join('');
  }
})();