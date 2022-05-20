import DeviceMode from "../../models/deviceMode"

function isDeviceModeValid(n: number): boolean {
    return n in DeviceMode
}

export default isDeviceModeValid