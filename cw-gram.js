/*

## cw-gram.js

Cloudflare script to send messages to your account via telegram's bot api

## Inspiration & Credits:

    - tuhinpal - https://github.com/tuhinpal/Contact-Form (Basically rewrote this project cuz i was too lazy to edit it lol)
    - dideler - https://gist.github.com/dideler/85de4d64f66c1966788c1b2304b9caf1

*/

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

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

async function handleRequest(request) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        })
    }

    // Check request method
    if (request.method != "POST") {
        return await genResponse("failure", "Do a post request bruh!", 405)
    }

    // Validate environment variables exist
    if (!BOT_TOKEN || !TO_ID) {
        return await genResponse("failure", "Server ain't configured right, chief!", 500)
    }

    // Get the details
    let jreq
    try {
        jreq = await request.json()
    } catch {
        return await genResponse("failure", "Invalid JSON, don't send garbage.", 400)
    }

    let name = jreq.name
    let email = jreq.email
    let subject = jreq.subject || "No subject"
    let msg = jreq.msg

    // We need fucking name, email and a message to send
    if (!name || !email || !msg) {
        return await genResponse("failure", "You gotta fill name, email and msg values son!", 400)
    }

    // Preparing the message to send (escaped for safety)
    var to_send_msg = `
<b>💬 New Message</b>

<b>Name:</b> <code>${escapeHtml(name)}</code>
<b>Email:</b> ${escapeHtml(email)}
<b>Subject:</b> <code>${escapeHtml(subject)}</code>
<b>Message:</b>
<code>${escapeHtml(msg)}</code>`

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
    if (!resp.ok) {
        return await genResponse("failure", `Telegram said nope: ${resp.description || "Unknown error"}`, 500)
    }
    return await genResponse("success", "Successfully sent the message!", 200)
}

export default {
    fetch: handleRequest
}
