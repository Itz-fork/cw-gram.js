/*

## cw-gram.js

Cloudflare script to send messages to your account via telegram's bot api

## Inspiration & Credits:

    - tuhinpal - https://github.com/tuhinpal/Contact-Form (Basically rewrote this project cuz i was too lazy to edit it lol)
    - dideler - https://gist.github.com/dideler/85de4d64f66c1966788c1b2304b9caf1

*/

async function genResponse(s_f, resp_msg, code = 200) {
    return new Response(
        JSON.stringify({
            status: s_f,
            msg: resp_msg
        }), {
        status: code,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, max-age=5, must-revalidate",
            "Access-Control-Allow-Origin": "*"
        }
    }
    )
}


addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    // Check request method
    if (request.method != "POST") {
        return await genResponse("failure", "Do a post request bruh!", 405)
    }

    // Get the details
    const jreq = await request.json()
    let name = jreq.name
    let email = jreq.email
    let subject = jreq.subject
    let msg = jreq.msg

    // We need fucking name, email and a message to send
    if (!name || !email || !msg) {
        return await genResponse("failure", "You gotta fill name, email and msg values son!", 413)
    }

    // Preparing the message to send
    var to_send_msg = `
<b>💬 New Message</b>

<b>Name:</b> <code>${name}</code>
<b>Email:</b> ${email}
<b>Subject:</b> <code>${subject}</code>
<b>Message:</b>
<code>${msg}</code>`

    // Sending the message
    var content = {
        method: "POST",
        body: JSON.stringify({
            chat_id: TO_ID,
            text: to_send_msg,
            disable_notification: true,
            parse_mode: "HTML"
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }
    const sendit = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, content)
    const resp = await sendit.json()

    // Send a response
    var clt_msg = resp.ok ? "success" : "failure"
    return await genResponse(clt_msg, "Successfully sent the message!", clt_msg === "success" ? 200 : 500)
}