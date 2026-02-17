// ============================================
// SABORES DEL ADSO - INTERACTIVIDAD Y ANIMACIONES
// ============================================

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    inicializarSmoothScroll();
    inicializarAnimacionesScroll();
    inicializarEfectosHover();
    inicializarContadorRegresivo();
    inicializarTooltips();
    inicializarEfectoEscritura();
    inicializarModoNoche();
    inicializarGaleriaLightbox();
    inicializarBotonArriba();
    inicializarEfectoParallax();
});

// ============================================
// 1. SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================
function inicializarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 2. ANIMACIONES AL HACER SCROLL
// ============================================
function inicializarAnimacionesScroll() {
    const elementos = document.querySelectorAll('.producto, .review, .gallery img, .galeria-instalaciones img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(elemento);
    });
}

// ============================================
// 3. EFECTOS HOVER MEJORADOS
// ============================================
function inicializarEfectosHover() {
    // Efecto para productos del menú
    document.querySelectorAll('.producto').forEach(producto => {
        producto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(139, 0, 0, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        producto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Efecto para imágenes de la galería
    document.querySelectorAll('.gallery img, .galeria-instalaciones img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            this.style.cursor = 'pointer';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// 4. CONTADOR REGRESIVO PARA OFERTAS
// ============================================
function inicializarContadorRegresivo() {
    // Crear contenedor para oferta especial
    const ofertaContainer = document.createElement('div');
    ofertaContainer.className = 'oferta-especial';
    ofertaContainer.innerHTML = `
        <div class="oferta-contenido">
            <h3>⏰ OFERTA ESPECIAL ⏰</h3>
            <p>¡2x1 en Hamburguesas todos los jueves!</p>
            <div class="contador" id="contador-oferta"></div>
        </div>
    `;
    
    // Estilos para la oferta
    const estilosOferta = document.createElement('style');
    estilosOferta.textContent = `
        .oferta-especial {
            background: linear-gradient(135deg, #8b0000, #a80000);
            color: white;
            text-align: center;
            padding: 20px;
            margin: 20px auto;
            max-width: 600px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .oferta-contenido h3 {
            margin: 0 0 10px 0;
            font-size: 24px;
        }
        
        .oferta-contenido p {
            margin: 10px 0;
            font-size: 18px;
        }
        
        .contador {
            font-size: 32px;
            font-weight: bold;
            font-family: monospace;
            background: rgba(255,255,255,0.2);
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
        }
    `;
    
    document.head.appendChild(estilosOferta);
    
    // Insertar después del hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.parentNode.insertBefore(ofertaContainer, hero.nextSibling);
    }
    
    // Configurar contador
    function actualizarContador() {
        const ahora = new Date();
        const diaJueves = 4; // 4 = jueves
        const diasHastaJueves = (diaJueves - ahora.getDay() + 7) % 7;
        
        const proximoJueves = new Date(ahora);
        proximoJueves.setDate(ahora.getDate() + diasHastaJueves);
        proximoJueves.setHours(23, 59, 59, 999);
        
        const diferencia = proximoJueves - ahora;
        
        if (diferencia <= 0) {
            document.getElementById('contador-oferta').textContent = '¡HOY ES EL DÍA!';
            return;
        }
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        const contador = document.getElementById('contador-oferta');
        if (contador) {
            contador.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        }
    }
    
    actualizarContador();
    setInterval(actualizarContador, 1000);
}

// ============================================
// 5. TOOLTIPS INFORMATIVOS
// ============================================
function inicializarTooltips() {
    const estilosTooltip = document.createElement('style');
    estilosTooltip.textContent = `
        .tooltip {
            position: relative;
            display: inline-block;
            cursor: help;
        }
        
        .tooltip .tooltip-texto {
            visibility: hidden;
            width: 200px;
            background-color: #333;
            color: white;
            text-align: center;
            border-radius: 6px;
            padding: 10px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .tooltip:hover .tooltip-texto {
            visibility: visible;
            opacity: 1;
        }
        
        .info-icon {
            color: #8b0000;
            margin-left: 5px;
            font-size: 16px;
        }
    `;
    document.head.appendChild(estilosTooltip);
    
    // Agregar tooltips a precios
    document.querySelectorAll('.nombre-precio span:last-child').forEach(precio => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = ` <i class="fas fa-info-circle info-icon"></i><span class="tooltip-texto">IVA incluido</span>`;
        precio.appendChild(tooltip);
    });
}

// ============================================
// 6. EFECTO DE ESCRITURA PARA EL TÍTULO
// ============================================
function inicializarEfectoEscritura() {
    const titulo = document.querySelector('.hero h1');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        titulo.style.minHeight = '60px';
        
        let i = 0;
        function escribir() {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(escribir, 100);
            }
        }
        
        // Iniciar efecto después de 1 segundo
        setTimeout(escribir, 1000);
    }
}

// ============================================
// 7. MODO NOCTURNO
// ============================================
function inicializarModoNoche() {
    const botonModo = document.createElement('button');
    botonModo.className = 'btn-modo-noche';
    botonModo.innerHTML = '<i class="fas fa-moon"></i>';
    botonModo.setAttribute('aria-label', 'Cambiar modo noche/día');
    
    const estilosModo = document.createElement('style');
    estilosModo.textContent = `
        .btn-modo-noche {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #8b0000;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 1000;
            font-size: 20px;
            transition: all 0.3s ease;
        }
        
        .btn-modo-noche:hover {
            transform: scale(1.1);
            background: #a80000;
        }
        
        .modo-noche {
            background: #1a1a1a !important;
            color: #ffffff !important;
        }
        
        .modo-noche .contenedor,
        .modo-noche .contenedor-menu,
        .modo-noche .review,
        .modo-noche .info {
            background: #2d2d2d !important;
            color: #ffffff !important;
        }
        
        .modo-noche h1,
        .modo-noche h2,
        .modo-noche h3 {
            color: #ff6b6b !important;
        }
        
        .modo-noche p,
        .modo-noche .ingredientes {
            color: #dddddd !important;
        }
    `;
    document.head.appendChild(estilosModo);
    document.body.appendChild(botonModo);
    
    botonModo.addEventListener('click', function() {
        document.body.classList.toggle('modo-noche');
        const icono = this.querySelector('i');
        if (document.body.classList.contains('modo-noche')) {
            icono.className = 'fas fa-sun';
        } else {
            icono.className = 'fas fa-moon';
        }
    });
}

// ============================================
// 8. GALERÍA LIGHTBOX
// ============================================
function inicializarGaleriaLightbox() {
    const estilosLightbox = document.createElement('style');
    estilosLightbox.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 2000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            justify-content: center;
            align-items: center;
        }
        
        .lightbox.activo {
            display: flex;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255,255,255,0.3);
        }
        
        .lightbox-cerrar {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: 0.3s;
        }
        
        .lightbox-cerrar:hover {
            color: #8b0000;
            transform: scale(1.2);
        }
        
        .lightbox-anterior,
        .lightbox-siguiente {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 40px;
            cursor: pointer;
            padding: 20px;
            transition: 0.3s;
        }
        
        .lightbox-anterior:hover,
        .lightbox-siguiente:hover {
            color: #8b0000;
        }
        
        .lightbox-anterior {
            left: 20px;
        }
        
        .lightbox-siguiente {
            right: 20px;
        }
    `;
    document.head.appendChild(estilosLightbox);
    
    // Crear contenedor lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-cerrar">&times;</span>
        <span class="lightbox-anterior">&#10094;</span>
        <span class="lightbox-siguiente">&#10095;</span>
        <img class="lightbox-imagen" src="" alt="">
    `;
    document.body.appendChild(lightbox);
    
    const imagenes = document.querySelectorAll('.gallery img, .galeria-instalaciones img');
    let imagenActual = 0;
    
    function abrirLightbox(index) {
        imagenActual = index;
        const img = lightbox.querySelector('.lightbox-imagen');
        img.src = imagenes[imagenActual].src;
        lightbox.classList.add('activo');
    }
    
    imagenes.forEach((img, index) => {
        img.addEventListener('click', () => abrirLightbox(index));
    });
    
    // Eventos del lightbox
    lightbox.querySelector('.lightbox-cerrar').addEventListener('click', () => {
        lightbox.classList.remove('activo');
    });
    
    lightbox.querySelector('.lightbox-anterior').addEventListener('click', () => {
        imagenActual = (imagenActual - 1 + imagenes.length) % imagenes.length;
        lightbox.querySelector('.lightbox-imagen').src = imagenes[imagenActual].src;
    });
    
    lightbox.querySelector('.lightbox-siguiente').addEventListener('click', () => {
        imagenActual = (imagenActual + 1) % imagenes.length;
        lightbox.querySelector('.lightbox-imagen').src = imagenes[imagenActual].src;
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('activo');
        }
    });
}

