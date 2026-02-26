const Kereses = ({ adatok, keresettMezok, setKeresettAdatok}) => {

    const kereses= (keresett) => {
        if (keresett.length === 0 || keresett === undefined) {
            setKeresettAdatok(adatok);
            return;
        } else {
            const szurtAdatok = adatok.filter((elem) => {
                let kivalasztott = false
                const keresettSzoveg = keresett.toLowerCase();
                keresettMezok.forEach(k => {
                    if (elem[k].toLowerCase().includes(keresettSzoveg)) {
                        kivalasztott = true
                        return;
                    }
                });
                return kivalasztott;
            })
            setKeresettAdatok(szurtAdatok);
        }
    }

    return (
        <>
            <div className="search">
                 <input type="text" className="form-control" placeholder="Keresés" onChange={(e) => kereses(e.target.value)} />
            </div>
        </>
    );
};

export default Kereses