import Audio from "./components/Audio"
import signalToDb from "./utils/math/signalToDb"

function App() {
  console.log('signalToDb 0 -> ', signalToDb(0))
  console.log('signalToDb 0.5 -> ', signalToDb(0.5))
  console.log('signalToDb 1 -> ', signalToDb(1))
  return (
    <>
      <Audio />
    </>
  )
}

export default App
