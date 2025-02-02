document.addEventListener('DOMContentLoaded', function(){

    crear_galeria()
    navegacion_fija()
    resaltar_enlace()
    scroll_nav()
});


function navegacion_fija(){
    const header = document.querySelector('.header')
    const sobrefestival = document.querySelector('.sobre-festival')

    document.addEventListener('scroll', function(){

        if(sobrefestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }
    })

}



function crear_galeria(){

    const cant_img = 16;
    const galeria  = document.querySelector(".galeria-imagenes")

    for (let i = 1; i<=cant_img; i++){
        const imagen = document.createElement('PICTURE') 

        imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">`;
        //Event Handler

        imagen.onclick = function(){
            mostrar_img(i);
        }

        galeria.appendChild(imagen)
    }
}

function mostrar_img(i){

    const imagen = document.createElement('PICTURE') 

    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">`;

    //generar modal

    const modal = document.createElement("DIV")
    modal.classList.add('modal')

    modal.onclick = cerrarModal;

    //btn cerrar modal

    const btn = document.createElement('BUTTON')
    btn.textContent = "X"
    btn.classList.add('btn-cerrar')
    btn.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(btn)
    //agregar al html

    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}



function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fadeOut')

    setTimeout(() => { //cuando de click se demorar medio segundo de remover
        modal?.remove()
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')

    },500)
}


function resaltar_enlace (){
    document.addEventListener('scroll', function(){
        const section = document.querySelectorAll('section')
        const navlinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        section.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                actual = section.id
            }
        })

        navlinks.forEach(link =>{
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('active')
            }
        })
    })
}

function scroll_nav(){
    const navlinks = document.querySelectorAll('.navegacion-principal a')

    navlinks.forEach(link =>{
        link.addEventListener('click', e =>{
            e.preventDefault()

            const sectionscroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionscroll)
            
            section.scrollIntoView({behavior: 'smooth'})
             


        })
    })
}