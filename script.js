const img_wrapper = document.getElementById("image-carousel__img-wrapper");
const  img_status_count = document.getElementById("image-status-count");
const small_dot = document.getElementsByClassName("small-dot");






const arr = [1,2,3,4,5,6,7,8];

const img_names = arr.map((value) => `images/${value}.jpg`);



for (let i=1; i<=img_names.length; i++){
    const img = document.createElement('img');
    img.setAttribute('class','image-carousel__img');
    img.setAttribute('src',img_names[i-1]);
    img_wrapper.appendChild(img) ;
    img_status_count.appendChild(small_dot);
}

var i = 0;
setInterval(() => {
    img_wrapper.style.transform = `translateX(${-i * 100}%)`;
    i < img_names.length ? i++ : i = 1;   

}, 2000);