function isConnetion()
{
    // Rudimentary check to see if we are running on Heroku. Should provide a more flexible config.
    return window.location.hostname.indexOf('nuestraboda.thavz.com') == 0;
}

export let SERVER_URL = isConnetion() ? "http://127.0.0.1:8000/api/" : "http://127.0.0.1:8000/api/";
