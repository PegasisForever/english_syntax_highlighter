const fs = require("fs")

let indexHtml = fs.readFileSync("build/index.html", "utf8")
const scriptStart = indexHtml.indexOf("<script>")
const scriptEnd = indexHtml.indexOf("</script>")
const jsContent = indexHtml.substring(scriptStart + 8, scriptEnd)
fs.writeFileSync("build/static/js/index.js", jsContent)

indexHtml = indexHtml.substring(0, scriptStart) + `<script src="./static/js/index.js"></script>` + indexHtml.substring(scriptEnd + 9)
fs.writeFileSync("build/index.html", indexHtml)

console.log("Removed inline code.")