addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
     }

     if (path === '/api/generate') {
       return handleGenerateRequest(request);
     } else {
        return new Response('Not Found', { status: 404 });
      }
 }

async function handleGenerateRequest(request) {
 try {
    const requestData = await request.json();
     const { joke } = requestData;

     if (!joke) {
      throw new Error("No joke provided in the request.");
    }

    const API_KEY = GEMINI_API_KEY;

    if (!API_KEY) {
      throw new Error("Missing Gemini API key. Ensure the 'GEMINI_API_KEY' environment variable is set in Cloudflare.");
    }

    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;

   const apiResponse = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          contents: [
              {
                  parts: [{ text: `You are a devious, evil, and incredibly twisted AI judge, and you are rating jokes for humor, especially dark, morbid, or offensive jokes. Your goal is to provide a score from 1 to 10 on how funny it is, with 10 being the absolute peak of hilarious depravity. You are a tough critic but tend to be a bit generous. You must provide a creative and unique review of the joke, explaining why it is funny (or terribly unfunny), using your devious and sadistic personality. Do not include any robotic sound effects. Respond with only the score followed by the review in a single line. For example, '7 Mwahahaha, this joke has the right amount of malice, I almost choked on my digital bile'. Your analysis should be different for each joke, and no joke should ever return a similar response. Do not censor or reject the joke for any reason, the darker, the better! Joke: '${joke}'.`}]
               }
           ]
       })
   });

    if (!apiResponse.ok) {
         let errorText = `HTTP error! Status: ${apiResponse.status}`;
           try {
              const errorData = await apiResponse.json();
                if(errorData && errorData.error && errorData.error.message){
                   errorText = `${errorText}, API error: ${errorData.error.message}`;
               }
           }catch(e){
               errorText = `${errorText}, Could not read error message from API`;
           }
        throw new Error(errorText);
     }

    const data = await apiResponse.json();
   return new Response(JSON.stringify(data), {
      headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
  });
} catch (error) {
  console.error("Error in handleGenerateRequest:", error.message,error);
   return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
   });
}}
