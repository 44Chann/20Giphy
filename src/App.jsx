import logo from './logo.svg';
import './App.css';
import { TwitterShareButton } from 'react-share';
import { AiFillTwitterCircle } from "react-icons/ai";

import { useEffect, useState } from "react"

function App() {
  const apiKey = "hkNH4RGozWfBzqAVVpVdJbBHT9x7B58n"
  const [giphys, setgiphys] = useState([]);
  const [search, serSearch] = useState("trending");
  const [onsearch, setOnsearch] = useState(false)
  const [isloading, setisloading] = useState(false)


  useEffect(() => {
    (
      async () => {
        setisloading(true)
        if (search === "" || search === " ") {
          serSearch("trending")
        }
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?&q=${search}&limit=100&api_key=${apiKey}`)
        const data = await response.json()
        setgiphys(data.data)
        console.log(search)
        console.log(data)
        setisloading(false)
      }

    )()
  }, [onsearch])


  return (
    <div className="text-center m-auto container text-white">
      <h1 className=' my-8 text-4xl'>20 Giphy</h1>

      <div className='w-full px-2  flex justify-center border-purple-300 border-[1px] rounded-full'>
        <input type="text" onChange={(e) => serSearch(e.target.value)} className=' flex-1 rounded-2xl py-3   text-white bg-transparent outline-none bg-blend-saturation' placeholder='type to searcch' />
        <button className='mr-8' onClick={() => setOnsearch(!onsearch)}>Search</button>
      </div>

      {isloading ? <div>
        <h1>Loading.....</h1>
      </div> :
        <div className='w-full h-full '>
          <div>
            <h2 className='mx-6 my-4 text-left'>Results for {search}</h2>
            <p className='flex items-center mx-6 my-4'>Click <AiFillTwitterCircle size={25} className='mx-2' /> to share on twitter </p>
          </div>
          <div className='w-full h-full flex justify-center flex-wrap'>
            {giphys.map((gif) => {
              const url = gif.images.fixed_height.url;
              return <>
                <div className='relative'>
                  < img className='w-full sm:w-auto object-fill my-4 mx-3' src={url} alt="img" />
                  <div className='absolute top-3 right-2 bg-black flex items-center  rounded-full '>

                    <TwitterShareButton className='' url={url}><AiFillTwitterCircle size={35} /></TwitterShareButton>
                  </div>
                </div>
              </>
            })}

          </div>
        </div>

      }
    </div>
  )
}

export default App;
