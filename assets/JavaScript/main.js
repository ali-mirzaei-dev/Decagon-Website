const sliderTrack = document.getElementById("sliderTrack")
const sliderSection = sliderTrack.closest("section")
const heroCaption1 = document.getElementById("heroCaption1")
const heroCaption2 = document.getElementById("heroCaption2")
const heroCaption3 = document.getElementById("heroCaption3")

addEventListener("scroll", () => {

    const rect = sliderSection.getBoundingClientRect()
    const sectionHeight = sliderSection.offsetHeight - innerHeight


    if (rect.top <= 0 && rect.top >= -sectionHeight) {
        const scrollProgress = Math.abs(rect.top) / sectionHeight
        const shiftAmount = scrollProgress * (innerWidth * 2)

        sliderTrack.style.transform = `translateX(-${shiftAmount}px)`
        const slideRight = (scrollProgress - 0.05) * (innerWidth * 0.6)

        if (scrollProgress >= 0.05 && scrollProgress <= 0.4) {
            heroCaption1.classList.remove("scale-0")
            heroCaption1.classList.add("scale-100")
            heroCaption1.style.right = `calc(10% + ${-slideRight}px)`

            heroCaption2.classList.add("scale-0")
            heroCaption3.classList.add("scale-0")

        } else if (scrollProgress >= 0.41 && scrollProgress <= 0.7) {
            heroCaption2.classList.remove("scale-0")
            heroCaption2.classList.add("scale-100")
            heroCaption2.style.left = `calc(10% + ${slideRight * 1}px)`
        } else if (scrollProgress >= 0.71) {
            heroCaption3.classList.remove("scale-0")
            heroCaption3.classList.add("scale-100")
            heroCaption3.style.right = `calc(130% + ${-slideRight * 1.2}px)`
        } else {
            heroCaption1.classList.add("scale-0")
            heroCaption2.classList.add("scale-0")
            heroCaption3.classList.add("scale-0")
            heroCaption1.classList.remove("scale-100")
            heroCaption2.classList.remove("scale-100")
            heroCaption3.classList.remove("scale-100")
        }

    }

})


const logos = document.querySelectorAll("#logoParent>figure")

function leftLogo() {
    const activeFigureIndex = [...logos].findIndex(val => val.getAttribute("data-active") == 'active')
    logos[activeFigureIndex].setAttribute("data-active", "off")
    logos[activeFigureIndex].classList.remove("active")


    let newActiveFigureIndex = null
    if (activeFigureIndex == 0) {
        newActiveFigureIndex = 3
    } else {
        newActiveFigureIndex = activeFigureIndex - 1
    }

    logos[newActiveFigureIndex].setAttribute("data-active", "active")
    logos[newActiveFigureIndex].classList.add("active")

}

function rightLogo() {
    const activeFigureIndex = [...logos].findIndex(val => val.getAttribute("data-active") == 'active')
    logos[activeFigureIndex].setAttribute("data-active", "off")
    logos[activeFigureIndex].classList.remove("active")


    let newActiveFigureIndex = null
    if (activeFigureIndex == 3) {
        newActiveFigureIndex = 0
    } else {
        newActiveFigureIndex = activeFigureIndex + 1
    }
    logos[newActiveFigureIndex].setAttribute("data-active", "active")
    logos[newActiveFigureIndex].classList.add("active")

}

const logoParent = document.getElementById("logoParent")

logoParent.addEventListener("animationend", (e) => {
    if (e.animationName === "borderTop") {
        rightLogo()
    }
})