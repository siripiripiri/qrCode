const input = document.querySelector("input");
const qrColor = document.querySelector("qrColor")
input.oninput= () =>{
    qrColor.value = input.value;
};