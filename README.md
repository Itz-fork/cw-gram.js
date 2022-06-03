# cw-gram.js
[Cloudflare workers](https://workers.cloudflare.com/) script that allows you to send messages to a specific telegram account via an api request. Made for the contact form in [my portfolio](https://github.com/Itz-fork/Sveltefolio). Inspired by [@tuhinpal/Contact-Form](https://github.com/tuhinpal/Contact-Form)

## Usage
- Create an account at [Cloudflare workers](https://dash.cloudflare.com/sign-up/workers)
- Create a cloudflare worker
- Copy the code in [`cw-gram.js`](cw-gram.js)
- Update your worker with the copied code
- Setup variables 
    - Go to `Settings > Variables` of your worker
    - Add these variables,
        - `BOT_TOKEN` - Your telegram bot token
        - `TO_ID` - ID of a telegram user account where the bot needs to send the message

Now test your worker by sending a post request with the required values!