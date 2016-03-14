import Alt from "alt";

// Debug client-side
if (process.env.APP_DEBUG && window) {
    window["alt.js.org"] = alt;
}

export default new Alt();
