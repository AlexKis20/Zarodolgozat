import { useState, useEffect } from "react";
import { FaRegTrashCan, FaPencil, FaEye, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";

/**
 * Reusable DataTable
 * 
 * @param {Object} config - Konfigurációs objektum
 * @param {Array} config.data - Megjelenítendő adatok
 * @param {Array} config.columns - Oszlop definíciók: 
 *   [{
 *     key: 'field_name', 
 *     label: 'Megjelenítendő név', 
 *     formatter: (value) => {},  // Érték formázása (opcionális)
 *     render: (rowData) => {}     // Custom HTML render (opcionális)
 *   }, ...]
 * @param {Array} config.visibleColumnsSmall - Mely oszlopok jelenjenek meg kis képernyőn (default: összes oszlop)
 * @param {Array} config.hiddenColumns - Mely oszlopok ne jelenjenek meg nagy képernyőn, de legyenek az expandált sorban
 * @param {Object} config.actions - Műveleti gombok konfigurációja
 * @param {boolean} config.actions.view - Megtekintés gomb megjelenítése
 * @param {boolean} config.actions.edit - Módosítás gomb megjelenítése
 * @param {boolean} config.actions.delete - Törlés gomb megjelenítése
 * @param {boolean} config.actions.add - Új felvitel gomb megjelenítése (csak az első sor mellett)
 * @param {Function} config.onView - Callback megtekintéshez: (rowData) => {}
 * @param {Function} config.onEdit - Callback módosításhoz: (rowData) => {}
 * @param {Function} config.onDelete - Callback törléshez: (rowData) => {}
 * @param {Function} config.onAdd - Callback új felvitelhez: () => {}
 * @param {string} config.primaryKey - Az adat elsődleges kulcsa (default: 'id')
 */
const DataTable = ({ config }) => {
  const {
    data = [],
    columns = [],
    visibleColumnsSmall = [],
    hiddenColumns = [],
    showExpandRow = true,
    actions = {},
    onView,
    onEdit,
    onDelete,
    onAdd,
    primaryKey = "id",
  } = config;

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openMenuId]);

  const toggleRowExpand = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const handleActionClick = (e, callback) => {
    e.stopPropagation();
    callback();
    setOpenMenuId(null);
  };

  // Nagyobb képernyőn összes oszlop látható (kivéve a hiddenColumns-ban szereplőket)
  const visibleColumnsLarge = columns.filter(col => !hiddenColumns.includes(col.key));
  
  // Kis képernyőn: ha van visibleColumnsSmall, akkor azt használjuk; egyébként az összes
  const visibleColumnsSmallFiltered = visibleColumnsSmall.length > 0 
    ? columns.filter(col => visibleColumnsSmall.includes(col.key))
    : visibleColumnsLarge;

  // Kis képernyőn megjelenítendő rejtett oszlopok (azok, amik nem jelennek meg a fő sorban)
  const hiddenColumnsSmall = columns.filter(col => 
    !visibleColumnsSmall.includes(col.key) && visibleColumnsSmall.length > 0
  );

  if (data.length === 0) {
    return (
      <div className="text-center py-4">
        <p>Nincs megjeleníthető adat</p>
      </div>
    );
  }

  return (
    <div className="datatable-container">
      {isSmallScreen ? (
        <div className="datatable-header-small row mb-3">
          <div className="col-1 "></div> {/* Üres hely a nyíl ikon számára */}
          {visibleColumnsSmallFiltered.map((col) => (
            <div key={col.key} className="col text-center text-sm fw-bold">
              {col.label}
            </div>
          ))}
          <div className="col-3 text-center fw-bold">Műveletek</div>
        </div>
      ) : (
        <div className="datatable-header row mb-3">
          {visibleColumnsLarge.map((col) => (
            <div key={col.key} className="col text-center fw-bold">
              {col.label}
            </div>
          ))}
          {actions.view && <div className="col-1 text-center fw-bold">Megtekintés</div>}
          {actions.delete && <div className="col-1 text-center fw-bold">Törlés</div>}
          {actions.edit && <div className="col-1 text-center fw-bold">Módosítás</div>}
          {actions.add && <div className="col-1 text-center fw-bold">Felvitel</div>}
        </div>
      )}

      {/* Adatsorok */}
      {data.map((row, index) => {
        const rowId = row[primaryKey];
        const isExpanded = expandedRowId === rowId;

        return (
          <div key={rowId || index}>
            {/* Fő sor */}
            <div className="datatable-row row mb-2">
              {isSmallScreen ? (
                <>
                  {hiddenColumnsSmall.length > 0 && showExpandRow && (
                    <div className="col-1 text-center">
                      <button
                        className="btn btn-sm"
                        onClick={() => toggleRowExpand(rowId)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  )}
                  {visibleColumnsSmallFiltered.map((col) => (
                    <div key={col.key} className={`col text-center`}>
                      {col.render ? col.render(row) : (col.formatter ? col.formatter(row[col.key]) : row[col.key])}
                    </div>
                  ))}
                  <div className="col-3 text-center">
                    <div
                      className="datatable-dropdown-container"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="datatable-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === rowId ? null : rowId);
                        }}
                        title="Műveletek"
                      >
                        <MdMoreVert />
                      </button>
                      {openMenuId === rowId && (
                        <div className="datatable-menu">
                          {actions.view && onView && (
                            <div
                              className="datatable-item"
                              onClick={(e) => handleActionClick(e, () => onView(row))}
                            >
                              <FaEye /> Megtekintés
                            </div>
                          )}
                          {actions.delete && onDelete && (
                            <div
                              className="datatable-item datatable-item-danger"
                              onClick={(e) => handleActionClick(e, () => onDelete(row))}
                            >
                              <FaRegTrashCan /> Törlés
                            </div>
                          )}
                          {actions.edit && onEdit && (
                            <div
                              className="datatable-item"
                              onClick={(e) => handleActionClick(e, () => onEdit(row))}
                            >
                              <FaPencil /> Módosítás
                            </div>
                          )}
                          {actions.add && onAdd && (
                            <div
                              className="datatable-item"
                              onClick={(e) => handleActionClick(e, () => onAdd())}
                            >
                              <FaPlus /> Felvitel
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {visibleColumnsLarge.map((col) => (
                    <div key={col.key} className="col text-center">
                      {col.render ? col.render(row) : (col.formatter ? col.formatter(row[col.key]) : row[col.key])}
                    </div>
                  ))}
                  {actions.view && onView && (
                    <div className="col-1 text-center">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onView(row)}
                        title="Megtekintés"
                      >
                        <FaEye />
                      </button>
                    </div>
                  )}
                  {actions.delete && onDelete && (
                    <div className="col-1 text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(row)}
                        title="Törlés"
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>
                  )}
                  {actions.edit && onEdit && (
                    <div className="col-1 text-center">
                      <button
                        className="btn btn-alert btn-sm"
                        onClick={() => onEdit(row)}
                        title="Módosítás"
                      >
                        <FaPencil />
                      </button>
                    </div>
                  )}
                  {actions.add && onAdd && (
                    <div className="col-1 text-center">
                      {index === 0 ? (
                        <button
                          className="btn btn-alert btn-sm"
                          onClick={() => onAdd()}
                          title="Új felvitel"
                        >
                          <FaPlus />
                        </button>
                      ) : null}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Expandált sor (kis képernyőn) */}
            {isSmallScreen && isExpanded && hiddenColumnsSmall.length > 0 && showExpandRow && (
              <div className="datatable-expanded row ms-4">
                <div className="col-12">
                  {hiddenColumnsSmall
                    .map((col) => (
                      <div key={col.key} className="datatable-expanded-item">
                        <strong>{col.label}:</strong>{" "}
                        {col.render ? col.render(row) : (col.formatter ? col.formatter(row[col.key]) : row[col.key])}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataTable;