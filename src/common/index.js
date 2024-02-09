//Neste diretório devias colocar as funções que vão calcular e descobrir dados do ficheiro json
import history from "../assets/data/history.json"
import moment from 'moment';

// Ver quantas plays no total
export function getTotalPlays() {
    return history.length;
}

// Ver quantas músicas diferentes já foram ouvidas no total.
export function getDifferentSongs() {
    return new Set(history.map(e => e["master_metadata_track_name"])).size;
}

// Ver quantos minutos já se passou a ouvir.
export function getMinutesListened() {
    return Math.round(history.reduce((acc, e) => {
        if(e["master_metadata_album_artist_name"] !== null) { 
            return acc + e["ms_played"]
        } else {
            return acc
        }
    }, 0) / (60 * 1000));
}

// Média de tempo diário a ouvir.
export function getAverageDailyListened() {
    let firstDay = new Date();
    let lastDay = new Date();

    history.forEach(e => {
        firstDay = new Date(e.ts).valueOf() < firstDay.valueOf() ? new Date(e.ts) : firstDay;
        lastDay = new Date(e.ts).valueOf() > lastDay.valueOf() ? new Date(e.ts) : lastDay;
    })

    const totalDays = (lastDay - firstDay) / (60 * 60 * 1000 * 24);

    const averageListened = Math.round(getMinutesListened() / totalDays);

    return averageListened;
}

// Quando é que o utilizador mais ouve música? (horas do dia)
export function getMostListenedHour() {
    const totalOcurPerMs = history.reduce((acc, e) => {
        let hourTrack = new Date(e["ts"]).getHours();
        let msTrack = e["ms_played"];
        return new Map([...acc, [hourTrack, (acc.get(hourTrack) ?? 0) + msTrack]]);
    }, new Map());

    for (const [key, value] of totalOcurPerMs.entries()) {
        if (value === Math.max(...totalOcurPerMs.values()));
            return key;
    }
}

// Quando é que o utilizador mais ouve música? (estações do ano)
function getSeason(month, day) {
    if ((month === 3 && day >= 21) || (month === 6 && day <= 20) || (month > 3 && month < 6)) {
        return "Spring";
    }
    else if ((month === 6 && day >= 21) || (month === 9 && day <= 20) || (month > 6 && month < 9)) {
        return "Summer";
    }
    else if ((month === 9 && day >= 21) || (month === 12 && day <= 20) || (month > 9 && month < 12)) {
        return "Autumn";
    }
    else {
        return "Winter";
    }
}

export function getMostListenedSeason() {
    const totalOcurPerSeason = history.reduce((acc, e) => {
        let season = getSeason(new Date(e["ts"]).getMonth(), new Date(e["ts"]).getDate());
        return new Map([...acc, [season, (acc.get(season) ?? 0) + 1]]);
    }, new Map())

    for (const [key, value] of totalOcurPerSeason.entries()) {
        if (value === Math.max(...totalOcurPerSeason.values()))
            return key;
    }
}

// Filtra dados das últimas 4 semanas.
export function filterFourWeeks() {
    return history.filter(e => moment().subtract(4, "week").isBefore(moment(e.ts)))
}

// Filtra dados dos últimos 6 meses.
export function filterSixMonths() {
    return history.filter(e => moment().subtract(6, "months").isBefore(moment(e.ts)))
}

// Filtra dados do último ano.
export function filterLastYear() {
    return history.filter(e => moment().subtract(1, "year").isBefore(moment(e.ts)))
}


// [D] Ver uma lista com top 100 artistas ordenadas por quantidade de plays.
export function getTopArtists(historyData) {
    let mapa = new Map([]);

    for (let i = 0; i < historyData.length; i++) {
        const play = historyData[i];
        const artist = play["master_metadata_album_artist_name"];
        if (artist !== null){
            mapa.set(artist, (mapa.get(artist) ?? 0) + 1);
        }
    }

    return [...mapa.entries()].toSorted((a, b) => b[1] - a[1]).slice(0, 100);
}

