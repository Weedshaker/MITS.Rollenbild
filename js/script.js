// @ts-check

/**
 * maximum selectable elements
 * @type {number}
 */
const max = 3
/** @type {number} */
let counter = 0
/** @type {HTMLElement} */
const container = document.getElementById('selection')
if(container){
    /**
    * handle a click -> remove, add or animate that selection is not available
    * @param {Event | *} event
    * @returns {void}
    */
    const selectionFunc = event => {
        if (!event || !event.target || event.target === container) return
        /** @type {EventTarget | *} */
        const target = event.target && event.target.textContent ? event.target : event.target.parentElement
        /** @type {string} */
        const key = target && target.textContent || ''
        if(key){
            /** @type {string} */
            const cssClass = 'active'
            if(localStorage.getItem(key)){
                // remove
                target.classList.remove(cssClass)
                localStorage.removeItem(key)
                counter--
            }else if(counter < max){
                // add
                target.classList.add(cssClass)
                localStorage.setItem(key, 'active')
                counter++
            }else{
                // animate when max number is reached
                /** @type {number} */
                const animationDuration = 500
                /** @type {string} */
                const cssNotAvailable = 'notAvailable'
                target.classList.add(cssNotAvailable)
                setTimeout(() => target.classList.remove(cssNotAvailable), animationDuration)
                /** @type {string} */
                const cssNot = 'not'
                Array.from(container.getElementsByClassName(cssClass)).concat([target]).forEach(target => {
                    target.classList.add(cssNot)
                    setTimeout(() => target.classList.remove(cssNot), animationDuration)
                })
            }
        }
    }
    // listen to clicks
    document.getElementById('selection').addEventListener('click', selectionFunc)
    // initialize the elements set at localStorage
    Array.from(container.childNodes).forEach(node => {
        if(node.textContent && localStorage.getItem(node.textContent)){
            // remove it that the selectionFunc treats it as newly clicked
            localStorage.removeItem(node.textContent)
            selectionFunc({target: node})
        }
    })
}