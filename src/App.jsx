import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { encrypt, decrypt, splitIntoChunk } from './function'
import React from 'react'

function App() {
  const [OutputText, setOutputText] = useState("");
  const [Mode, chooseMode] = useState("enkripsi");

  const goSubmit = (e) => {
    e.preventDefault();
    let inputPlainCipher = String(e.target.input1.value);
    let shiftKey = parseInt(e.target.input2.value);

    let hasil;
    if(Mode == "enkripsi") {
      hasil = encrypt(inputPlainCipher, shiftKey);
    } else if(Mode == "dekripsi") {
      hasil = decrypt(inputPlainCipher, shiftKey);
    }
    setOutputText(hasil);
  };

  return (
    <div className="container mt-5 p-3 prose rounded-md bg-yellow-100">
      <h1 className="hero-content pt-0 m-0 text-center">Shift-Spiral Encoder/Decoder</h1>
      <div className="bg-white rounded-md">
        <h2 className="text-center pt-3 m-0">Input:</h2>
        <form onSubmit={goSubmit}>
          <div className="flex flex-row justify-center gap-20">
            <div>
              <label className="label">Plaintext/Ciphertext&nbsp;</label>
              <input
                name="input1"
                type="text"
                placeholder="Masukkan Text"
                className="input input-bordered"
              ></input>
            </div>

            <div>
              <label className="label">Shift Key&nbsp;</label>
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
                <span className="label-text">Encrypt&nbsp;</span>
                <input
                  type="radio"
                  name="mode"
                  checked={Mode === "enkripsi"}
                  value="enkripsi"
                  className="radio checked:bg-blue-500"
                  onChange={(e) => {
                    chooseMode(e.target.value);
                  }}
                />
              </label>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Decrypt&nbsp;</span>
                <input
                  type="radio"
                  name="mode"
                  checked={Mode === "dekripsi"}
                  value="dekripsi"
                  className="radio checked:bg-blue-500"
                  onChange={(e) => {
                    chooseMode(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row mb-5 p-2 gap-10 justify-center">
            <button
              type="submit"
              className="btn btn-secondary w-32 rounded-full bg-green-200"
            >
              Submit
            </button>
            <button type="reset" onClick={() => {chooseMode('enkripsi')}} className="btn btn-error w-32 rounded-full bg-red-200">
              Reset
            </button>
          </div>
        </form>
        <h2 className="flex flex-row mb-5 p-2 gap-10 justify-center">Hasil: {OutputText}</h2>
      </div>
      {/* <KeyGeneration  /> */}
    </div>
  );
}

export default App
