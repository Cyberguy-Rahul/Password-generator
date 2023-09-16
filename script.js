const range_slider = document.querySelector("#range-slider");

const password_display = document.querySelector("#password-display");

const copy_btn = document.querySelector("#copy-btn");

const copy_msg = document.querySelector("#copy-msg");

const length_number = document.querySelector("#length-number");

const uppercase = document.querySelector("#uppercase");

const lowercase = document.querySelector("#lowercase");

const numbers = document.querySelector("#numbers");
const gg=document.querySelector("#pass");

const symbols = document.querySelector("#symbols");
const data_indicator = document.querySelector("#data-indicator");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const generate_btn = document.querySelector("#generate-btn");

let password = "";
let passwordlength = 10;

let checkcount = 0;
handleslider();

function handleslider() {
  range_slider.value = passwordlength;
  length_number.innerText = passwordlength;
}


// for set color of password strength indicator 
function setindicator(color) {
  data_indicator.style.backgroundColor = color;
}

// for generate a random integer 
function getrndinteger(min ,max){
   return Math.floor(Math.random() * (max-min)+min)
}

// for gerfnate a random number 

function getrandomnumber(){
     return getrndinteger(0,9);
}

// for generate a random lowercase character 

function getrandomlowercase(){
    return String.fromCharCode(getrndinteger(97 , 123));
}

// for generate a random uppercase charcter 

function getrandomuppercase(){
    return String.fromCharCode(getrndinteger(65 , 91));
};




const symbol="~`!@#$%^&*()_+}{:[],<>./?|-=";

function generaterandomsymbol(){
    const num=getrndinteger(0 , symbol.length);
    return symbol.charAt(num);
}

function calcstrength(){

    let uppr=false;
    let lowr=false;
    let numbr=false;
    let smbl=false;

    if(uppercase.checked) uppr=true;
    if(lowercase.checked) lowr=true;
    if(numbers.checked) numbr=true;
    if(symbols.checked) smbl=true;


    if(uppr && lowr &&(numbr || smbl) && passwordlength>=8){
        setindicator("#0f0");
    }
    else if((uppr || lowr) && (smbl || numbr) && passwordlength>=6){
        setindicator("#ff0");
    }
    else setindicator("#f00");


}

async function copycontent(){
   
    try{
        await navigator.clipboard.writeText(gg.value);
                copy_msg.innerText="copied";

    }
    catch(e){
        copy_msg.innerText="failed" ;
       }

        

}

range_slider.addEventListener("input" , (e)=> {
    passwordlength=e.target.value;
    handleslider();
    
});

copy_btn.addEventListener("click" , ()=>{
    if(gg.value)
    copycontent();
});

function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox) =>{
        if(checkbox.checked)
        checkcount++;;
    });
};

function shufflepassword(array){
    // fisher yates method 

    for(let i=array.length-1; i>0 ; i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    };
    let str="";
    array.forEach((el)=> (str+=el));
    
    return str;
}




allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('click' , handlecheckboxchange);
})

generate_btn.addEventListener('click' , ()=>{
        if(checkcount<=0) return;

        if(passwordlength<checkcount){
            passwordlength=checkcount;
            handleslider();
        }

        // let's start generate new password 

        // remove old password 
        password="";
       

        // let's put the stuff mentioned in checkbox 

        let funcarr=[];

        if(uppercase.checked){
            funcarr.push(getrandomuppercase);
        }

        if(lowercase.checked){
            funcarr.push(getrandomlowercase);
        };

        if(numbers.checked){
            funcarr.push(getrandomnumber);
        }

        if(symbols.checked){
            funcarr.push(generaterandomsymbol);
        };

        // complsory charcters add 
       
        for(let i=0; i<funcarr.length; i++){
            password+=funcarr[i]();
        };

       

        // let's add remaining charcters 
        

        for(let i=0; i<passwordlength - funcarr.length; i++){
            let randomm=getrndinteger(0, funcarr.length);
            password+=funcarr[randomm]();
        }

        // let's shuffle the password 

        password=shufflepassword(Array.from(password));
        console.log(password);
       
        gg.value=password;


        

        calcstrength();

        
        

});










