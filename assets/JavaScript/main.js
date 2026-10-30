const sliderTrack = document.getElementById("sliderTrack")
const sliderSection = sliderTrack.closest("section")
const heroCaption1 = document.getElementById("heroCaption1")
const heroCaption2 = document.getElementById("heroCaption2")
const heroCaption3 = document.getElementById("heroCaption3")
const moon = document.getElementById("moon")

let mouseX = 0, mouseY = 0
let smoothMouseX = 0, smoothMouseY = 0
let moonProgress = 0
let moonPastHero = false

function smoothstep(t) {
    t = Math.max(0, Math.min(1, t))
    return t * t * (3 - 2 * t)
}

addEventListener("mousemove", (e) => {
    const centerX = innerWidth / 2
    const centerY = innerHeight / 2
    mouseX = ((e.clientX - centerX) / centerX) * 20
    mouseY = ((e.clientY - centerY) / centerY) * 20
})

// ------- MOON ANIMATION ------- //
function animateMoon() {
    smoothMouseX += (mouseX - smoothMouseX) * 0.06
    smoothMouseY += (mouseY - smoothMouseY) * 0.06

    if (moonPastHero) {
        moon.style.transform = `translate(${120 + smoothMouseX}px, ${smoothMouseY}px)`
    } else if (moonProgress >= 0 && moonProgress <= 1) {
        const p = moonProgress
        let yMovePx, xMovePx

        if (p < 0.30) {
            const t = p / 0.30
            yMovePx = -innerHeight * 0.15 * smoothstep(t)
            xMovePx = 0
        } else if (p < 0.55) {
            const t = (p - 0.30) / 0.25
            yMovePx = -innerHeight * 0.15
            xMovePx = 120 * smoothstep(t)
        } else {
            const t = (p - 0.55) / 0.45
            yMovePx = -innerHeight * 0.15 + innerHeight * 0.25 * smoothstep(t)
            xMovePx = 120
        }

        moon.style.transform = `translate(${xMovePx + smoothMouseX}px, ${yMovePx + smoothMouseY}px)`
    }

    requestAnimationFrame(animateMoon)
}
animateMoon()

// ------- HERO SCROLL ANIMATION ------- //
function updateHero() {
    const rect = sliderSection.getBoundingClientRect()
    const sectionHeight = sliderSection.offsetHeight - innerHeight

    if (rect.top <= 0 && rect.top >= -sectionHeight) {
        moonPastHero = false
        moon.style.position = 'fixed'
        moon.style.top = '25vh'

        const scrollProgress = Math.abs(rect.top) / sectionHeight
        moonProgress = scrollProgress

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
    } else if (rect.top > 0) {
        moonPastHero = false
        moon.style.position = 'fixed'
        moon.style.top = '25vh'
        moonProgress = 0
    } else {
        moonPastHero = true
        moonProgress = 1
        moon.style.position = 'absolute'
        moon.style.top = `${sliderSection.offsetHeight - 0.65 * innerHeight}px`
    }
}

addEventListener("scroll", updateHero)
updateHero()



// ------- CAROSUEL LEFT BTN ------- //
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

// ------- CAROSUEL RIGHT BTN ------- //
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

// ------- CAROUSEL AUTO CHANGE ANIMATION ------- //
const logoParent = document.getElementById("logoParent")
logoParent.addEventListener("animationend", (e) => {
    if (e.animationName === "borderTop") {
        rightLogo()
    }
})

// ------- TRIO SCROLL ANIMATION ------- //
const progressContainer = document.querySelector('.progress-container')
const fillLine = document.getElementById('fillLine')
const circle1 = document.getElementById('circle1')
const circle2 = document.getElementById('circle2')
const starPath = document.getElementById('starPath')
const starGlow = document.getElementById('starGlow')
const optimizeSection = document.getElementById('optimizeSection')
const scaleSection = document.getElementById('scaleSection')

addEventListener('scroll', () => {
    if (!progressContainer) return

    const rect = progressContainer.getBoundingClientRect()
    const scrollableHeight = progressContainer.offsetHeight - innerHeight

    if (rect.top <= 0 && rect.top >= -scrollableHeight) {
        const progress = Math.abs(rect.top) / scrollableHeight

        fillLine.style.height = `${progress * 100}%`

        if (progress >= 0.08) {
            circle1.classList.remove('bg-[#2a2a2a]', 'border-[#2a2a2a]')
            circle1.classList.add('bg-[#8b5cf6]', 'border-[#8b5cf6]', 'scale-125')
        } else {
            circle1.classList.remove('bg-[#8b5cf6]', 'border-[#8b5cf6]', 'scale-125')
            circle1.classList.add('bg-[#2a2a2a]', 'border-[#2a2a2a]')
        }

        if (progress >= 0.50) {
            circle2.classList.remove('bg-[#2a2a2a]', 'border-[#2a2a2a]')
            circle2.classList.add('bg-[#8b5cf6]', 'border-[#8b5cf6]', 'scale-125')
            optimizeSection.classList.remove('opacity-0', 'translate-y-8')
        } else {
            circle2.classList.remove('bg-[#8b5cf6]', 'border-[#8b5cf6]', 'scale-125')
            circle2.classList.add('bg-[#2a2a2a]', 'border-[#2a2a2a]')
            optimizeSection.classList.add('opacity-0', 'translate-y-8')
        }

        if (progress >= 0.92) {
            starPath.classList.remove('fill-[#2a2a2a]')
            starPath.classList.add('fill-white')
            starGlow.classList.remove('opacity-0')
            starGlow.classList.add('opacity-100')
            scaleSection.classList.remove('opacity-0', 'translate-y-8')
        } else {
            starPath.classList.remove('fill-white')
            starPath.classList.add('fill-[#2a2a2a]')
            starGlow.classList.remove('opacity-100')
            starGlow.classList.add('opacity-0')
            scaleSection.classList.add('opacity-0', 'translate-y-8')
        }
    }
})

// ------- MOUSE IN  ------- //
const h6Title = document.querySelectorAll(".h6Title")
const imgOrder = document.querySelectorAll(".imgOrder")
const h6TitleReal = [...h6Title]
const imgOrderReal = [...imgOrder]
let activeImgIndex = 1

function hoverIn(e) {

    imgIndex = e.target.getAttribute("data-active")

    if (imgIndex === activeImgIndex) return

    imgOrderReal.forEach((val) => {

        val.classList.add("opacity-0")
        val.classList.remove("opacity-100")

        setTimeout(() => {
            val.classList.add("hidden")
        }, 400);
    })

    imgToShow = imgOrderReal.findIndex((val) => val.getAttribute("data-order") == imgIndex)

    imgOrderReal[imgToShow].classList.add("opacity-100")
    imgOrderReal[imgToShow].classList.remove("opacity-0")

    setTimeout(() => {
        imgOrderReal[imgToShow].classList.remove("hidden")
    }, 510);

    activeImgIndex = imgIndex
}