// [D] Ver uma lista com top 100 músicas ordenadas por millisegundos em plays.
export function getTopSongs(historyData) {
    let mapa = new Map([]);

    for (let i = 0; i < historyData.length; i++) {
        const play = historyData[i];
        const song = play["master_metadata_track_name"];
        const minPlayed = Math.round(play["ms_played"]/60000);
        const artist = play["master_metadata_album_artist_name"];

        if (song !== null){
            mapa.set(song, {
                songMsPlayed: (mapa.has(song) ? mapa.get(song).songMsPlayed : 0) + minPlayed,
                artist
            })
        }
    }

    return [...mapa.entries()].toSorted((a, b) => b[1]["songMsPlayed"] - a[1]["songMsPlayed"]).slice(0, 100);
}

// Filtrar informações de artista
export function filterArtistInfo(artist, data) {
    if (!data) {
        return history.filter(e => e["master_metadata_album_artist_name"] === artist)
    } else {
        return data.filter(e => e["master_metadata_album_artist_name"] === artist)
    }
}

// Ver quantas plays no total de um artista.
export function getTotalPlaysArtist(artist) {
    return filterArtistInfo(artist).length;
}

// Ver quantas músicas diferentes já foram ouvidas no total.
export function getTotalDifSongsArtist(artist){
    const infoArtist = filterArtistInfo(artist);
    const difSongs = new Set(infoArtist.map(e => e["master_metadata_track_name"]));
    return difSongs.size;
}

// Ver quantos minutos já se passou a ouvir.
export function getMinListenedArtist(artist) {
    const infoArtist = filterArtistInfo(artist);
    return Math.round(infoArtist.reduce((acc, e) => acc + e["ms_played"], 0) / (60 * 1000));
}

// Ver % das plays dentro do total (ex: Kendrick Lamar representa 1.7% das minhas plays)
export function getPercPlaysArtist(artist){
    return ((getTotalPlaysArtist(artist)/getTotalPlays()) * 100).toFixed(2);
}

// [D] Ver uma lista com top 20 músicas ordenadas por millisegundos em plays.
export function getTopSongsArtist(artist, data) {
    const artistInfo = filterArtistInfo(artist, data)
    let mapa = new Map([]);

        for (let i = 0; i < artistInfo.length; i++) {
            const play = artistInfo[i];
            const song = play["master_metadata_track_name"];
            const minPlayed = Math.round(play["ms_played"]/60000);
            const artist = play["master_metadata_album_artist_name"];

            if (song !== null){
                mapa.set(song, {
                    songMsPlayed: (mapa.has(song) ? mapa.get(song).songMsPlayed : 0) + minPlayed,
                    artist
                })
            }
        }

        return [...mapa.entries()].toSorted((a, b) => b[1]["songMsPlayed"] - a[1]["songMsPlayed"]).slice(0, 20);
}

// Filtra informações de artista sempre
export function filterArtistAlways(artist){
    return history.filter(e => e["master_metadata_album_artist_name"] === artist);
}

// Filtra informações de artista por 4 semanas
export function filterArtistFourWeeks(artist){
    return filterFourWeeks().filter(e => e["master_metadata_album_artist_name"] === artist);
}
// Filtra informações de artista por 6 meses
export function filterArtistSixMonths(artist){
    return filterSixMonths().filter(e => e["master_metadata_album_artist_name"] === artist);
}
// Filtra informações de artista último ano
export function filterArtistLastYear(artist){
    return filterLastYear().filter(e => e["master_metadata_album_artist_name"] === artist);
}

// Ver em posição está no top 100 artistas ("desde sempre")
export function getTopPositionArtist(artist){
    const position = getTopArtists(history).findIndex(e => e[0] === artist);

    return position === -1? "Não está no top 100" : position + 1;
}

// Quando é que o utilizador mais ouve o artista? (estações do ano)
export function getSeasonArtist(artist){

    const infoArtist = history.filter(e => e["master_metadata_album_artist_name"] === artist)
    const totalOcurPerSeason = infoArtist.reduce((acc, e) => {
        let season = getSeason(new Date(e["ts"]).getMonth(), new Date(e["ts"]).getDate());
        return new Map([...acc, [season, (acc.get(season) ?? 0) + 1]]);
    }, new Map())

    for (const [key, value] of totalOcurPerSeason.entries()) {
        if (value === Math.max(...totalOcurPerSeason.values()))
            return key;
    }
}