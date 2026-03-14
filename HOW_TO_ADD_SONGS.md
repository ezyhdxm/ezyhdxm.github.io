# How to Add Songs

Each song lives in its own JSON file under `assets/lyrics/songs/`.
A manifest at `assets/lyrics/index.json` lists all filenames.
The site loads them at runtime — no build step needed.

Pages filter songs by the `artist` field:
- **other.html** — shows only `"artist": "ヨルシカ"` songs
- **cyberpunk.html** — shows all non-Yorushika songs

---

## 1. Create a song file

Create a new file in `assets/lyrics/songs/`, e.g. `haru.json`:

```json
{
    "title": "晴る",
    "artist": "ヨルシカ",
    "lyrics_info": {
        "lyricist": "n-buna",
        "composer": "n-buna",
        "arranger": "n-buna",
        "singer": "suis"
    },
    "lyrics": {
        "japanese": [
            "歌詞の一行目",
            "歌詞の二行目"
        ],
        "hiragana": [
            "かしのいちぎょうめ",
            "かしのにぎょうめ"
        ],
        "chinese": [
            "歌詞第一行",
            "歌詞第二行"
        ]
    }
}
```

Rules:
- **`artist`** determines which page shows the song. Use `"ヨルシカ"` for the Japanese lyrics page, anything else for the cyberpunk page.
- `lyrics_info` can be `null` if unknown.
- The three arrays (`japanese`, `hiragana`, `chinese`) **must have the same length**.
- Use kebab-case romanization for the filename (e.g. `hana-ni-bourei.json`).

## 2. Register the song

Add the filename to `assets/lyrics/index.json`:

```json
[
    "daiichiya.json",
    "dakara-boku-wa.json",
    ...
    "haru.json"
]
```

## 3. (Yorushika only) Add to the TV playlist

If it's a Yorushika song and you want it in the TV player, add an entry to `songVideos` in `js/other.js`:

```js
"晴る": "CkvWJNt77mU"
```

The key must match the `"title"` in the song JSON. The value is the YouTube video ID (the part after `v=` in a YouTube URL).

---

That's it. The site loads `index.json`, fetches each song file in parallel, and filters by artist automatically.

## File structure

```
assets/lyrics/
├── index.json              ← manifest (array of filenames)
└── songs/
    ├── daiichiya.json       ← 第一夜
    ├── dakara-boku-wa.json  ← だから僕は音楽を辞めた
    ├── toubou.json          ← 逃亡
    ├── usotsuki.json        ← 嘘月
    ├── sayuu-mou.json       ← 左右盲
    ├── bakudan-ma.json      ← 爆弾魔
    ├── itte.json            ← 言って
    ├── hana-ni-bourei.json  ← 花に亡霊
    ├── tada-kimi-ni-hare.json ← ただ君に晴れ
    ├── haru-dorobou.json    ← 春泥棒
    ├── obenkyou.json        ← お勉強しといてよ
    └── otoneke.json         ← オトネケ
```
