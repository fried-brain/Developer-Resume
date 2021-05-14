var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

function showPopUp(){
    var popUp = document.getElementById('popUp');
    popUp.style.display = "block";
};


// Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

// Menu

function openMenu(){
    var navbar = document.getElementById('navbar');
    var menu = document.getElementById('menu');
    var close = document.getElementById('close');
    menu.style.display = 'none';
    // navbar.style.top = 0;
    navbar.style.left = 0;
    close.style.display = 'block';
}
function closeMenu(){
    var navbar = document.getElementById('navbar');
    var menu = document.getElementById('menu');
    var close = document.getElementById('close');
    if (close.style.display === 'block'){
        menu.style.display = 'block';
        navbar.style.left = '-100%';
        close.style.display = 'none';
    }
}
function checkForm (){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    if (name.length < 1){
        alert("Please enter a name greater than 1 character. Your name cannot be", name);
    }
    else if (email.length < 5){
        alert("Enter a valid email");
    }
    else if (message.length < 10){
        alert("Your message must be greater than 10 characters")
    }
    else {
        var success = document.getElementById('success');
        success.innerText = "Thanks " + name + " for you message";
        success.style.display = 'block';
        setTimeout(function(){
            success.style.display = 'none';
        }, 4000);
    }
}
