  AOS.init({
    duration: 800,
    once: true
  });

  function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("hidden");
  }

  // Scroll effect for header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // scroll threshold
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Close other items
    faqItems.forEach(i => {
      if(i !== item) i.classList.remove('active');
    });
    // Toggle current
    item.classList.toggle('active');
  });
});

AOS.init({ duration: 800, once: true });

const contactForm = document.querySelector('.contact-form');
const alertBox = document.getElementById('customAlert');
const alertMsg = document.getElementById('alertMessage');

function showAlert(message) {
  alertMsg.textContent = message;
  alertBox.classList.remove('hidden');

  // Trigger AOS animation
  alertBox.setAttribute('data-aos', 'zoom-in');
  AOS.refresh(); 
}

function closeAlert() {
  alertBox.classList.add('hidden');
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Pehle default submit roko

  // --- VALIDATION START ---
  const nameInput = contactForm.querySelector('input[name="name"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');
  const nameValue = nameInput.value.trim();
  const messageValue = messageInput.value.trim();
  
  // Name Validation: Min 3 chars, Alphabets only
  const nameRegex = /^[a-zA-Z\s]{3,50}$/; 
  if (!nameRegex.test(nameValue)) {
      showAlert("Please enter a valid name (at least 3 characters, alphabets only).");
      nameInput.focus();
      return; // Yahin se wapas mud jao, aage mat badho
  }

  // Message Validation: Min 10 chars
  if (messageValue.length < 10) {
      showAlert("Your message is too short. Please enter at least 10 characters.");
      messageInput.focus();
      return; // Yahin se wapas mud jao
  }
  // --- VALIDATION END ---

  // Agar validation pass ho gayi, tab niche wala Fetch code chalega
  const formData = new FormData(contactForm);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();

    if (response.status === 200) {
      showAlert('Thank you! Your message has been sent.');
      contactForm.reset();
    } else {
      showAlert('Oops! ' + (result.message || 'Something went wrong.'));
    }
  } catch (error) {
    showAlert('Error! Please check your internet connection.');
  }
});

const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  // Agar scroll 400px se zyada ho to 'show' class add karo
  if (window.scrollY > 400) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

