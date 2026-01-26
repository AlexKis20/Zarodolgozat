import './Modal.css';

const Modal = ({ isOpen, onClose, children, isWide}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className={isWide ? "modal-content-wide" : "modal-content"} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
