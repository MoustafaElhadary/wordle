import { BackspaceIcon } from '@heroicons/react/outline'
import { classNames } from 'lib/helpers'
import { useState } from 'react'

const WORD = 'REACT'
enum LETTER_STATE {
  NOT_TRIED,
  CORRECT_LETTER,
  INCORRECT_LETTER,
  CORRECT_PLACE,
}
export default function Home() {
  const qwerty: {
    key: string
    state: LETTER_STATE
  }[][] = [
    [
      { key: 'Q', state: LETTER_STATE.CORRECT_LETTER },
      { key: 'W', state: LETTER_STATE.CORRECT_PLACE },
      { key: 'E', state: LETTER_STATE.NOT_TRIED },
      { key: 'R', state: LETTER_STATE.NOT_TRIED },
      { key: 'T', state: LETTER_STATE.NOT_TRIED },
      { key: 'Y', state: LETTER_STATE.NOT_TRIED },
      { key: 'U', state: LETTER_STATE.NOT_TRIED },
      { key: 'I', state: LETTER_STATE.NOT_TRIED },
      { key: 'O', state: LETTER_STATE.NOT_TRIED },
      { key: 'P', state: LETTER_STATE.NOT_TRIED },
    ],
    [
      { key: 'A', state: LETTER_STATE.NOT_TRIED },
      { key: 'S', state: LETTER_STATE.NOT_TRIED },
      { key: 'D', state: LETTER_STATE.NOT_TRIED },
      { key: 'F', state: LETTER_STATE.NOT_TRIED },
      { key: 'G', state: LETTER_STATE.NOT_TRIED },
      { key: 'H', state: LETTER_STATE.NOT_TRIED },
      { key: 'J', state: LETTER_STATE.NOT_TRIED },
      { key: 'K', state: LETTER_STATE.NOT_TRIED },
      { key: 'L', state: LETTER_STATE.NOT_TRIED },
    ],
    [
      { key: 'ENTER', state: LETTER_STATE.NOT_TRIED },
      { key: 'Z', state: LETTER_STATE.NOT_TRIED },
      { key: 'X', state: LETTER_STATE.NOT_TRIED },
      { key: 'C', state: LETTER_STATE.NOT_TRIED },
      { key: 'V', state: LETTER_STATE.NOT_TRIED },
      { key: 'B', state: LETTER_STATE.NOT_TRIED },
      { key: 'N', state: LETTER_STATE.NOT_TRIED },
      { key: 'M', state: LETTER_STATE.NOT_TRIED },
      { key: 'DELETE', state: LETTER_STATE.NOT_TRIED },
    ],
  ]

  const [currentKeyboard, setCurrentKeyboard] = useState(qwerty)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [tryNumber, setTryNumber] = useState(1)
  const [board, setBoard] = useState<
    Array<{
      value: string
      state: LETTER_STATE
      animate: boolean
    }>
  >(
    Array.from({ length: 30 }, (_, i) => i + 1).map((_) => ({
      value: '',
      state: LETTER_STATE.NOT_TRIED,
      animate: false,
    }))
  )

  function addLetter(key: string): void {
    console.log({ currentWordIndex, tryNumber })
    if (
      tryNumber * 5 > currentWordIndex &&
      (tryNumber - 1) * 5 <= currentWordIndex
    ) {
      const newBoard = [...board]
      newBoard[currentWordIndex] = {
        ...newBoard[currentWordIndex],
        value: key,
      }
      setBoard(newBoard)
      setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1)
    }
  }

  function enterPressed(): void {
    const word = board
      .slice((tryNumber - 1) * 5, tryNumber * 5)
      .map(({ value }) => value)
      .join('')

    if (word.length === WORD.length) {
      console.log({ word })
      setTryNumber((tryNumber) => tryNumber + 1)

      const newBoard = [...board]
      for (let i = (tryNumber - 1) * 5; i < tryNumber * 5; i++) {
        const index = i % 5
        let state = LETTER_STATE.INCORRECT_LETTER
        state = WORD.toLowerCase().includes(board[i].value.toLowerCase())
          ? LETTER_STATE.CORRECT_LETTER
          : state
        state =
          WORD[index].toLowerCase() === newBoard[i].value.toLowerCase()
            ? LETTER_STATE.CORRECT_PLACE
            : state

        newBoard[i] = {
          ...newBoard[i],
          state,
        }

        setBoard(newBoard)
      }
    }
  }

  function backspacePressed(): void {
    if (
      tryNumber * 5 >= currentWordIndex &&
      (tryNumber - 1) * 5 <= currentWordIndex
    ) {
      const newBoard = [...board]
      let idx = currentWordIndex

      console.log({ idx, b: newBoard[idx] })
      if (newBoard[idx].value === '' && idx > 0) {
        idx--
      }
      newBoard[idx] = {
        ...newBoard[idx],
        value: '',
      }
      setBoard(newBoard)
      setCurrentWordIndex(idx)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-neutral-900 py-2">
      <header className=" border-b-2 border-b-slate-200">
        <h1 className="text-4xl font-extrabold uppercase text-white">Wordle</h1>
      </header>

      <div className="grid grid-cols-5 grid-rows-6 gap-2">
        {board.map(({ value, state }, i) => (
          <div
            key={i}
            className={classNames(
              state === LETTER_STATE.CORRECT_LETTER ? 'bg-yellow-600' : '',
              state === LETTER_STATE.INCORRECT_LETTER ? 'bg-neutral-700' : '',
              state === LETTER_STATE.CORRECT_PLACE ? 'bg-green-700' : '',
              'flex h-16 w-16 items-center justify-center border-2 border-zinc-700 text-4xl font-extrabold '
            )}
          >
            <span className="text-2xl text-white">{value}</span>
          </div>
        ))}
      </div>

      <div id="keyboard">
        {currentKeyboard.map((row, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-center py-1"
          >
            {row.map(({ key, state }, j) => (
              <div
                key={j}
                onClick={() => {
                  if (key === 'ENTER') {
                    enterPressed()
                  } else if (key === 'DELETE') {
                    backspacePressed()
                  } else {
                    addLetter(key)
                  }
                }}
                className={classNames(
                  state === LETTER_STATE.NOT_TRIED ? 'bg-zinc-500' : '',
                  state === LETTER_STATE.CORRECT_LETTER ? 'bg-yellow-600' : '',
                  state === LETTER_STATE.INCORRECT_LETTER
                    ? 'bg-neutral-700'
                    : '',
                  state === LETTER_STATE.CORRECT_PLACE ? 'bg-green-700' : '',
                  'mx-1 flex cursor-pointer items-center justify-center  rounded-md px-2 py-3 text-base font-medium md:px-5 md:py-5'
                )}
              >
                {key === 'DELETE' ? (
                  <BackspaceIcon className="h-6 w-9 cursor-pointer text-white" />
                ) : (
                  <span className=" text-white">{key}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
