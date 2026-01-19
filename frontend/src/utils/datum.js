export const datumFuggveny = (datum) => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = new Date(datum);
    const options = { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('hu-HU', options).format(date);

    return formattedDate;
}