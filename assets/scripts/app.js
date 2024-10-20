const sectionNods = document.querySelectorAll("section");
const [ sectionMain, sectionCategory, sectionAbout] = sectionNods;

const stackSample = getInitialStack();
let stack = stackSample.slice();

const [ btnServices, btnAboutUs, btnContacts ] = Array.from(document.querySelectorAll('.nav__item'));

['touchmove', 'wheel'].forEach(function(item) {
    document.addEventListener(item, scroll);
});

function scroll () {
    scrollDocument();
    console.log(stack);
}

function scrollDocument () {
    const el = stack.pop(-1);

    if (el === "clear") {
        if (stack.length > 3) {
            scrollRemoveSection(sectionCategory);
        } else {
            scrollRemoveSection(sectionAbout);
            document.querySelector(".footer").style.bottom = "0";
        }
    } else if (el.classList.contains("section__left") || el.classList.contains("section__right")) {
        scrollAddSection(el.parentNode.parentNode, el);

        if (el.classList.contains("section__left")) {
            const subEl = stack.pop(-1);
            repairElement(subEl, true);
            repairNextElement(subEl);
        }
    } else {
        repairPrevElement(el);
        repairElement(el);
        repairNextElement(el);
    }


    ['touchmove', 'wheel'].forEach(function(item) {
        document.removeEventListener(item, scroll);
    });
    setTimeout(addEventWheel, 600);
}




function getInitialStack () {
    const stackTemp = [];

    [sectionCategory, sectionAbout].forEach( function (section) {
        const elements = Array.from(section.querySelector('.container').children).reverse();
        const listItem = Array.from(elements[1].querySelector('.catalog__list').children);

        Array.prototype.push.apply(stackTemp, elements);
        Array.prototype.push.apply(stackTemp, listItem);
        stackTemp.push('clear');
    });

    stackTemp.reverse();
    console.log(1);

    return stackTemp;
}

function scrollAddSection (section, side) {
    section.style.height = "calc(100vh - 8.5rem - 10vh)";
    section.style.opacity = "1";
    section.style.display = "block";
    Array.from(section.querySelector(".catalog__list").children).forEach(function (element) {
        element.style.transition = "top 1.2s linear, opacity 1.2s linear, box-shadow 0.3s linear";
    });
    if (side.classList.contains("section__left") === true || side.classList.contains("section__right") === true) {
        side.style.top = "0";
    }
}

function scrollRemoveSection(section) {
    if (section.style.height === "calc(-8.5rem + 90vh)") {
        Array.from(section.querySelector('.container').children).forEach(function (child) {
            child.style.top = "-30%";
        });
        section.style.opacity = "0";
        section.style.height = "80vh";

        setTimeout(function () {
            section.style.display = "none";
        }, 1000);
    }
}

function resetSection(section) {
    Array.from(section.querySelector('.container').children).forEach(function(child) {

        Array.from(child.querySelector(".catalog__list").children).forEach(function (element) {
            element.style.transition = "none";
            element.style.opacity = "1";
            element.style.top = "100%";
        });
        child.style.opacity = "1";
    });
    section.style.height = "0";
}


function addEventWheel () {
    ['touchmove', 'wheel'].forEach(function(item) {
        document.addEventListener(item, scroll);
    });
}

function repairPrevElement (element) {
    const prevEl = element.previousSibling.previousSibling;
    prevEl.style.opacity = "0";
    prevEl.style.top = "-30%";
    prevEl.style.transition = "top 1.2s linear, opacity 1.2s linear, box-shadow 0.3s linear";
}

function repairElement (element, isSubElement=false) {
    element.style.bottom = "auto";
    element.style.top = "0";
    if (isSubElement === true) {
        element.style.transition = "top 0s linear, opacity 1.2s linear, box-shadow 0.3s linear";
    }
}

function repairNextElement (element) {
    const nextEl = element.nextSibling.nextSibling;
    nextEl.style.top = "70%";
}

btnAboutUs.addEventListener("click", () => {
    stack = stackSample.slice();
    stack = stack.reverse().slice(9).reverse();
    console.log(stack);
    console.log(stackSample);
    resetSection(sectionAbout);
    scrollAddSection(sectionAbout, sectionAbout.querySelector(".section__right"));
    repairElement(sectionAbout.querySelector('.catalog__item'));
    scrollRemoveSection(sectionCategory);
});

btnServices.addEventListener('click', () => {
    stack = stackSample.slice();
    stack = stack.reverse().slice(1).reverse();
    console.log(stack);
    console.log(stackSample);
    console.log(1);
    resetSection(sectionCategory);
    scrollRemoveSection(sectionCategory);
    scrollAddSection(sectionCategory, sectionCategory.querySelector(".section__right"));
    repairElement(sectionCategory.querySelector('.catalog__item'));
    scrollRemoveSection(sectionAbout);
});