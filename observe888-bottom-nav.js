(function () {
  if (document.querySelector('[data-observe-bottom-nav]')) {
    return;
  }

  const script = document.currentScript || Array.from(document.scripts).find((item) => {
    return item.src && item.src.indexOf('observe888-bottom-nav.js') !== -1;
  });

  if (!script || !script.src) {
    return;
  }

  const rootUrl = new URL('.', script.src);
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');

  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"></path><path d="M14 3v4h4"></path><path d="M8.5 11h7"></path><path d="M8.5 15h7"></path></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 10v7"></path><path d="M12 7h.01"></path></svg>',
    faq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.6 2.6 0 0 1 5 1c0 2-2.5 2-2.5 4"></path><path d="M12 17h.01"></path></svg>',
    visit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M3 11 21 3l-8 18-2-8z"></path></svg>'
  };

  const items = [
    { key: 'home', label: '首頁', href: './', eventName: 'click_bottom_nav_home' },
    { key: 'notes', label: '筆記', href: 'notes/', eventName: 'click_bottom_nav_notes' },
    { key: 'about', label: '品牌', href: 'about/', eventName: 'click_bottom_nav_about' },
    { key: 'faq', label: '問題', href: 'faq/', eventName: 'click_bottom_nav_faq' },
    { key: 'visit', label: '導航', href: 'visit/', eventName: 'click_bottom_nav_visit', highlight: true }
  ];

  function inferActiveKey() {
    if (currentPath.indexOf('/visit/') !== -1) return 'visit';
    if (currentPath.indexOf('/faq/') !== -1) return 'faq';
    if (currentPath.indexOf('/about/') !== -1) return 'about';
    if (currentPath.indexOf('/notes/') !== -1) return 'notes';
    return 'home';
  }

  function inferPageRole() {
    const bodyRole = document.body && document.body.dataset ? document.body.dataset.pageRole : '';
    if (bodyRole) return bodyRole;
    if (currentPath.indexOf('/notes/') !== -1 && !currentPath.endsWith('/notes/')) return 'note_article';
    if (currentPath.indexOf('/notes/') !== -1) return 'notes_index';
    if (currentPath.indexOf('/faq/') !== -1) return 'faq';
    if (currentPath.indexOf('/about/') !== -1) return 'about';
    return 'observe_geo_home';
  }

  function bindTracking(anchor, item) {
    const tracker = window.Observe888Tracker;
    if (!tracker || typeof tracker.bindTrackClick !== 'function') {
      return;
    }

    tracker.bindTrackClick(anchor, {
      eventName: item.eventName,
      page_role: inferPageRole(),
      cta_type: item.key === 'visit' ? 'navigation' : 'internal_nav',
      cta_position: 'persistent_nav',
      nav_target: item.key
    });
  }

  const activeKey = inferActiveKey();
  const nav = document.createElement('nav');
  nav.className = 'observe-bottom-nav';
  nav.dataset.observeBottomNav = '1';
  nav.setAttribute('aria-label', '品牌與文章官網底部導覽');

  items.forEach((item) => {
    const anchor = document.createElement('a');
    anchor.className = 'observe-bottom-nav__item';
    if (item.highlight) {
      anchor.className += ' observe-bottom-nav__item--visit';
    }
    anchor.href = new URL(item.href, rootUrl).href;
    anchor.dataset.bottomNavItem = item.key;
    anchor.innerHTML = '<span class="observe-bottom-nav__icon">' + icons[item.key] + '</span><span>' + item.label + '</span>';
    if (item.key === activeKey) {
      anchor.setAttribute('aria-current', 'page');
    }
    bindTracking(anchor, item);
    nav.appendChild(anchor);
  });

  document.body.classList.add('observe-bottom-nav-ready');
  document.body.appendChild(nav);
})();
