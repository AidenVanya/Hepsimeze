document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            document.getElementById("navbar_top").classList.add("navbar-fix");
            // add padding top to show content behind navbar
            navbar_height = document.querySelector(".navbar").offsetHeight;
            document.body.style.paddingTop = navbar_height + "px";
        } else {
            document
                .getElementById("navbar_top")
                .classList.remove("navbar-fix");
            // remove padding top from body
            document.body.style.paddingTop = "0";
        }
    });
});
