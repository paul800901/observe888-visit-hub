const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' https: data:",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self' https://script.google.com https://script.googleusercontent.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://static.cloudflareinsights.com https://cloudflareinsights.com https://nominatim.openstreetmap.org https://connect.facebook.net https://www.facebook.com",
    "frame-src https://www.google.com https://maps.google.com",
    "form-action 'self' https://docs.google.com https://liff.line.me https://line.me",
    "upgrade-insecure-requests",
  ].join("; "),
  "Permissions-Policy": "accelerometer=(), autoplay=(), camera=(), encrypted-media=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), geolocation=(self)",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);

  for (const [headerName, headerValue] of Object.entries(securityHeaders)) {
    headers.set(headerName, headerValue);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const githubRawBase =
  "https://raw.githubusercontent.com/paul800901/observe888-visit-hub/main";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".mp4", "video/mp4"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webm", "video/webm"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function sourceCandidates(pathname) {
  if (pathname === "/") {
    return ["/index.html"];
  }

  if (pathname.endsWith("/")) {
    return [`${pathname}index.html`];
  }

  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  return lastSegment.includes(".")
    ? [pathname]
    : [pathname, `${pathname}/index.html`];
}

function contentTypeFor(pathname) {
  const filename = pathname.toLowerCase();
  const extensionIndex = filename.lastIndexOf(".");
  const extension = extensionIndex === -1 ? "" : filename.slice(extensionIndex);
  return contentTypes.get(extension);
}

async function fetchPublishedSource(request, pathname) {
  let upstreamResponse;
  let sourcePath;

  for (const candidate of sourceCandidates(pathname)) {
    sourcePath = candidate;
    upstreamResponse = await fetch(`${githubRawBase}${candidate}`, {
      cf: { cacheEverything: true, cacheTtl: 300 },
      method: "GET",
    });

    if (upstreamResponse.status !== 404) {
      break;
    }
  }

  const headers = new Headers(upstreamResponse.headers);
  const contentType = contentTypeFor(sourcePath);
  if (contentType) {
    headers.set("Content-Type", contentType);
  }
  headers.set("X-Observe-Origin", "github-raw-main");

  return new Response(request.method === "HEAD" ? null : upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    if (url.hostname === "observe888.com") {
      url.protocol = "https:";
      url.hostname = "www.observe888.com";
      return withSecurityHeaders(Response.redirect(url.toString(), 301));
    }

    const redirect = (targetPath) => {
      const target = new URL(targetPath, url.origin);
      const passthroughKeys = new Set(["gclid", "gbraid", "wbraid", "fbclid", "msclkid"]);

      for (const [key, value] of url.searchParams) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.startsWith("utm_") || passthroughKeys.has(lowerKey)) {
          target.searchParams.append(key, value);
        }
      }

      return withSecurityHeaders(Response.redirect(target.toString(), 301));
    };

    if (path === "/index.php") {
      return redirect("/");
    }

    if (path === "/north" || path === "/north/" || path === "/north/index.html") {
      return redirect("/visit/");
    }

    if (
      path === "/north/pricing" ||
      path === "/north/pricing/" ||
      path === "/north/pricing/index.html"
    ) {
      return redirect("/south/pricing/");
    }

    if (path === "/products/car.php") {
      return redirect("/services/tainan-tuina/");
    }

    if (path === "/album" || path === "/album/" || path.startsWith("/album/")) {
      return redirect("/notes/");
    }

    if (path === "/observations" || path === "/observations/" || path.startsWith("/observations/")) {
      return redirect("/notes/");
    }

    if (path === "/news" || path === "/news/" || path.startsWith("/news/")) {
      return redirect("/notes/");
    }

    if (path === "/paper/other_page.php") {
      return redirect(url.searchParams.get("id") === "11272" ? "/about/" : "/visit/");
    }

    if (path === "/paper/other_select_index.php") {
      return redirect(url.searchParams.get("id") === "3718" ? "/south/pricing/" : "/visit/");
    }

    if (path === "/paper/promotions_index.php") {
      return redirect("/visit/");
    }

    if (path === "/paper" || path === "/paper/" || path.startsWith("/paper/")) {
      return redirect("/notes/");
    }

    if (path.endsWith(".php")) {
      return redirect("/visit/");
    }

    return withSecurityHeaders(await fetchPublishedSource(request, url.pathname));
  },
};
