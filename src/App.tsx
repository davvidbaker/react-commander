import './App.css'
import Field from './components/Field'
import commands, { getItems } from './fixtures/commands';

function App() {

  return (
    <>
      <div>
        <Field availableCommands={commands} field={undefined} getItems={getItems} onFullyLoaded={console.log}/>
      </div>
    </>
  )
}

export default App
