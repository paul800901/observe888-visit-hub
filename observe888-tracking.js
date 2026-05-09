(function initObserve888Tracker() {
  const pageViewKeys = new Set();
  const attributionStorageKey = 'observe888_attribution_v1';
  const visitStorageKey = 'observe888_visit_id_v1';
  const visitorStorageKey = 'observe888_visitor_id_v1';
  const defaultAttributionMaxAgeDays = 30;

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

  function safeStorage(storageName) {
    try {
      return window[storageName] || null;
    } catch (error) {
      return null;
    }
  }

  function createId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return `${prefix}:${window.crypto.randomUUID()}`;
    }

    return `${prefix}:${Date.now().toString(36)}:${Math.random().toString(36).slice(2, 12)}`;
  }

  function getStoredJson(storageName, key) {
    const storage = safeStorage(storageName);
    if (!storage) {
      return null;
    }

    try {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }

  function setStoredJson(storageName, key, value) {
    const storage = safeStorage(storageName);
    if (!storage) {
      return;
    }

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Storage may be blocked in private browsing.
    }
  }

  function removeStoredJson(storageName, key) {
    const storage = safeStorage(storageName);
    if (!storage) {
      return;
    }

    try {
      storage.removeItem(key);
    } catch (error) {
      // Storage may be blocked in private browsing.
    }
  }

  function getOrCreateStoredId(storageName, key, prefix) {
    const storage = safeStorage(storageName);
    const existingValue = storage ? String(storage.getItem(key) || '').trim() : '';
    if (existingValue) {
      return existingValue;
    }

    const nextValue = createId(prefix);
    if (storage) {
      try {
        storage.setItem(key, nextValue);
      } catch (error) {
        // Storage may be blocked in private browsing.
      }
    }
    return nextValue;
  }

  function getVisitId() {
    return getOrCreateStoredId('sessionStorage', visitStorageKey, 'visit');
  }

  function getVisitorId() {
    return getOrCreateStoredId('localStorage', visitorStorageKey, 'visitor');
  }

  function pickParam(params, names) {
    for (let index = 0; index < names.length; index += 1) {
      const value = String(params.get(names[index]) || '').trim();
      if (value) {
        return value;
      }
    }
    return '';
  }

  function getAttributionMaxAgeMs() {
    const config = getConfig();
    const days = Number(config.attributionMaxAgeDays || defaultAttributionMaxAgeDays);
    const safeDays = Number.isFinite(days) && days > 0 ? days : defaultAttributionMaxAgeDays;
    return safeDays * 24 * 60 * 60 * 1000;
  }

  function hasAttributionSignal(attribution) {
    return [
      'gclid',
      'gbraid',
      'wbraid',
      'campaign_id',
      'campaign_name',
      'ad_group_id',
      'keyword_text',
      'match_type',
      'device',
      'network',
      'creative',
      'placement',
      'traffic_source',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term'
    ].some((fieldName) => String(attribution[fieldName] || '').trim());
  }

  function readUrlAttribution() {
    const params = new URLSearchParams(window.location.search || '');
    const attribution = {
      gclid: pickParam(params, ['gclid']),
      gbraid: pickParam(params, ['gbraid']),
      wbraid: pickParam(params, ['wbraid']),
      campaign_id: pickParam(params, ['campaign_id', 'campaignid']),
      campaign_name: pickParam(params, ['campaign_name', 'utm_campaign']),
      ad_group_id: pickParam(params, ['ad_group_id', 'adgroupid']),
      ad_group_name: pickParam(params, ['ad_group_name', 'utm_adgroup']),
      keyword_text: pickParam(params, ['keyword_text', 'keyword', 'utm_term']),
      search_term: pickParam(params, ['search_term']),
      match_type: pickParam(params, ['match_type', 'matchtype']),
      device: pickParam(params, ['device']),
      network: pickParam(params, ['network']),
      creative: pickParam(params, ['creative']),
      placement: pickParam(params, ['placement']),
      traffic_source: pickParam(params, ['src', 'source', 'utm_source']),
      utm_source: pickParam(params, ['utm_source']),
      utm_medium: pickParam(params, ['utm_medium']),
      utm_campaign: pickParam(params, ['utm_campaign']),
      utm_content: pickParam(params, ['utm_content']),
      utm_term: pickParam(params, ['utm_term'])
    };

    if (!attribution.traffic_source && (attribution.gclid || attribution.gbraid || attribution.wbraid || attribution.campaign_id)) {
      attribution.traffic_source = 'google_ads';
    }

    if (!hasAttributionSignal(attribution)) {
      return null;
    }

    return Object.assign(attribution, {
      captured_at: new Date().toISOString(),
      landing_page_url: window.location.href,
      landing_page_path: window.location.pathname,
      landing_page_query: window.location.search || '',
      attribution_source: 'url'
    });
  }

  function readStoredAttribution() {
    const stored = getStoredJson('localStorage', attributionStorageKey);
    if (!stored || !stored.captured_at) {
      return null;
    }

    const capturedAt = new Date(stored.captured_at);
    if (Number.isNaN(capturedAt.getTime())) {
      removeStoredJson('localStorage', attributionStorageKey);
      return null;
    }

    if (Date.now() - capturedAt.getTime() > getAttributionMaxAgeMs()) {
      removeStoredJson('localStorage', attributionStorageKey);
      return null;
    }

    return Object.assign({}, stored, { attribution_source: 'stored' });
  }

  function getAttribution() {
    const urlAttribution = readUrlAttribution();
    if (urlAttribution) {
      setStoredJson('localStorage', attributionStorageKey, urlAttribution);
      return urlAttribution;
    }

    return readStoredAttribution() || { attribution_source: 'none' };
  }

  function inferEventType(eventName, extra) {
    const normalizedName = String(eventName || '').trim().toLowerCase();
    const eventCategory = String(extra && extra.event_category || '').trim().toLowerCase();
    const ctaType = String(extra && extra.cta_type || '').trim().toLowerCase();

    if (eventCategory === 'page_view' || normalizedName.startsWith('page_view')) {
      return 'page_view';
    }
    if (ctaType === 'line' || normalizedName.startsWith('click_line')) {
      return 'line_click';
    }
    if (['call', 'map'].includes(ctaType) || normalizedName.startsWith('click_call') || normalizedName.startsWith('click_map')) {
      return 'click';
    }
    if (eventCategory === 'cta_click' || normalizedName.startsWith('click_')) {
      return 'click';
    }
    return '';
  }

  function inferContactChannel(extra) {
    const ctaType = String(extra && extra.cta_type || '').trim().toLowerCase();
    if (ctaType === 'line') return 'LINE';
    if (ctaType === 'call') return 'PHONE';
    if (ctaType === 'map') return 'MAP';
    return '';
  }

  function buildLeadKey(attribution, visitId) {
    if (attribution.gclid) return `gclid:${attribution.gclid}`;
    if (attribution.gbraid) return `gbraid:${attribution.gbraid}`;
    if (attribution.wbraid) return `wbraid:${attribution.wbraid}`;
    if (!visitId) return '';
    return String(visitId).startsWith('visit:') ? visitId : `visit:${visitId}`;
  }

  function buildPayload(eventName, extra) {
    const config = getConfig();
    const bodyDataset = document.body ? document.body.dataset : {};
    const attribution = getAttribution();
    const visitId = getVisitId();
    const visitorId = getVisitorId();
    const eventType = inferEventType(eventName, extra);
    const contactChannel = inferContactChannel(extra);

    return Object.assign(
      {
        event_name: eventName,
        event_type: eventType,
        lead_key: buildLeadKey(attribution, visitId),
        visit_id: visitId,
        visitor_id: visitorId,
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
        viewport_height: window.innerHeight || 0,
        contact_channel: contactChannel,
        attribution_source: attribution.attribution_source || 'none',
        gclid: attribution.gclid || '',
        gbraid: attribution.gbraid || '',
        wbraid: attribution.wbraid || '',
        campaign_id: attribution.campaign_id || '',
        campaign_name: attribution.campaign_name || '',
        ad_group_id: attribution.ad_group_id || '',
        ad_group_name: attribution.ad_group_name || '',
        keyword_text: attribution.keyword_text || '',
        search_term: attribution.search_term || '',
        match_type: attribution.match_type || '',
        device: attribution.device || '',
        network: attribution.network || '',
        creative: attribution.creative || '',
        placement: attribution.placement || '',
        traffic_source: attribution.traffic_source || '',
        utm_source: attribution.utm_source || '',
        utm_medium: attribution.utm_medium || '',
        utm_campaign: attribution.utm_campaign || '',
        utm_content: attribution.utm_content || '',
        utm_term: attribution.utm_term || '',
        landing_page_url: attribution.landing_page_url || '',
        landing_page_path: attribution.landing_page_path || '',
        landing_page_query: attribution.landing_page_query || '',
        attribution_captured_at: attribution.captured_at || ''
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
