# cw-gram.js
[Cloudflare workers](https://workers.cloudflare.com/) script that allows you to send messages to a specific telegram account via an api request. Made for the contact form in [my portfolio](https://github.com/Itz-fork/Sveltefolio). Inspired by [@tuhinpal/Contact-Form](https://github.com/tuhinpal/Contact-Form)

## Usage
- Create an account at [Cloudflare workers](https://dash.cloudflare.com/sign-up/workers)
- Create a cloudflare worker
    ![create-worker](https://user-images.githubusercontent.com/77770753/171874838-1ac0d804-4e35-4b6a-b220-e40f13e198a3.gif)
- Copy the code in [`cw-gram.js`](cw-gram.js)
- Update your worker with the copied code
    ![update-your-worker](https://user-images.githubusercontent.com/77770753/171877982-6bf02933-4c03-4dd2-bbfb-b3e27f188879.gif)
- Setup variables 
    - Go to `Settings > Variables` of your worker
    - Add these variables,
        - `BOT_TOKEN` - Your telegram bot token
        - `TO_ID` - ID of a telegram user account where the bot needs to send the message
    
    ![add-variables](https://user-images.githubusercontent.com/77770753/171879778-cd758b5f-2ca3-408f-951e-e7d17bec5e37.gif)


Done 🥳! Now test your worker by sending a post request with the required values!

Here is an example with `curl` 👇,
```bash
curl --request POST \
  --url https://your-worker.your-name.workers.dev/ \
  --header 'content-type: application/json' \
  --data '{
  "name": "Jeff",
  "email": "jeff@awsm.io",
  "subject": "We are hiring!",
  "msg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis venenatis libero. Quisque enim felis, rutrum ornare nisl ac, tincidunt."
}'
```