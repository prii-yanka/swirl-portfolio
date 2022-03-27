let folders = document.getElementsByClassName("folders");
console.log(folders);

window.addEventListener("scroll", () => {
    let value = window.scrollY;

    folders.style.top = 50 * value * -0.5 + '%';
})