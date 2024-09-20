function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// Underli holds all underlined vars (pre-cookie)
let underli = []
function underline(elem){
  if(elem.style.textDecoration == "underline"){
      elem.style.textDecoration = "none";
      underli.splice(underli.indexOf(elem),1)
      clean(underli,"arr")
      jsoSET(underli)
  }else{
      elem.style.textDecoration = "underline";
      underli.push(elem)
      clean(underli,"arr")
      jsoSET(underli)
  }
}
// send each line of a array to html (array, htmlElem)
function clean(un,arr){
  let arra = document.getElementById(arr);
  let text = "";
  for (let i=0;i<un.length;i++) {
      text += un[i].id +" ";
  } 
  arra.innerHTML = text;
}
// Turn a String into array (array)
function jsoSET(un){
  let convarr = []
  for(let i =0;i<un.length;i++){
    convarr.push(un[i].id);
  }
  let j = JSON.stringify(convarr);
  setCookie("un",j,364);
}
// Retrieve a String Array (cookie)
function jsoRET(cookie){
  let str = getCookie(cookie);
  return JSON.parse(str);
}
window.main = function(){
  requestAnimationFrame( main );
  // Retrieve the ID's of all previously saved verses
  jj = jsoRET("un")
  document.getElementById("cook").innerHTML = jj;

  if(jj !=undefined){
    for(let i = 0; i<jj.length;i++){
      // Rerender all saved verses
      let tempelm = document.getElementById(jj[i])
      underline(tempelm);
    }
  }
};main();
function delCooki(){
  setCookie("un","",-365);
}
