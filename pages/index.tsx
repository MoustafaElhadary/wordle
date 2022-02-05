import { BackspaceIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export default function Home() {
  //array of qwerty items
  enum LETTER_STATE {
    NOT_TRIED,
    CORRECT_LETTER,
    INCORRECT_LETTER,
    CORRECT_PLACE,
  }
  const qwerty = [
    [
      { key: 'Q', state: LETTER_STATE.NOT_TRIED },
      { key: 'W', state: LETTER_STATE.CORRECT_PLACE },
      { key: 'E', state: LETTER_STATE.INCORRECT_LETTER },
      { key: 'R', state: LETTER_STATE.CORRECT_PLACE },
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-neutral-900 py-2">
      <header className=" border-b-2 border-b-slate-200">
        <h1 className="text-4xl font-extrabold uppercase text-white">Wordle</h1>
      </header>
      <div className="grid grid-cols-5 grid-rows-6 gap-2">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => (
          <div
            key={i}
            className="flex h-16 w-16 cursor-pointer items-center justify-center border-2 border-zinc-700 text-4xl font-extrabold"
          >
            <span className="text-2xl text-white">{i}</span>
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
                onClick={() => console.log(key)}
                className="mx-1 flex cursor-pointer items-center justify-center rounded-md bg-zinc-500 px-2 py-2 text-base font-medium md:px-5 md:py-5"
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
