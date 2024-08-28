
export const Square = ({children, index, updateBoard, isSelected}) => {

    const classNameSquare = `square ${isSelected ? 'is-selected' : ' '}`
  
      const handleClick = () => {
        updateBoard(index)
      }
  
    return (
      <div className={classNameSquare} onClick={handleClick}>
        {children}
      </div>
    )
  }