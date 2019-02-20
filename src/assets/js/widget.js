var obj = null;
var As = document.getElementById('cb-topnav').getElementsByTagName('a');
obj = As[0];
for(var i = 1; i < As.length; i++){
    if(window.location.href.indexOf(As[i].href) >= 0 ){
        obj = As[i];
    }
}
obj.id='cb-topnav-current';