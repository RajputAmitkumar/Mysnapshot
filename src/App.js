import { useEffect, useRef, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const searchData = useRef(null)
  const [searchText, setSearchText] = useState('mountains')
  const [imageData, setImageData] = useState([])
  useEffect(() => {

    const params = {
      method: 'flickr.photos.search',
      api_key: '4920d11fa0fe4ccc86f3ff83becb2db9',
      text: searchText,
      sort: '',
      per_page: 40,
      license: '4',
      extras: 'owner-name, ;license',
      format: 'json',
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`

    axios.get(url).then((resp) => {
      const arr = resp.data.photos.photo.map((imgData) => {
        return fetchFlickrImageUrl(imgData, 'q')
      })
      setImageData(arr)
      // console.log(arr)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {

    })
  }, [searchText])

  const fetchFlickrImageUrl = ((photo, size) => {

    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`
    }

    url += '.jpg'
    return url
  })
  return (
    <>
      <input onChange={(e) => { searchData.current = e.target.value; console.log(searchData.current) }}></input>
      <button onClick={() => { setSearchText(searchData.current) }}>search</button>
      <div>

        <button onClick={() => { setSearchText('mountains') }}>Mountain</button>
        <button onClick={() => { setSearchText('beaches') }}>beaches</button>
        <button onClick={() => { setSearchText('birds') }}>birds</button>
        <button onClick={() => { setSearchText('food') }}>food</button>
      </div>
      <div >
        <div className="image-container" >{imageData.map((imageurl, key) => {
          return (
            <div>
            <img src={imageurl} key= {key}></img>
              </div>
              )
        })}</div>
      </div>

      </>
      );
}

      export default App;
