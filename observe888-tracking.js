(function initObserve888Tracker() {
  const pageViewKeys = new Set();

  function getConfig() {
    return window.OBSERVE888_TRACKING_CONFIG || {};
  }

  function getEndpoint() {
    return String(getConfig().endpoint || '').trim();
  }

  function logDebug(message, payload) {
    const config = getConfig();
    if (!config.debug) {
      return;
    }
    console.debug('[Observe888Tracker]', message, payload || '');
  }

  function buildPayload(eventName, extra) {
    const config = getConfig();
    const bodyDataset = document.body ? document.body.dataset : {};

    return Object.assign(
      {
        event_name: eventName,
        source_name: String(config.sourceName || 'observe888_public'),
        site_name: String(config.siteName || 'observe888-visit-hub'),
        occurred_at: new Date().toISOString(),
        page_title: document.title || '',
        page_url: window.location.href,
        page_path: window.location.pathname,
        page_query: window.location.search || '',
        referrer: document.referrer || '',
        entry_mode: bodyDataset.entryMode || '',
        entry_variant: bodyDataset.entryVariant || '',
        viewport_width: window.innerWidth || 0,
        viewport_height: window.innerHeight || 0
      },
      extra || {}
    );
  }

  function sendPayload(payload) {
    const endpoint = getEndpoint();
    if (!endpoint) {
      logDebug('skip send: endpoint not configured', payload);
      return Promise.resolve(false);
    }

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      try {
        const sent = navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
        if (sent) {
          logDebug('sendBeacon sent', payload);
          return Promise.resolve(true);
        }
      } catch (error) {
        logDebug('sendBeacon failed', error && error.message ? error.message : error);
      }
    }

    return fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body
    })
      .then(() => {
        logDebug('fetch sent', payload);
        return true;
      })
      .catch((error) => {
        logDebug('fetch failed', error && error.message ? error.message : error);
        return false;
      });
  }

  function track(eventName, extra) {
    return sendPayload(buildPayload(eventName, extra));
  }

  function trackPageView(eventName, extra) {
    const pageKey = [eventName, window.location.pathname, window.location.search].join('::');
    if (pageViewKeys.has(pageKey)) {
      return Promise.resolve(false);
    }

    pageViewKeys.add(pageKey);
    return track(eventName, Object.assign({ event_category: 'page_view' }, extra || {}));
  }

  function bindTrackClick(element, options) {
    if (!element || element.dataset.observeBound === '1') {
      return;
    }

    const eventName = String(options && options.eventName || '').trim();
    const payloadOptions = Object.assign({}, options || {});
    if (!eventName) {
      return;
    }

    delete payloadOptions.eventName;

    element.dataset.observeBound = '1';
    element.addEventListener('click', () => {
      track(eventName, Object.assign({
        event_category: 'cta_click',
        store: '',
        page_role: '',
        cta_type: '',
        cta_position: '',
        href: element.href || ''
      }, payloadOptions));
    });
  }

  window.Observe888Tracker = {
    track,
    trackPageView,
    bindTrackClick,
    isConfigured() {
      return Boolean(getEndpoint());
    }
  };
})();
