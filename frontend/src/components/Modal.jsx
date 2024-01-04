

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div>
      {isOpen && (
        <div>
          <div>
            <button onClick={onClose}>X</button>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal