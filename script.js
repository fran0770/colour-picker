let colour_select = document.getElementById("slider")
let colour_display = document.getElementsByClassName("colour_display")[0]
let canvas_context = colour_display.getContext("2d", { willReadFrequently: true })
let rgba_display = document.getElementById("rgb_info")
let hex_display = document.getElementById("hex_info")

let set_colour = () => {
    let degrees = colour_select.value
    let hsl = "hsl(" + degrees + ", 100%, 50%)"
    define_gradient(hsl)
}

colour_select.addEventListener("mouseup", set_colour);

let define_gradient = (hsl) => {
    //white gradient (horizontal)
    console.log(colour_display.width, colour_display.height)
    let gradient = colour_display.getContext("2d").createLinearGradient(0, 0, colour_display.width, 0)
    gradient.addColorStop(0, 'rgb(255, 255, 255)')
    gradient.addColorStop(1, hsl)
    colour_display.getContext("2d").fillStyle = gradient
    colour_display.getContext("2d").fillRect(0, 0, colour_display.width, colour_display.height)

    //black gradient (vertical)
    gradient = colour_display.getContext("2d").createLinearGradient(0, 0, 0, colour_display.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)') //invisible black
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    colour_display.getContext("2d").fillStyle = gradient
    colour_display.getContext("2d").fillRect(0, 0, colour_display.width, colour_display.height)
}

define_gradient("hsl(180, 100%, 50%)") //initially display cyan colour 

colour_display.onmousedown = (e) => {
    let x_coord = e.offsetX
    let y_coord = e.offsetY

    let imgData = canvas_context.getImageData(x_coord, y_coord, 1, 1)
    let rgba = imgData.data
    rgba = rgba[0] + ", " + rgba[1] + ", " + rgba[2]
    rgba_display.innerHTML = "rgb: " + rgba
    hex_display.innerHTML = "hex: " + rgb_to_hex(rgba)

    canvas_context.strokeStyle = "grey"
    canvas_context.beginPath()
    canvas_context.moveTo(x_coord + 5, y_coord)
    canvas_context.lineTo(x_coord - 5, y_coord)
    canvas_context.stroke()

    canvas_context.moveTo(x_coord, y_coord + 5)
    canvas_context.lineTo(x_coord, y_coord - 5)
    canvas_context.stroke()
}

let rgb_to_hex = (rgba) => {
    let hex = []
    let char
    rgba = rgba.split(",")
    for (let i=0; i<3; i++){
        char = ((parseInt(rgba[i])).toString(16))
        char = char.padStart(2, 0) //pad start of number with zeros to form total two digits
        hex.push(char)
    }
    hex = "#" + hex.join("")
    return hex
}

let button = document.getElementById("copy")
button.onclick = () => {
    navigator.clipboard.writeText(hex_display.innerHTML.slice(5))
    alert("Colour copied to the clipboard.")
}

let marker = document.getElementById("marker")


