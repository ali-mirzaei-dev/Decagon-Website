const sliderTrack = document.getElementById("sliderTrack")
const sliderSection = sliderTrack.closest("section")
const heroCaption1 = document.getElementById("heroCaption1")
const heroCaption2 = document.getElementById("heroCaption2")
const heroCaption3 = document.getElementById("heroCaption3")

// ------- HERO SCROLL ANIMATION ------- //
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