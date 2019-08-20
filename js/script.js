// @ts-check

/**
 * maximum selectable elements
 * @type {number}
 */
var max = 3
/** @type {number} */
var counter = 0
/** @type {HTMLElement} */
var container = document.getElementById('selection')
if(container){
    /**
    * handle a click -> remove, add or animate that selection is not available
    * @param {Event | *} event
    * @returns {void}
    */
    var selectionFunc = function(event){
        if (!event || !event.target || event.target === container) return
        if (typeof event.preventDefault === 'function') event.preventDefault()
        /** @type {EventTarget | *} */
        var target = event.target && event.target.textContent ? event.target : event.target.parentElement
        /** @type {string} */
        var key = target && target.textContent || ''
        if(key){
            /** @type {string} */
            var cssClass = 'active'
            if(localStorage.getItem(key)){
                // remove
                target.classList.remove(cssClass)
                localStorage.removeItem(key)
                counter--
            }else if(counter < max){
                // add
                target.classList.add(cssClass)
                localStorage.setItem(key, cssClass)
                counter++
            }else{
                // animate when max number is reached
                /** @type {number} */
                var animationDuration = 500
                /** @type {string} */
                var cssNotAvailable = 'notAvailable'
                target.classList.add(cssNotAvailable)
                setTimeout(function(){target.classList.remove(cssNotAvailable)}, animationDuration)
                /** @type {string} */
                var cssNot = 'not'
                Array.from(container.getElementsByClassName(cssClass)).concat([target]).forEach(function(targetOrActive){
                    targetOrActive.classList.add(cssNot)
                    setTimeout(function(){targetOrActive.classList.remove(cssNot)}, animationDuration)
                })
            }
        }
    }
    // listen to clicks
    document.getElementById('selection').addEventListener('click', selectionFunc)
    // initialize the elements set at localStorage
    Array.from(container.childNodes).forEach(function(node){
        if(node.textContent && localStorage.getItem(node.textContent)){
            // remove it that the selectionFunc treats it as newly clicked
            localStorage.removeItem(node.textContent)
            selectionFunc({target: node})
        }
    })
}