const fs = require('fs');

const songsFile = 'src/app/data/songs.json';
const songs = JSON.parse(fs.readFileSync(songsFile, 'utf8'));

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        console.log(`Processing: ${song.title} - ${song.artist}`);
        
        // Only fetch if it looks like a placeholder or weird link, or just fetch all to be safe?
        // Let's just fetch all and find valid high-res itunes links.
        let query = `${song.title} ${song.artist.split(',')[0]}`;
        let url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=1`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.results && data.results.length > 0) {
                const track = data.results[0];
                // Get the base url from artworkUrl100
                const artworkUrl = track.artworkUrl100;
                if (artworkUrl) {
                    // Replace 100x100bb with a ridiculously safe standard 1000x1000bb
                    const hqArtwork = artworkUrl.replace('100x100bb.jpg', '1000x1000bb.jpg');
                    console.log(` -> Found cover: ${hqArtwork}`);
                    song.cover = hqArtwork;
                }
            } else {
                console.log(` -> No cover found in iTunes data for: ${query}`);
            }
        } catch (err) {
            console.log(` -> Error fetching ${query}:`, err);
        }
        await delay(300);
    }
    
    fs.writeFileSync(songsFile, JSON.stringify(songs, null, 2));
    console.log('Finished updating covers via iTunes!');
}

run().catch(console.error);
