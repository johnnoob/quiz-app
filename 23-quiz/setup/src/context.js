import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState({ show: false, msg: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'medium',
  })
  // const url = `https://opentdb.com/api.php?amount=${quiz.amount}&category=${
  //   table[quiz.category]
  // }&difficulty=${quiz.difficulty}&type=multiple`

  const fetchQuestions = async (url) => {
    setWaiting(false)
    setLoading(true)
    try {
      const response = await axios(url)
      if (response) {
        const data = response.data
        console.log(data)
        if (data.results.length > 0) {
          setQuestions(data.results)
          setLoading(false)
          setWaiting(false)
          setError({ show: false, msg: '' })
        } else {
          setWaiting(true)
          setError({ show: true, msg: '' })
        }
      } else {
        setWaiting(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz((prevQuiz) => {
      return { ...prevQuiz, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    fetchQuestions(url)
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
