export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/go/")) {
      return redirectToGoogleMaps(url, env);
    }

    return env.ASSETS.fetch(request);
  },
};

function redirectToGoogleMaps(url, env) {
  const key = decodeURIComponent(url.pathname.replace(/^\/go\//, "")).trim();
  const addresses = parseAddresses(env.DESTINATION_ADDRESSES);
  const address = addresses[key];

  if (!address) {
    return new Response("Destination not found.", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving`;

  return Response.redirect(mapsUrl, 302);
}

function parseAddresses(value) {
  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
