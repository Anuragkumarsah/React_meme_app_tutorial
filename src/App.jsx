import { useEffect, useState, useRef } from "react";

function App() {
  const [image_url, setImageUrl] = useState();
  const image_title = useRef()
  const Url = 'https://meme-api.com/gimme/wholesomememes'


  const fetch_meme = async() => {

    const response = await fetch(Url);
    const data = await response.json();
    image_title.current = data.title;
    setImageUrl(data.url);

    // fetch(URL).then((res) => {
    //   return res.json();
    // }).then((data) =>{
        // image_title.current = data.title;
        // setImageUrl(data.url);
    //     console.log(data.url);
    // });
  }

  const handleDownload = async() => {
    // fetch(image_url).then((res) =>{
    //   return res.blob()
    // }).then()
    const response = await fetch(image_url);
    const blob_file = await response.blob();
    const tempURL = URL.createObjectURL(blob_file);
    console.log(tempURL);
    const link = document.createElement("a");
    link.href = tempURL;
    link.download = image_title.current;
    link.click();
    window.URL.revokeObjectURL(tempURL);
    link.remove();
  }

  useEffect(() =>{
    fetch_meme();
  }, [])

  return (
    <div className="App">
      <p>{image_title.current}</p>
      <img style={{height: '200px'}} src={image_url} alt='meme' />
      <button onClick={fetch_meme}>Next</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  )
}

export default App
