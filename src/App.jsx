import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { encrypt, decrypt, splitIntoChunk } from './function'

function App() {
  const [OutputText, setOutputText] = useState("");
  const [Mode, setMode] = useState("ENCRYPT");

  const runSDES = (e) => {
    e.preventDefault();
    let inputText = String(e.target.input1.value);
    let masterKey = parseInt(e.target.input2.value);

    let finalPerm;
    if(Mode == "ENCRYPT") {
      finalPerm = encrypt(inputText, masterKey);
    } else if(Mode == "DECRYPT") {
      finalPerm = decrypt(inputText, masterKey);
    }
    setOutputText(finalPerm);
  };

  return (
    <div className="container mt-5 p-3 prose rounded-md bg-violet-200">
      <h1 className="hero-content pt-0 m-0 text-center">Shift-Spiral Encoder/Decoder</h1>
      <div className="bg-white rounded-md">
        <h2 className="text-center pt-3 m-0">Input:</h2>
        <form onSubmit={runSDES}>
          <div className="flex flex-row justify-center gap-20">
            <div>
              <label className="label">Plaintext/Ciphertext</label>
              <input
                name="input1"
                type="text"
                placeholder="Masukkan Text"
                className="input input-bordered"
              ></input>
            </div>

            <div>
              <label className="label">Shift Key</label>
              <input
                name="input2"
                type="text"
                placeholder="Masukkan angka"
                className="input input-bordered"
              ></input>
            </div>
          </div>
          <div className="flex flex-row m-2 p-2 justify-center">
            <div>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Encrypt</span>
                <input
                  type="radio"
                  name="mode"
                  checked={Mode === "ENCRYPT"}
                  value="ENCRYPT"
                  className="radio checked:bg-blue-500"
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Decrypt</span>
                <input
                  type="radio"
                  name="mode"
                  checked={Mode === "DECRYPT"}
                  value="DECRYPT"
                  className="radio checked:bg-blue-500"
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row mb-5 p-2 gap-10 justify-center">
            <button
              type="submit"
              className="btn btn-secondary w-32 rounded-full"
            >
              Submit
            </button>
            <button type="reset" onClick={() => {setMode('ENCRYPT')}} className="btn btn-error w-32 rounded-full">
              Reset
            </button>
          </div>
        </form>
        <h2>Hasil: {OutputText}</h2>
      </div>
      {/* <KeyGeneration  /> */}
    </div>
  );
}

export default App
