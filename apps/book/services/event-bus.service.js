
function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBusService = { on, emit }

export function showUserMsg(msg) {
    eventBusService.emit('user-msg', msg)
}


export function showSuccessMsg(txt, bookId) {
    showUserMsg({ txt, type: 'success', bookId })
}
export function showErrorMsg(txt, bookId) {
    showUserMsg({ txt, type: 'error', bookId })
}

window.myBus = eventBusService




