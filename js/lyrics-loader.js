/*
 * Shared lyrics loader.
 * Fetches assets/lyrics/index.json (array of filenames),
 * then loads each song file from assets/lyrics/songs/ in parallel.
 * Results are cached globally so multiple scripts on the same page
 * don't re-fetch.
 */
window.lyricsLoader = (function () {
    let cache = null;

    async function loadAll() {
        if (cache) return cache;
        const res = await fetch("assets/lyrics/index.json");
        if (!res.ok) throw new Error("Failed to load lyrics index");
        const filenames = await res.json();

        cache = await Promise.all(
            filenames.map(f =>
                fetch("assets/lyrics/songs/" + f).then(r => {
                    if (!r.ok) throw new Error("Failed to load " + f);
                    return r.json();
                })
            )
        );
        return cache;
    }

    return { loadAll };
})();
