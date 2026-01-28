/* ===================================
   NAVIGATION FLUIDE & ANCRES
   =================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

/* ===================================
   VALIDATION DU FORMULAIRE
   =================================== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    let isValid = true;
    let errorMessages = [];

    if (!nom) {
      isValid = false;
      errorMessages.push('Le nom est obligatoire.');
    }

    if (!prenom) {
      isValid = false;
      errorMessages.push('Le prénom est obligatoire.');
    }

    if (email && !isValidEmail(email)) {
      isValid = false;
      errorMessages.push('Veuillez entrer une adresse e-mail valide.');
    }

    if (!message) {
      isValid = false;
      errorMessages.push('Le message est obligatoire.');
    }

    if (isValid) {
      // Afficher un message de succès
      showNotification('Merci ! Votre message a été envoyé avec succès.', 'success');
      
      // Réinitialiser le formulaire
      contactForm.reset();

      // Simuler l'envoi (en production, vous enverriez les données au serveur)
      console.log({
        nom,
        prenom,
        email,
        message
      });
    } else {
      // Afficher les erreurs
      showNotification(errorMessages.join('\n'), 'error');
    }
  });
}

/* ===================================
   FONCTION DE VALIDATION EMAIL
   =================================== */

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* ===================================
   FONCTION DE NOTIFICATION
   =================================== */

function showNotification(message, type = 'info') {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Ajouter les styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      font-weight: 600;
      z-index: 1000;
      animation: slideIn 0.3s ease-in-out;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .notification-success {
      background-color: #4caf50;
      color: white;
    }

    .notification-error {
      background-color: #f44336;
      color: white;
      white-space: pre-line;
    }

    .notification-info {
      background-color: #2196f3;
      color: white;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    @media (max-width: 480px) {
      .notification {
        left: 10px;
        right: 10px;
        max-width: none;
      }
    }
  `;

  if (!document.querySelector('style[data-notifications]')) {
    style.setAttribute('data-notifications', 'true');
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Supprimer la notification après 5 secondes
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

/* ===================================
   ANIMATIONS AU SCROLL
   =================================== */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Ajouter les styles d'animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  .section {
    opacity: 0;
    animation: fadeInUp 0.6s ease-in-out forwards;
  }

  .section.fade-in {
    animation: fadeInUp 0.6s ease-in-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .formation-card {
    animation: fadeInUp 0.6s ease-in-out forwards;
  }

  .formation-card:nth-child(1) {
    animation-delay: 0s;
  }

  .formation-card:nth-child(2) {
    animation-delay: 0.1s;
  }

  .formation-card:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

document.head.appendChild(animationStyle);

/* ===================================
   ACTIVE NAV LINK
   =================================== */

window.addEventListener('scroll', () => {
  let current = '';

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Ajouter le style pour le lien actif
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-link.active {
    color: var(--accent-gold);
    border-bottom-color: var(--accent-gold);
  }

  @media (max-width: 768px) {
    .nav-link.active {
      border-left-color: var(--accent-gold);
      border-bottom: none;
    }
  }
`;

document.head.appendChild(activeStyle);

/* ===================================
   SMOOTH SCROLL POUR LES ANCRES
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
  // Gestion du scroll vers une section au chargement
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
});

/* ===================================
   MENU MOBILE
   =================================== */

// Créer un bouton hamburger pour mobile
function createMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');

  if (window.innerWidth <= 768) {
    if (!document.querySelector('.mobile-menu-btn')) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'mobile-menu-btn';
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      
      header.insertBefore(menuBtn, navbar);

      const style = document.createElement('style');
      style.textContent = `
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--light-bg);
          font-size: 1.5rem;
          cursor: pointer;
          padding: var(--spacing-md);
          position: absolute;
          right: 0;
          top: 0;
          z-index: 101;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .navbar {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }

          .navbar.active {
            max-height: 500px;
          }

          .nav-list {
            flex-direction: column;
          }
        }
      `;

      document.head.appendChild(style);

      menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
      });

      // Fermer le menu quand on clique sur un lien
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('active');
        });
      });
    }
  }
}

createMobileMenu();
window.addEventListener('resize', createMobileMenu);

/* ===================================
   INITIALISATION
   =================================== */

console.log('✅ Script ASBL Proforma chargé avec succès !');
