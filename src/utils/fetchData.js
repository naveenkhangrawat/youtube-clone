const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };


export async function fetchData(url) {
    const response = await fetch(`https://youtube138.p.rapidapi.com/${url}hl=en&gl=US`, options);
    const data = await response.json();
    return data;
}