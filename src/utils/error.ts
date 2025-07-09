/* eslint-disable @typescript-eslint/no-explicit-any */
const showError = (error: any) => {
    console.log(error)
    alert(error?.message || error?.message?.[0])
}

export default showError