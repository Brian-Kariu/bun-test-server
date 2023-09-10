Bun.serve({
  fetch(req) {
    throw new Error("woops!");
  },
  error(error) {
    return new Response(`<pre>${error}
${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/json",
      },
    });
  },
});
