const ytSearch = require('yt-search');
const fs = require('fs');

const songsList = [
    { query: "about you - 1975", artist: "The 1975" },
    { query: "champagne problems - taylor swift", artist: "Taylor Swift" },
    { query: "The greatest - billie eilish", artist: "Billie Eilish" },
    { query: "senorita - camila cabello, shawn mendes", artist: "Camila Cabello, Shawn Mendes" },
    { query: "save your tears - the weeknd (with ariana grande)", artist: "The Weeknd, Ariana Grande" },
    { query: "apocalypse - ciggarettes after sex", artist: "Cigarettes After Sex" },
    { query: "actor - conan gray", artist: "Conan Gray" },
    { query: "no.1 party anthem - arctic monkeys", artist: "Arctic Monkeys" },
    { query: "The less I know the better - tame imapala", artist: "Tame Impala" },
    { query: "done for me - charlie puth, kehlani", artist: "Charlie Puth, Kehlani" },
    { query: "viva la vida - cold play", artist: "Coldplay" },
    { query: "dtmf - bad bunny", artist: "Bad Bunny" },
    { query: "happier - olivia rodrigo", artist: "Olivia Rodrigo" },
    { query: "back to me - marias", artist: "The Marías" },
    { query: "young and beautiful - lana del rey", artist: "Lana Del Rey" },
    { query: "lover girl - laufey", artist: "Laufey" },
    { query: "dead! - my chemical romance", artist: "My Chemical Romance" },
    { query: "girls like you - maroon 5, cardi b", artist: "Maroon 5, Cardi B" },
    { query: "nobody gets me - sza", artist: "SZA" },
    { query: "love the way you lie - eminem, rihanna", artist: "Eminem, Rihanna" },
    { query: "ojas tristes - selena gomez", artist: "Selena Gomez" },
    { query: "lovers rock - tv girl", artist: "TV Girl" },
    { query: "No lie - dua lipa, sean paul", artist: "Dua Lipa, Sean Paul" },
    { query: "Daddy Issues - The neighbourhood", artist: "The Neighbourhood" }
];

async function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function fetchMetadata(item) {
    try {
        console.log(`Fetching metadata for: ${item.query}`);
        // iTunes API Search
        let url = `https://itunes.apple.com/search?term=${encodeURIComponent(item.query.replace(/ /g, '+'))}&media=music&limit=1`;
        let res = await fetch(url);
        let data = await res.json();
        
        let albumArt = "https://via.placeholder.com/600";
        let albumName = item.query.split('-')[0].trim();
        let songName = item.query.split('-')[0].trim();
        let primaryGenre = "Pop";
        
        if (data.results && data.results.length > 0) {
            const track = data.results[0];
            albumArt = track.artworkUrl100.replace('100x100bb', '600x600bb');
            albumName = track.collectionName || track.trackName;
            songName = track.trackName;
            primaryGenre = track.primaryGenreName;
        }

        // Mock 3 genres based on primary
        let genres = [primaryGenre, "Alternative", "Indie"];
        if (primaryGenre === "Pop") genres = ["Pop", "Vocal", "Contemporary"];
        if (primaryGenre === "Hip-Hop/Rap") genres = ["Hip-Hop", "Rap", "Urban"];
        if (primaryGenre === "Alternative") genres = ["Alternative", "Indie Rock", "Pop"];

        // yt-search for video ID
        const ytRes = await ytSearch(item.query + " audio");
        let ytId = null;
        if (ytRes && ytRes.videos.length > 0) {
            ytId = ytRes.videos[0].videoId;
        }

        return {
            title: songName,
            artist: item.artist,
            album: albumName,
            cover: albumArt,
            youtubeId: ytId,
            genres: genres
        };
    } catch (e) {
        console.log(`Failed for ${item.query}`, e);
        return {
            title: item.query.split('-')[0].trim(),
            artist: item.artist,
            album: item.query.split('-')[0].trim(),
            cover: "https://via.placeholder.com/600",
            youtubeId: null,
            genres: ["Pop", "Indie", "Alternative"]
        };
    }
}

async function generateData() {
    let results = [];
    for (let item of songsList) {
        let meta = await fetchMetadata(item);
        results.push(meta);
        await delay(500); // Respect rate limits
    }
    fs.writeFileSync('src/app/data/songs.json', JSON.stringify(results, null, 2));
    console.log("Done! Written to src/app/data/songs.json");
}

generateData();
