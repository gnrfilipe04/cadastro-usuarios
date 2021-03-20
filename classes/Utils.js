class Utils {
    
    static dateFormat(date){
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes() 
    }
    
    static dateFormatIntl(date){
        return new Intl.DateTimeFormat('pt-BR').format(
            new Date(date) 
         )
    } 
}