const Rendezes = ({ adatok, setKeresettAdatok, children}) => {

    const rendezes = (targetValue) => {
        let val = targetValue.split("|")
        let mezo = val[0]
        let rendezesTipus = val[1]
        let rendezettAdatok = [...adatok]
        if (rendezesTipus === "1") {
            rendezettAdatok.sort((a, b) => {
                let aString = a[mezo].toString();
                let bString = b[mezo].toString();
                return aString.localeCompare(bString);
            });
        } else if (rendezesTipus === "2") {
            rendezettAdatok.sort((a, b) => {
                let aString = a[mezo].toString();
                let bString = b[mezo].toString();
                return bString.localeCompare(aString);
            });
        }
        setKeresettAdatok(rendezettAdatok)
    }

    return (
        <>
            <div className="sort">
                <select className="form-select" style={{margin: "5px"}} onChange={(e) => rendezes(e.target.value)}>
                    {children}
                </select>
            </div>
        </>
    );
};

export default Rendezes