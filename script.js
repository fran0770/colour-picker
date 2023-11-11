let colour_select = document.getElementById("slider")
let colour_display = document.getElementsByClassName("colour_display")[0]
let canvas_context = colour_display.getContext("2d")
let rgba_display = document.getElementById("colour_info")

let set_colour = () => {
    let degrees = colour_select.value
    let hsl = "hsl(" + degrees + ", 100%, 50%)"
    colour_display.style.backgroundColor = "red"
    colour_display.style.backgroundColor = hsl
    define_gradient(hsl)
}

colour_select.addEventListener("mouseup", set_colour);

let define_gradient = (hsl) => {
    //white gradient (horizontal)
    let gradient = colour_display.getContext("2d").createLinearGradient(0, 0, colour_display.width, 0)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(1, hsl)
    colour_display.getContext("2d").fillStyle = gradient
    colour_display.getContext("2d").fillRect(0, 0, colour_display.width, colour_display.height)

    //black gradient (vertical)
    gradient = colour_display.getContext("2d").createLinearGradient(0, 0, 0, colour_display.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    colour_display.getContext("2d").fillStyle = gradient
    colour_display.getContext("2d").fillRect(0, 0, colour_display.width, colour_display.height)
}

define_gradient("hsl(180, 100%, 50%)") //initially display cyan colour 

colour_display.onclick = (e) => {
    let imgData = canvas_context.getImageData(e.offsetX, e.offsetY, 1, 1)
    let rgba = imgData.data
    rgba = rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3]
    rgba_display.innerHTML = "rgb: " + rgba
}

let rgb_to_hex = (rgba) => {
    let hex = []
    let char
    rgba = rgba.split(",")
    for (let i=0; i<3; i++){
        console.log(hex)
        console.log(rgba)
        char = ((parseInt(rgba[i])).toString(16))
        char = char.padStart(2, 0) //pad start of number with zeros to form total two digits
        hex.push(char)
    }
    hex = hex.join("")
    return hex
}


