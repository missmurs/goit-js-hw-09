!function(){var t,o={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.body};function e(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}o.start.addEventListener("click",(function(){o.body.style.backgroundColor=e(),t=setInterval((function(){o.body.style.backgroundColor=e()}),1e3),o.start.disabled=!0,o.stop.disabled=!1})),o.stop.addEventListener("click",(function(){clearInterval(t),o.start.disabled=!1,o.stop.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.adad8847.js.map
