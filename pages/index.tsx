import { BackspaceIcon } from '@heroicons/react/outline'
import { classNames } from 'lib/helpers'
import { words } from 'lib/wordList'
import _ from 'lodash'
import { useState, useEffect } from 'react'

enum LETTER_STATE {
  NOT_TRIED,
  CORRECT_LETTER,
  INCORRECT_LETTER,
  CORRECT_PLACE,
}
export default function Home() {
  const keyboard: {
    key: string
    state: LETTER_STATE
    level: number
  }[] = [
    { key: 'Q', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'W', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'E', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'R', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'T', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'Y', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'U', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'I', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'O', state: LETTER_STATE.NOT_TRIED, level: 1 },
    { key: 'P', state: LETTER_STATE.NOT_TRIED, level: 1 },

    { key: 'A', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'S', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'D', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'F', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'G', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'H', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'J', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'K', state: LETTER_STATE.NOT_TRIED, level: 2 },
    { key: 'L', state: LETTER_STATE.NOT_TRIED, level: 2 },

    { key: 'ENTER', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'Z', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'X', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'C', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'V', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'B', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'N', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'M', state: LETTER_STATE.NOT_TRIED, level: 3 },
    { key: 'DELETE', state: LETTER_STATE.NOT_TRIED, level: 3 },
  ]

  const [WORD] = useState(words[Math.floor(Math.random() * words.length)])
  const [currentKeyboard, setCurrentKeyboard] = useState(keyboard)
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

  useEffect(() => {
    //for dev purposes only
    console.log({ WORD })
  }, [])

  function addLetter(key: string): void {
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
      setTryNumber((tryNumber) => tryNumber + 1)

      const newBoard = [...board]
      const newKeyboard = [...currentKeyboard]

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

        const keyboardIndex = currentKeyboard.findIndex(
          (k) => k.key.toLowerCase() === newBoard[i].value.toLowerCase()
        )

        newKeyboard[keyboardIndex] = {
          ...newKeyboard[keyboardIndex],
          state,
        }

        setCurrentKeyboard(newKeyboard)
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
        <h1 className="text-4xl font-extrabold uppercase text-white">Mordle</h1>
      </header>

      <div className="flex flex-col items-start justify-between">
        {_.chunk(
          board
            .slice(0, currentWordIndex)
            .map(({ state }) =>
              state === LETTER_STATE.CORRECT_PLACE
                ? '🟩'
                : state === LETTER_STATE.CORRECT_LETTER
                ? '🟨'
                : '⬛'
            ),
          5
        ).map((x,i) => (
          <span key={i}>{x.join('')}</span>
        ))}
      </div>

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
        {_.values(_.groupBy(currentKeyboard, 'level')).map((row, i) => (
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
