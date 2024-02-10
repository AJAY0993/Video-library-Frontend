const throttler = fn => {
    let timerId;
    return function () {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn()
        }, 500);

    }
}

export default throttler