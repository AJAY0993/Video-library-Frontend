const throttler = (fn, delay) => {
    let timerId;
    return () => {
        clearTimeout(timerId)
        timerId = setTimeout(fn, delay);

    }

}

export default throttler