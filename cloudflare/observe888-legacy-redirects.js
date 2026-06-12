export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    const redirect = (targetPath) => {
      const target = new URL(targetPath, url.origin);
      const passthroughKeys = new Set(["gclid", "gbraid", "wbraid", "fbclid", "msclkid"]);

      for (const [key, value] of url.searchParams) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.startsWith("utm_") || passthroughKeys.has(lowerKey)) {
          target.searchParams.append(key, value);
        }
      }

      return Response.redirect(target.toString(), 301);
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

    return fetch(request);
  },
};
