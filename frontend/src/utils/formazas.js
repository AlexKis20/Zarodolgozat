export const datumFuggveny = (datum) => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = new Date(datum);
    const options = { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('hu-HU', options).format(date);

    return formattedDate;
}

export const telefonszamFuggveny = (telefonszam) => {
    if (!telefonszam || /\p{L}/u.test(telefonszam)) return '-';
    
    // Csak számjegyek megtartása
    let cleaned = telefonszam.replace(/\D/g, '');
    let plus = telefonszam.startsWith('+') ? '+' : '';
    
    // Hátulról számolva: utolsó 2, előtte 2, előtte 3, és az eleje
    const last2 = cleaned.substring(cleaned.length-2, cleaned.length);
    const prev2 = cleaned.substring(cleaned.length-4, cleaned.length-2)
    const prev3 = cleaned.substring(cleaned.length-7, cleaned.length-4);
    const beginning = cleaned.substring(0, cleaned.length-7);
    
    // Az elejet 2-es csoportokra osztjuk
    const orszagkod = beginning.substring(0, 2);
    const korzetszam = beginning.substring(2);
    
    return `${plus}${orszagkod} ${korzetszam} ${prev3} ${prev2} ${last2}`;
}

export const arFuggveny = (ar) => {
    if (ar === null || ar === undefined || ar === '') return '';
    
    // Szám stringgé alakítása és ezres tagolásonként szóközzel tagolása
    return ar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}