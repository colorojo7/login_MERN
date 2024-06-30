import React from 'react'

const SupportedBrowsers = () => {
  return (
    <div className="border rounded-md border-slate-800 bg-green-100 p-2 my-2">

        <p className="text-center mb-3 font-bold">

        SUPORTED BROWSERS 
        </p>
        <ul className="flex flex-row justify-around">
          
          <li className="w-10"><img width={100} height={100} title="Chrome" alt="Chrome" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"/></li>
          <li className="w-10"><img width="100" height="100"  title="Firefox" alt="Firefox" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg"/></li>
          <li className="w-10"><img width="100" height="100" title="Brave" alt="Brave" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Brave_lion_icon.svg"/></li>
        </ul>
      </div>
  )
}

export default SupportedBrowsers