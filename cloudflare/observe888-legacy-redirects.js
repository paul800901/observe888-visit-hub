export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    if (path === "/index.php") {
      return Response.redirect("https://www.observe888.com/", 301);
    }

    if (path === "/paper/other_select_index.php") {
      const targetPath = url.searchParams.get("id") === "3718" ? "/south/pricing/" : "/visit/";
      return Response.redirect(new URL(targetPath, url.origin).toString(), 301);
    }

    return fetch(request);
  },
};
