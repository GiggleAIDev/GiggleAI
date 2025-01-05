# Giggle AI API

This repository contains the backend API code for Giggle AI, a web application that analyzes the humor of jokes using the Google Gemini API.

## Overview

The API is implemented as a Cloudflare Worker, which runs serverless logic on Cloudflare's edge network. It receives a joke as input, sends it to the Gemini API for analysis, and returns a humor score and a review of the joke.

## File Structure

*   **`src/worker.js`:** This is the core of the API. It contains all the logic for:
    *   Handling incoming requests.
    *   Communicating with the Google Gemini API.
    *   Returning JSON responses.
*   **`node_modules/`**: This is a generated folder for npm dependencies and is ignored by git.
*   **`package.json`**: Contains dependencies and some script info
*   **`package-lock.json`**: Lock file for npm dependencies
*   **`wrangler.toml`:** Cloudflare worker configuration. This file contains the project info to deploy to cloudflare
*   **`README.md`:** This file.

## Setup

### Prerequisites

*   A Cloudflare account.
*   The Cloudflare `wrangler` CLI installed on your machine ([https://developers.cloudflare.com/workers/wrangler/install-and-update/](https://developers.cloudflare.com/workers/wrangler/install-and-update/)).
*   Node.js and npm installed.
*   A Google Gemini API key.

### Steps

1.  **Clone this repository:**

    ```bash
    git clone <repository_url>
    cd giggle-ai-api
    ```

2.  **Install dependencies:**
       ```bash
      npm install
      ```

3.  **Set Up `wrangler.toml`:**

    *   Copy the example from `wrangler.example.toml` and rename it to `wrangler.toml`
    *   Fill in the required fields.

4. **Create `.dev.vars` and `.prod.vars` and add `GEMINI_API_KEY`:
  * Create `.dev.vars` file and add `GEMINI_API_KEY="YOUR API KEY"`.
  * Create `.prod.vars` file and add `GEMINI_API_KEY="YOUR API KEY"`.

5.  **Set the Gemini API Key:**

    *   You need to create a Google Gemini API key and set it as a secret variable using the wrangler CLI. Follow Cloudflare instructions to do that. Or create a `.dev.vars` and `.prod.vars` with `GEMINI_API_KEY = YOUR_API_KEY`.


6.  **Deploy the Cloudflare Worker:**

    ```bash
    wrangler deploy
    ```

## API Endpoint

*   **Method:** `POST`
*   **URL:** `<your_worker_url>/api/generate`
*   **Request Body (JSON):**

    ```json
    {
      "joke": "Your joke text here."
    }
    ```

*   **Response (JSON):**

    ```json
    {
     "candidates":[
       {
         "content": {
           "parts":[
             {
               "text":"7 Mwahahaha, this joke has the right amount of malice, I almost choked on my digital bile"
             }
           ]
          }
        }
      ]
   }
    ```

## Customization

*   Modify `src/worker.js` to customize the prompt, response formatting, error handling, etc.
*   Modify `wrangler.toml` to customize your worker's deployment settings.

## Contributing

Contributions are welcome! If you have any improvements, suggestions, or find bugs, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License.
