//hola
function parseIntOrNull(params: string) {
    const number = parseInt(params);
    if (isNaN(number)) {
        return null;
    } 
    return number;
}

export default parseIntOrNull;