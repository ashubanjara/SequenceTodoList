
export function getCurrentDate(){
    const currentDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    console.log(currentDate.getDay())
    const date = 
    `
    ${days[currentDate.getDay()]}, 
    ${currentDate.getDate()}/${currentDate.getMonth() < 10 ? "0" : ""}${currentDate.getMonth()+1}/${currentDate.getFullYear()}
    `;
    return date
}