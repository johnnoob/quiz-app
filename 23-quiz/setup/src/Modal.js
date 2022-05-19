import React, { useState, useEffect } from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { isModalOpen, closeModal, questions, correct } = useGlobalContext()
  // const CorrectPercent = (questions, correct) => {
  //   return Math.ceil(Math.round(correct / questions)) * 100
  // }
  const [correctPercent, setCorrectPercent] = useState(0)
  useEffect(() => {
    setCorrectPercent(((correct / questions.length) * 100).toFixed(0))
  }, [correct, questions])
  return (
    <div className={`modal-container ${isModalOpen && 'isOpen'}`}>
      <div className="modal-content">
        <h2>恭喜！</h2>
        <p>你回答對了{correctPercent + '%'}的問題</p>
        <button className="close-btn" onClick={closeModal}>
          再玩1次！
        </button>
      </div>
    </div>
  )
}

export default Modal
