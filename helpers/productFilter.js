module.exports.filterProduct = (arrayOfObjects,today,time) =>{
    var tempRecord = [];
    var tempDay = '';
    var splitToday = today.split('-');
    if(Number(splitToday[2]) < 10)
    {
     tempDay = '0'+''+splitToday[2];
     today = splitToday[0] + '-' + splitToday[1] + '-' + tempDay;
    }
    for(var i=0;i<arrayOfObjects.length;i++){
       var purchase_date = arrayOfObjects[i]["purchase_date"];
       var purchase_time = arrayOfObjects[i]["purchase_time"];

       /* If expired no need to pull record */
       var tempObject = {};
       tempObject = {...arrayOfObjects[i].toJSON() }
       
       /* if not expired then filter it to send frontend */ 
       if( purchase_date >= today && purchase_time >= time)
       {
           /* Check daily availability */
           tempObject["expired"] = "false";
           tempRecord.push(tempObject);
       }
       else
       {
           tempObject["expired"] = "true";
           tempRecord.push(tempObject);
       }
    }

    return tempRecord;
}