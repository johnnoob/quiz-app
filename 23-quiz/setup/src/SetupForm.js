import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { error, quiz, handleChange, handleSubmit } = useGlobalContext()
  return (
    <main>
      <section className="quiz quiz-small">
        <form action="" className="setup-form">
          <div className="form-control">
            <h2>setup quiz</h2>
            {/* amount */}
            <label htmlFor="amount">選擇問題數</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* category */}
          <div className="form-control">
            <label htmlFor="category">選擇問題類型</label>
            <select
              name="category"
              id="category"
              className="form-input"
              onChange={handleChange}
              value={quiz.category}
            >
              <option value="sports">體育</option>
              <option value="history">歷史</option>
              <option value="politics">政治</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">選擇難度</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              onChange={handleChange}
              value={quiz.difficulty}
            >
              <option value="easy">簡單</option>
              <option value="medium">中等</option>
              <option value="hard">困難</option>
            </select>
          </div>

          {error.show && (
            <p className="error">無法產生問題，請選擇其他問題選項</p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            開始
          </button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