// ============================================
// 9. BOTÓN VOLVER ARRIBA (MEJORADO)
// ============================================
function inicializarBotonArriba() {
    const botonArriba = document.querySelector('.btn-arriba');
    if (botonArriba) {
        botonArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Efecto adicional
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// ============================================
// 10. EFECTO PARALLAX EN HERO
// ============================================
function inicializarEfectoParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
        });
    }
}

// ============================================
// 11. NOTIFICACIÓN DE BIENVENIDA
// ============================================
setTimeout(() => {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-bienvenida';
    notificacion.innerHTML = `
        <i class="fas fa-hamburger"></i>
        <p>¡Bienvenido a Sabores del ADSO!</p>
        <button class="notificacion-cerrar">&times;</button>
    `;
    
    const estilosNotif = document.createElement('style');
    estilosNotif.textContent = `
        .notificacion-bienvenida {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #8b0000;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 1500;
            animation: slideIn 0.5s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notificacion-cerrar {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0 5px;
        }
        
        .notificacion-cerrar:hover {
            color: #ffcc00;
        }
    `;
    document.head.appendChild(estilosNotif);
    
    document.body.appendChild(notificacion);
    
    // Cerrar notificación
    notificacion.querySelector('.notificacion-cerrar').addEventListener('click', () => {
        notificacion.remove();
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notificacion)) {
            notificacion.style.animation = 'slideIn 0.5s reverse';
            setTimeout(() => notificacion.remove(), 500);
        }
    }, 5000);
}, 2000);