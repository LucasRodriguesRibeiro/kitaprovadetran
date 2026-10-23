/**
 * KIT APROVA DETRAN 2026 - Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CONFIGURAÇÃO DO LINK DE CHECKOUT (KIWIFY)
  // =========================================================================
  const CHECKOUT_URL = "https://pay.kiwify.com.br/m40aIjk";

  // Configura todos os botões de ação para direcionar ao checkout ou simular
  const ctaButtons = document.querySelectorAll('a[href="#checkout"]');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Se ainda não configurou o link real, pode abrir modal de confirmação ou ir para o checkout
      if (CHECKOUT_URL.includes("SEU_CODIGO_AQUI")) {
        e.preventDefault();
        // Feedback visual amigável informando onde colar o link real
        showCheckoutNotice();
      } else {
        // Redireciona normalmente para a Kiwify
        btn.setAttribute('href', CHECKOUT_URL);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  function showCheckoutNotice() {
    let existingModal = document.getElementById('checkout-notice-modal');
    if (!existingModal) {
      const modal = document.createElement('div');
      modal.id = 'checkout-notice-modal';
      modal.innerHTML = `
        <div class="checkout-modal-overlay">
          <div class="checkout-modal-card">
            <div class="modal-icon">🚗 💨</div>
            <h3 class="modal-title">Kit Aprova Detran 2026</h3>
            <p class="modal-text">
              Pronto para baixar por apenas <strong>R$ 19,90</strong>!<br>
              <small style="color:#94a3b8; display:block; margin-top:8px;">
                (Para alterar seu link da Kiwify, edite a variável <code>CHECKOUT_URL</code> no arquivo <code>script.js</code>).
              </small>
            </p>
            <div class="modal-actions">
              <button class="btn-modal-close" id="close-modal-btn">Entendido</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Estilo inline para o aviso temporário
      const style = document.createElement('style');
      style.innerHTML = `
        .checkout-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 1rem;
        }
        .checkout-modal-card {
          background: #111726; border: 2px solid #ffb800; border-radius: 18px; padding: 2rem;
          max-width: 420px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        }
        .modal-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .modal-title { font-family: 'Outfit', sans-serif; font-size: 1.5rem; color: #fff; margin-bottom: 0.75rem; }
        .modal-text { color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; }
        .btn-modal-close {
          background: linear-gradient(180deg, #ffc700, #ff9500); color: #07090e; font-weight: 800;
          border: none; border-radius: 10px; padding: 0.8rem 1.8rem; cursor: pointer; font-size: 1rem;
        }
      `;
      document.head.appendChild(style);

      document.getElementById('close-modal-btn').addEventListener('click', () => {
        modal.remove();
      });
    }
  }


  // =========================================================================
  // 2. FAQ ACCORDION (Perguntas Frequentes)
  // =========================================================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });

      // Alterna o atual
      if (isActive) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // =========================================================================
  // 3. CONTADOR DE URGÊNCIA (15 Minutos Rolling Timer)
  // =========================================================================
  const timerElement = document.getElementById('countdown-timer');
  if (timerElement) {
    let totalSeconds = 14 * 60 + 52; // 14m 52s

    const updateTimer = () => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        totalSeconds = 15 * 60; // Reinicia sutilmente
      }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }


  // =========================================================================
  // 4. MOBILE STICKY CTA BAR
  // Mostra a barra fixa no celular somente após o usuário rolar além da dobra 2
  // =========================================================================
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');
  const offerSection = document.getElementById('oferta');
  const finalCta = document.querySelector('.final-cta-box');

  if (mobileStickyBar && offerSection) {
    const handleScroll = () => {
      const offerBottom = offerSection.getBoundingClientRect().bottom;
      const finalCtaTop = finalCta ? finalCta.getBoundingClientRect().top : 999999;
      const windowHeight = window.innerHeight;

      // Se passou da oferta principal e ainda não chegou no CTA final
      if (offerBottom < 100 && finalCtaTop > windowHeight - 80) {
        mobileStickyBar.classList.add('visible');
      } else {
        mobileStickyBar.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

});
