let colour_select = document.getElementById("slider")
let colour_display = document.getElementById("colour_display")
let canvas_context = colour_display.getContext("2d", { willReadFrequently: true })
let rgba_display = document.getElementById("rgb_info")
let hex_display = document.getElementById("hex_info")

let set_colour = () => {
    let degrees = colour_select.value
    let hsl = "hsl(" + degrees + ", 100%, 50%)"
    define_gradient(hsl)
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
    hex = hex.toUpperCase()
    return hex
}

colour_select.addEventListener("mouseup", set_colour);

let define_gradient = (hsl) => {
    //white gradient (horizontal)
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
    let rgba_all = rgba[0] + ", " + rgba[1] + ", " + rgba[2]
    rgba_display.innerHTML = "rgb: " + rgba_all
    hex_display.innerHTML = "hex: " + rgb_to_hex(rgba_all)

    let preview = document.getElementById("colour_preview")
    preview.style.backgroundColor = "rgb(" + rgba + ")"

    canvas_context.clearRect(0, 0, colour_display.width, colour_display.height); //clearing entire canvas
    set_colour() //redrawing gradient on display 

    canvas_context.strokeStyle = "grey"
    canvas_context.beginPath()
    canvas_context.moveTo(x_coord + 5, y_coord)
    canvas_context.lineTo(x_coord - 5, y_coord)
    canvas_context.stroke()

    canvas_context.moveTo(x_coord, y_coord + 5)
    canvas_context.lineTo(x_coord, y_coord - 5)
    canvas_context.stroke()

    set_shades(rgba)
}

let set_shades = (rgba) => {
    let shades = document.getElementsByClassName("shade_palette")
    let shade_factor = 1.8
    for (let i=0; i<shades.length; i++){
        let new_r = Math.round(rgba[0] * shade_factor)
        let new_g = Math.round(rgba[1] * shade_factor)
        let new_b = Math.round(rgba[2] * shade_factor)
        shade_factor -= 0.18
        let sample_rgb = "rgb(" + new_r + "," + new_g + "," + new_b + ")" 
        shades[i].style.backgroundColor = sample_rgb
        sample_rgb = rgb_to_hex(sample_rgb) //hex colour code 
        shades[i].onclick = (sample_rgb) => {
            navigator.clipboard.writeText(sample_rgb)
            alert("Colour copied to the clipboard.")
        }
    }
}

set_shades([64, 128, 128]) //setting initial cyan shades 

let copy_button = document.getElementById("colour_preview")

copy_button.onclick = () => {
    navigator.clipboard.writeText(hex_display.innerHTML.slice(5))
    alert("Colour copied to the clipboard.")
}

let initial_cross = () => {
    canvas_context.strokeStyle = "grey"
    canvas_context.beginPath()
    let x_value = colour_display.width/2
    let y_value = colour_display.height / 2
    canvas_context.moveTo(x_value + 5, y_value) //setting initial cross with centre (400, 250)
    canvas_context.lineTo(x_value - 5, y_value)
    canvas_context.stroke()

    canvas_context.moveTo(x_value, y_value + 5)
    canvas_context.lineTo(x_value, y_value - 5)
    canvas_context.stroke()
}

initial_cross()
