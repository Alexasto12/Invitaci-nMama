const EMAILJS_USER_ID = '9mqiGZRG14PdxJ3S3';
const EMAILJS_SERVICE_ID = 'service_s4tewxn';
const EMAILJS_TEMPLATE_ID = 'template_mxrfzio';

// Corrección para EmailJS v3
emailjs.init(EMAILJS_USER_ID);

// Datos de los planes
const plans = [
  {
    id: 1,
    title: "Día en la Costa Brava con vuelta en barco a las Illes Medes",
    description: "Disfrutaremos de un día soleado en la Costa Brava, con paseo en barco a las preciosas Illes Medes, relax en la playa y comida juntos frente al mar.",
    image: "https://xalocdive.cat/wp-content/uploads/2019/04/Islas-Medas-xalocdivingcenter.jpg"
  },
  {
    id: 2,
    title: "Día en Capdevànol en el río con comilona en una masía",
    description: "Pasaremos un día refrescante en el río de Capdevànol, rodeados de naturaleza, y después una gran comida casera en una masía típica catalana.",
    image: "https://mediaim.expedia.com/destination/3/f3a49606c5e5bd142065840df454aef5.jpg"
  }
];

// Corrección para EmailJS v3
const DESTINATARIOS = [
  "lunacarrascor@gmail.com",
  "lunandcc@gmail.com",
  "silency_flower@hotmail.com",
  "Alexasto2000@gmail.com"
];

let selectedPlan = null;
let selectedDate = "";

const bubble1 = document.getElementById('bubble1');
const bubble2 = document.getElementById('bubble2');
const planDetails = document.getElementById('planDetails');
const confirmBtn = document.getElementById('confirmBtn');
const messageDiv = document.getElementById('message');

function fadeIn(el) {
  el.classList.remove('hidden');
  el.classList.add('animate-fade-in');
  setTimeout(() => el.classList.remove('animate-fade-in'), 500);
}

function showPlanDetails(plan) {
  planDetails.innerHTML = `
    <div class="flex items-center gap-3 mb-4">
      <img src="${plan.image}" alt="${plan.title}" class="w-20 h-20 rounded-full object-cover border-2 border-teal-600 shadow-md bg-white">
      <div>
        <h2 class="text-lg font-title text-teal-800 mb-2 leading-tight">${plan.title}</h2>
        <p class="text-base text-gray-800 font-normal bg-teal-100 rounded-xl px-4 py-4 shadow-inner border-2 border-teal-400" style="font-size:1.15rem;">${plan.description}</p>
      </div>
    </div>
    <label class="block text-base text-gray-700 mb-2 mt-2" for="datePicker">Selecciona la fecha:</label>
    <input id="datePicker" type="date" min="${getToday()}" class="w-full px-4 py-3 rounded-lg border-2 border-teal-400 focus:ring-2 focus:ring-teal-400 outline-none font-normal text-gray-800 bg-white shadow-sm transition-all text-base" required>
  `;
  fadeIn(planDetails);
  document.getElementById('datePicker').addEventListener('input', (e) => {
    selectedDate = e.target.value;
    checkReady();
  });
}

function getToday() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function checkReady() {
  confirmBtn.disabled = !(selectedPlan && selectedDate);
}

bubble1.addEventListener('click', () => {
  selectedPlan = plans[0];
  bubble1.classList.add('bubble-active');
  bubble2.classList.remove('bubble-active');
  showPlanDetails(selectedPlan);
  selectedDate = "";
  checkReady();
  messageDiv.textContent = "";
});
bubble2.addEventListener('click', () => {
  selectedPlan = plans[1];
  bubble2.classList.add('bubble-active');
  bubble1.classList.remove('bubble-active');
  showPlanDetails(selectedPlan);
  selectedDate = "";
  checkReady();
  messageDiv.textContent = "";
});

confirmBtn.addEventListener('click', function() {
  if (!selectedPlan || !selectedDate) return;
  confirmBtn.disabled = true;
  messageDiv.textContent = "Enviando invitación...";
  messageDiv.className = "w-full text-center mt-4 text-base text-gray-600 font-normal";

  // Convierte la fecha a YYYYMMDD para Google Calendar y EmailJS
  const fechaGoogle = selectedDate.replace(/-/g, '');
  const fecha_es = `${fechaGoogle.slice(6,8)}/${fechaGoogle.slice(4,6)}/${fechaGoogle.slice(0,4)}`;

  // Depuración: muestra los datos que se van a enviar
  console.log('templateParams:', {
    plan: selectedPlan.title,
    fecha: fechaGoogle,
    fecha_es: fecha_es,
    mensaje: `¡Hola mamá! Has elegido: ${selectedPlan.title} para el día ${selectedDate}. ¡Será un día inolvidable en familia! Tus hijos te quieren mucho. ❤️ `,
    destinatarios: DESTINATARIOS.join(', ')
  });

  const templateParams = {
    plan: selectedPlan.title,
    fecha: fechaGoogle,
    fecha_es: fecha_es,
    mensaje: `¡Hola mamá! Has elegido: ${selectedPlan.title} para el día ${selectedDate}. ¡Será un día inolvidable en familia! Tus hijos te quieren mucho. ❤️`,
    destinatarios: DESTINATARIOS.join(', ')
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
      messageDiv.textContent = "¡Invitación enviada con éxito! 🎉";
      messageDiv.className = "w-full text-center mt-4 text-base text-green-600 font-title";
      confirmBtn.disabled = false;
    }, function(error) {
      messageDiv.textContent = "Error al enviar la invitación. Intenta de nuevo.";
      messageDiv.className = "w-full text-center mt-4 text-base text-red-600 font-title";
      confirmBtn.disabled = false;
      // Depuración: muestra el error
      console.error('EmailJS error:', error);
    });
});

// --- Caras flotantes animadas con JS ---
window.addEventListener('DOMContentLoaded', () => {
  const faces = document.querySelectorAll('.floating-face');
  const getVW = () => window.innerWidth;
  const getVH = () => window.innerHeight;
  faces.forEach((face, i) => {
    let vw = getVW();
    let vh = getVH();
    let x = Math.random() * (vw - 56);
    let y = -60;
    let speedY = 0.4 + Math.random() * 0.5;
    let speedX = (Math.random() - 0.5) * 1.2;
    let rebotes = 0;
    face.style.left = `${x}px`;
    face.style.top = `${y}px`;
    face.style.animation = 'none';
    function animate() {
      vw = getVW();
      vh = getVH();
      x += speedX;
      y += speedY;
      // Rebote en los lados
      if (x <= 0) { x = 0; speedX *= -1; }
      if (x >= vw - 56) { x = vw - 56; speedX *= -1; }
      // Rebote abajo
      if (y >= vh - 56) {
        y = vh - 56;
        speedY *= -1;
        rebotes++;
      }
      // Rebote arriba solo si ya ha rebotado abajo al menos una vez
      if (y <= 0 && rebotes > 0) {
        y = 0;
        speedY *= -1;
      }
      // Si se queda "parado" por redondeo, reiniciar
      if (Math.abs(speedY) < 0.1) speedY = 0.4 + Math.random() * 0.5;
      // Si lleva muchos rebotes, reiniciar arriba
      if (rebotes > 6) {
        y = -60;
        x = Math.random() * (vw - 56);
        speedY = 0.4 + Math.random() * 0.5;
        speedX = (Math.random() - 0.5) * 1.2;
        rebotes = 0;
      }
      face.style.left = `${x}px`;
      face.style.top = `${y}px`;
      requestAnimationFrame(animate);
    }
    animate();
  });
});
