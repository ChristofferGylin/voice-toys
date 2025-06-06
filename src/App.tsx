import Audio from "./components/Audio"
import { logCurve } from "./utils/math/logCurve"

function App() {
  console.log('logCurve 0 -> ', logCurve(0))
  console.log('logCurve 1 -> ', logCurve(1))
  console.log('logCurve 10 -> ', logCurve(10))
  return (
    <>
      <Audio />
    </>
  )
}

export default App
