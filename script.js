let colour_select = document.getElementById("slider")
let colour_display = document.getElementsByClassName("colour_display")[0]

let set_colour = () => {
    let degrees = colour_select.value
    console.log(degrees)
    let hsl = "hsl(" + degrees + ", 100%, 50%)"
    console.log(hsl)
    colour_display.style.backgroundColor = "red"
    colour_display.style.backgroundColor = hsl
}

colour_select.addEventListener("mouseup", set_colour);