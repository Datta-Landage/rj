export function validateEmail(input) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(input);
}

export function validatePassword(input) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(input);
}

export function validatePhoneNumber(input) {
    const phoneNumberRegex = /^(\+91[\s]?)?[0]?(91)?[6789]\d{9}$/
    return phoneNumberRegex.test(input);
}

export function validatePincode(input) {
    const pincodeRegex = /^[1-9][0-9]{6}$/
    return pincodeRegex.test(input);
}

export function validateName(input) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(input);
}