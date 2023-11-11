let colour_select = document.getElementById("slider")

let colour_display = document.getElementsByClassName("colour_display")[0]
let canvas_context = colour_display.getContext("2d")

let set_colour = () => {
    let degrees = colour_select.value
    let hsl = "hsl(" + degrees + ", 100%, 50%)"
    colour_display.style.backgroundColor = "red"
    colour_display.style.backgroundColor = hsl
}

colour_select.addEventListener("mouseup", set_colour);

//white gradient (horizontal)
let gradient = colour_display.getContext("2d").createLinearGradient(0, 0, colour_display.width, 0)
gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
colour_display.getContext("2d").fillStyle = gradient
colour_display.getContext("2d").fillRect(0, 0, colour_display.width, colour_display.height)

//black gradient (vertical)
gradient = colour_display.getContext("2d").createLinearGradient(0, 0, 0, colour_display.height)
gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
colour_display.getContext("2d").fillStyle = gradient
colour_display.getContext("2d").fillRect(0, 0, colour_display.width, colour_display.height)

colour_display.onclick = (e) => {
    let imgData = canvas_context.getImageData(e.offsetX, e.offsetY, 1, 1)
    let rgba = imgData.data
    console.log(rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3])
}
