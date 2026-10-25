const sliderTrack = document.getElementById("sliderTrack")
const sliderSection = sliderTrack.closest("section")
const heroCaption1 = document.getElementById("heroCaption1")





addEventListener("scroll", () => {

    const rect = sliderSection.getBoundingClientRect()
    const sectionHeight = sliderSection.offsetHeight - innerHeight


    if (rect.top <= 0 && rect.top >= -sectionHeight) {
        const scrollProgress = Math.abs(rect.top) / sectionHeight
        const shiftAmount = scrollProgress * (window.innerWidth * 2)
        console.log(shiftAmount);
        
        sliderTrack.style.transform = `translateX(-${shiftAmount}px)`

        if (scrollProgress >= 0.05 && scrollProgress <= 0.4) {
            heroCaption1.classList.remove("scale-0")
            heroCaption1.classList.add("scale-100")
            heroCaption1.style.right = (-shiftAmount / 3.3) + "px"


        } else {
            heroCaption1.classList.add("scale-0")
            setTimeout(() => {
                heroCaption1.classList.remove("scale-100")
            }, 200);
        }

    }

})