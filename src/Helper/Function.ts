const characters ='0123456789';

const  generateSmsCode =() => {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default generateSmsCode;