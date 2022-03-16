
export function getCurrentDate(){
    const currentDate = new Date();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const date = 
    `
    ${days[currentDate.getDay() - 1]}, 
    ${currentDate.getDate()}/${currentDate.getMonth() < 10 ? "0" : ""}${currentDate.getMonth()+1}/${currentDate.getFullYear()}
    `;
    return date
}