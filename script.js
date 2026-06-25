// Modal Logic (Contact Form)
const modalOverlay = document.getElementById('contact-modal-overlay');
const modal = document.getElementById('contact-modal');
const successMessage = document.getElementById('success-message');
const contactFormView = document.getElementById('modal-form-view');
const contactForm = document.getElementById('contact-form');

function openModal() {
    modalOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        modalOverlay.classList.remove('modal-overlay-enter');
        modalOverlay.classList.add('modal-overlay-enter-active');
        modal.classList.remove('modal-enter');
        modal.classList.add('modal-enter-active');
    });
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('modal-overlay-enter-active');
    modalOverlay.classList.add('modal-overlay-exit-active');
    modal.classList.remove('modal-enter-active');
    modal.classList.add('modal-exit-active');

    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        modalOverlay.classList.remove('modal-overlay-exit-active');
        modalOverlay.classList.add('modal-overlay-enter');
        modal.classList.remove('modal-exit-active');
        modal.classList.add('modal-enter');
        document.body.style.overflow = '';

        setTimeout(() => {
            contactForm.reset();
            contactFormView.classList.remove('hidden');
            successMessage.classList.add('hidden');
            successMessage.classList.remove('flex');
        }, 300);
    }, 300);
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.getElementById('close-modal-btn').addEventListener('click', closeModal);

// Formspree Integration Logic
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };

document.addEventListener("DOMContentLoaded", () => {
    formspree('initForm', {
        formElement: '#contact-form',
        formId: 'xaqlrldp',
        onSuccess: function () {
            contactFormView.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.classList.add('flex');
        }
    });
});

// Resume Modal Logic
const resumeModalOverlay = document.getElementById('resume-modal-overlay');
const resumeModal = document.getElementById('resume-modal');

function openResumeModal() {
    resumeModalOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        resumeModalOverlay.classList.remove('modal-overlay-enter');
        resumeModalOverlay.classList.add('modal-overlay-enter-active');
        resumeModal.classList.remove('modal-enter');
        resumeModal.classList.add('modal-enter-active');
    });
    document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
    resumeModalOverlay.classList.remove('modal-overlay-enter-active');
    resumeModalOverlay.classList.add('modal-overlay-exit-active');
    resumeModal.classList.remove('modal-enter-active');
    resumeModal.classList.add('modal-exit-active');

    setTimeout(() => {
        resumeModalOverlay.classList.add('hidden');
        resumeModalOverlay.classList.remove('modal-overlay-exit-active');
        resumeModalOverlay.classList.add('modal-overlay-enter');
        resumeModal.classList.remove('modal-exit-active');
        resumeModal.classList.add('modal-enter');
        if (modalOverlay.classList.contains('hidden')) {
            document.body.style.overflow = '';
        }
    }, 300);
}

resumeModalOverlay.addEventListener('click', (e) => {
    if (e.target === resumeModalOverlay) closeResumeModal();
});

// Toast Notification Logic
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;

    toast.classList.remove('-translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-24', 'opacity-0');
    }, 3000);
}

// Download Resume Logic
async function downloadResume() {
    const url = 'https://i.ibb.co/tTb1kxp8/Resume-20260411-192831-0000.png';
    const fileName = 'Priya_Udayakumar_Resume.png';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        showToast('Downloaded successfully!');
    } catch (error) {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showToast('Downloaded successfully!');
    }
}

// Global keydown event
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!modalOverlay.classList.contains('hidden')) closeModal();
        if (!resumeModalOverlay.classList.contains('hidden')) closeResumeModal();
    }
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

btn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Typewriter Effect
const textArray = ["Final Year B.Tech CSE", "Aspiring Developer", "AI Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById("typewriter");

function type() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
        typeTarget.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Splash Screen and Initialization
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const splashProgress = document.getElementById('splash-progress');
    const words = ['FRONTEND', 'PYTHON', 'FLUTTER'];
    let wordIndex = 1;

    if (!splashScreen || !splashText || !splashProgress) {
        renderProjects();
        renderTechLanguages();
        renderTechFrameworks();
        renderEducation();
        if (document.getElementById("typewriter")) setTimeout(type, 500);
        return;
    }

    if (sessionStorage.getItem('splashShown')) {
        splashScreen.style.display = 'none';
        document.body.style.overflow = '';
        renderProjects();
        renderTechLanguages();
        renderTechFrameworks();
        renderEducation();
        if (document.getElementById("typewriter")) setTimeout(type, 500);
        return;
    }

    sessionStorage.setItem('splashShown', 'true');
    document.body.style.overflow = 'hidden';

    function updateFontSize(word) {
        const screenWidth = window.innerWidth;
        let sizeClass;

        if (word.length > 5) {
            if (screenWidth < 640) sizeClass = '3.5rem';
            else if (screenWidth < 768) sizeClass = '6rem';
            else if (screenWidth < 1024) sizeClass = '8rem';
            else sizeClass = '11rem';
        } else {
            if (screenWidth < 640) sizeClass = '5rem';
            else if (screenWidth < 768) sizeClass = '8rem';
            else if (screenWidth < 1024) sizeClass = '12rem';
            else sizeClass = '15rem';
        }

        splashText.style.setProperty('--dynamic-size', sizeClass);
    }

    updateFontSize('FRONTEND');

    window.addEventListener('resize', () => {
        if (document.getElementById('splash-screen')) {
            const currentWord = splashText.textContent.trim().toLowerCase();
            updateFontSize(currentWord);
        }
    });

    splashProgress.style.width = `${(1 / words.length) * 100}%`;

    const splashInterval = setInterval(() => {
        if (wordIndex < words.length) {
            splashText.classList.remove('scale-100', 'opacity-100', 'blur-0');
            splashText.classList.add('scale-90', 'opacity-0', 'blur-sm');

            setTimeout(() => {
                const nextWord = words[wordIndex];
                splashText.textContent = nextWord;
                updateFontSize(nextWord);

                splashText.classList.remove('scale-90', 'opacity-0', 'blur-sm');
                splashText.classList.add('scale-100', 'opacity-100', 'blur-0');

                wordIndex++;
                splashProgress.style.width = `${(wordIndex / words.length) * 100}%`;
            }, 150);
        } else {
            clearInterval(splashInterval);
            setTimeout(() => {
                splashScreen.classList.add('-translate-y-full');
                document.body.style.overflow = '';

                setTimeout(() => {
                    splashScreen.remove();
                    renderProjects();
                    renderTechLanguages();
                    renderTechFrameworks();
                    renderEducation();
                    setTimeout(type, 500);
                }, 600);
            }, 300);
        }
    }, 400);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashScreen);
} else {
    initSplashScreen();
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
});

// Admin Backdoor Data & UI Rendering
const ADMIN_SECRET_SEQUENCE = atob('cHJpeWF1');
const ADMIN_MASTER_KEY = atob('MDIxMTI0Mg==');
const SUPABASE_URL = atob('aHR0cHM6Ly9peXFtcXpoanhxbXN3dWZsbXNlei5zdXBhYmFzZS5jbw==');
const SUPABASE_ANON_KEY = atob('ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW1sNWNXMXhlbWhxZUhGdGMzZDFabXh0YzJWNklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzT0RJek9UWXpPRElzSW1WNGNDSTZNakE1TnprM01qTTRNbjAuMi1YeDN3SDBacXBJTkJnZ2wyTGNOSXJrVWxCNElZM1ZUeHhrNzFocUJsUQ==');
let supabaseClient = null;
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.warn('Supabase library unavailable');
    }
} catch (supabaseError) {
    console.warn('Supabase initialization failed:', supabaseError);
    supabaseClient = null;
}
let keySequenceBuffer = '';
let adminStageOneUnlocked = false;

function triggerAdminPasswordPrompt() {
    openAdminPrompt();
}

const adminOverlay = document.getElementById('admin-overlay');
const adminProjectItems = document.getElementById('admin-project-items');
const adminLanguageItems = document.getElementById('admin-language-items');
const adminFrameworkItems = document.getElementById('admin-framework-items');
const adminEducationItems = document.getElementById('admin-education-items');
const addProjectBtn = document.getElementById('add-project-btn');
const addLanguageBtn = document.getElementById('add-language-btn');
const addFrameworkBtn = document.getElementById('add-framework-btn');
const addEducationBtn = document.getElementById('add-education-btn');

const adminState = {
    projects: [],
    languages: [],
    frameworks: [],
    education: [],
    certifications: [],
    resumeUrl: ''
};

async function loadSupabaseData() {
    if (!supabaseClient) {
        renderProjects();
        renderTechLanguages();
        renderTechFrameworks();
        renderEducation();
        if (typeof renderCertifications === 'function') renderCertifications();
        return;
    }

    try {
        const { data: projects, error: pErr } = await supabaseClient.from('projects').select('*').order('created_at', { ascending: true });
        if (!pErr && projects) {
            adminState.projects = projects.map(p => ({
                ...p,
                tags: Array.isArray(p.tags) ? p.tags : typeof p.tags === 'string' ? p.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
                github_link: p.github_link || '',
                demo_link: p.demo_link || ''
            }));
        }

        const { data: languages, error: lErr } = await supabaseClient.from('languages').select('*').order('created_at', { ascending: true });
        if (!lErr && languages) adminState.languages = languages;

        const { data: frameworks, error: fErr } = await supabaseClient.from('frameworks').select('*').order('created_at', { ascending: true });
        if (!fErr && frameworks) adminState.frameworks = frameworks;

        const { data: education, error: eErr } = await supabaseClient.from('education').select('*').order('created_at', { ascending: true });
        if (!eErr && education) adminState.education = education;

        const { data: certifications, error: cErr } = await supabaseClient.from('certifications').select('*').order('created_at', { ascending: true });
        if (!cErr && certifications) adminState.certifications = certifications;

        const { data: settings, error: sErr } = await supabaseClient.from('settings').select('*');
        if (!sErr && settings) {
            const resumeSetting = settings.find(s => s.key === 'resume_url');
            if (resumeSetting) adminState.resumeUrl = resumeSetting.value;
        }
    } catch (error) {
        console.warn('Supabase load failed:', error);
    }

    renderProjects();
    renderTechLanguages();
    renderTechFrameworks();
    renderEducation();
    if (typeof renderCertifications === 'function') renderCertifications();
    updateResumeLinks();
}

function updateResumeLinks() {
    const adminResumeInput = document.getElementById('admin-resume-input');
    if (adminResumeInput) adminResumeInput.value = adminState.resumeUrl;

    // We update all static resume buttons to open the new URL
    document.querySelectorAll('[onclick="openResumeModal()"]').forEach(btn => {
        // We will just update the modal image
    });

    const resumeImage = document.querySelector('#resume-modal img');
    if (resumeImage) resumeImage.src = adminState.resumeUrl;
}

async function saveProject(index) {
    const project = adminState.projects[index];
    if (!project) return;

    const payload = {
        title: project.title,
        description: project.description,
        tags: project.tags,
        image: project.image,
        github_link: project.github_link || '',
        demo_link: project.demo_link || ''
    };

    try {
        if (!supabaseClient) return;
        if (project.id) {
            const { error } = await supabaseClient.from('projects').update(payload).eq('id', project.id);
            if (error) throw error;
        } else {
            const { data, error } = await supabaseClient.from('projects').insert(payload).select('id').single();
            if (error) throw error;
            if (data?.id) project.id = data.id;
        }
        showToast('Project saved.');
    } catch (error) {
        console.warn('Supabase project save failed:', error);
        alert('Failed to save project: ' + (error.message || JSON.stringify(error)));
        throw error;
    }
}

async function deleteProject(index) {
    const project = adminState.projects[index];
    if (!project) return;
    if (project.id && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('projects').delete().eq('id', project.id);
            if (error) throw error;
        } catch (error) {
            console.warn('Supabase project delete failed:', error);
        }
    }
    adminState.projects.splice(index, 1);
    renderAdminItems();
    renderProjects();
}

async function saveLanguage(index) {
    const lang = adminState.languages[index];
    if (!lang) return;
    const payload = { name: lang.name };
    try {
        if (!supabaseClient) return;
        if (lang.id) {
            const { error } = await supabaseClient.from('languages').update(payload).eq('id', lang.id);
            if (error) throw error;
        } else {
            const { data, error } = await supabaseClient.from('languages').insert(payload).select('id').single();
            if (error) throw error;
            if (data?.id) lang.id = data.id;
        }
        showToast('Language saved.');
    } catch (error) {
        alert('Failed to save language: ' + (error.message || JSON.stringify(error)));
        throw error;
    }
}

async function deleteLanguage(index) {
    const lang = adminState.languages[index];
    if (!lang) return;
    if (lang.id && supabaseClient) {
        await supabaseClient.from('languages').delete().eq('id', lang.id);
    }
    adminState.languages.splice(index, 1);
    renderAdminItems();
    renderTechLanguages();
}

async function saveFramework(index) {
    const framework = adminState.frameworks[index];
    if (!framework) return;
    const payload = { name: framework.name };
    try {
        if (!supabaseClient) return;
        if (framework.id) {
            const { error } = await supabaseClient.from('frameworks').update(payload).eq('id', framework.id);
            if (error) throw error;
        } else {
            const { data, error } = await supabaseClient.from('frameworks').insert(payload).select('id').single();
            if (error) throw error;
            if (data?.id) framework.id = data.id;
        }
        showToast('Framework saved.');
    } catch (error) {
        alert('Failed to save framework: ' + (error.message || JSON.stringify(error)));
        throw error;
    }
}

async function deleteFramework(index) {
    const framework = adminState.frameworks[index];
    if (!framework) return;
    if (framework.id && supabaseClient) {
        await supabaseClient.from('frameworks').delete().eq('id', framework.id);
    }
    adminState.frameworks.splice(index, 1);
    renderAdminItems();
    renderTechFrameworks();
}

async function saveEducation(index) {
    const edu = adminState.education[index];
    if (!edu) return;
    const payload = { duration: edu.duration, degree: edu.degree, institution: edu.institution, status: edu.status };
    try {
        if (!supabaseClient) return;
        if (edu.id) {
            const { error } = await supabaseClient.from('education').update(payload).eq('id', edu.id);
            if (error) throw error;
        } else {
            const { data, error } = await supabaseClient.from('education').insert(payload).select('id').single();
            if (error) throw error;
            if (data?.id) edu.id = data.id;
        }
        showToast('Education saved.');
    } catch (error) {
        alert('Failed to save education: ' + (error.message || JSON.stringify(error)));
        throw error;
    }
}

async function deleteEducation(index) {
    const edu = adminState.education[index];
    if (!edu) return;
    if (edu.id && supabaseClient) {
        await supabaseClient.from('education').delete().eq('id', edu.id);
    }
    adminState.education.splice(index, 1);
    renderAdminItems();
    renderEducation();
}

async function saveCertification(index) {
    const cert = adminState.certifications[index];
    if (!cert) return;
    const payload = { title: cert.title, issuer: cert.issuer, date: cert.date, description: cert.description, icon: cert.icon, link: cert.link };
    try {
        if (!supabaseClient) return;
        if (cert.id) {
            const { error } = await supabaseClient.from('certifications').update(payload).eq('id', cert.id);
            if (error) throw error;
        } else {
            const { data, error } = await supabaseClient.from('certifications').insert(payload).select('id').single();
            if (error) throw error;
            if (data?.id) cert.id = data.id;
        }
        showToast('Certification saved.');
    } catch (error) {
        alert('Failed to save certification: ' + (error.message || JSON.stringify(error)));
        throw error;
    }
}

async function deleteCertification(index) {
    const cert = adminState.certifications[index];
    if (!cert) return;
    if (cert.id && supabaseClient) {
        await supabaseClient.from('certifications').delete().eq('id', cert.id);
    }
    adminState.certifications.splice(index, 1);
    renderAdminItems();
    if (typeof renderCertifications === 'function') renderCertifications();
}

async function saveSettings() {
    try {
        if (!supabaseClient) return;

        const { data: existing, error: findError } = await supabaseClient.from('settings').select('id').eq('key', 'resume_url').single();
        if (findError && findError.code !== 'PGRST116') throw findError; // PGRST116 is "no rows returned"

        if (existing) {
            const { error } = await supabaseClient.from('settings').update({ value: adminState.resumeUrl }).eq('key', 'resume_url');
            if (error) throw error;
        } else {
            const { error } = await supabaseClient.from('settings').insert({ key: 'resume_url', value: adminState.resumeUrl });
            if (error) throw error;
        }
        showToast('Settings saved.');
        updateResumeLinks();
    } catch (error) {
        alert('Failed to save settings: ' + (error.message || JSON.stringify(error)));
        throw error;
    }
}

function renderTechLanguages() {
    const techLanguagesList = document.getElementById('tech-languages-list');
    if (!techLanguagesList) return;
    techLanguagesList.innerHTML = adminState.languages.map((skill) => `
                <span class="px-4 py-2 bg-cardBg border border-cardBorder rounded-lg text-accent text-sm font-semibold">${skill.name || skill}</span>
            `).join('');
}

function renderTechFrameworks() {
    const techFrameworksList = document.getElementById('tech-frameworks-list');
    if (!techFrameworksList) return;
    techFrameworksList.innerHTML = adminState.frameworks.map((skill) => `
                <span class="px-4 py-2 bg-cardBg border border-cardBorder rounded-lg text-accent text-sm font-semibold">${skill.name || skill}</span>
            `).join('');
}

function renderEducation() {
    const educationList = document.getElementById('education-list');
    if (!educationList) return;
    educationList.innerHTML = adminState.education.map((item) => `
                <div class="bg-cardBg border border-cardBorder p-6 rounded-2xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-accent opacity-5 rounded-bl-full"></div>
                    <span class="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-3 uppercase tracking-wide">${item.duration}</span>
                    <h3 class="text-xl font-bold text-textMain mb-1">${item.degree}</h3>
                    <h4 class="text-textMuted font-medium mb-4">${item.institution}</h4>
                    <div class="flex items-center gap-2 text-accent font-semibold text-sm">
                        <div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        ${item.status}
                    </div>
                </div>
            `).join('');
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    projectsGrid.innerHTML = adminState.projects.slice(0, 3).map((project) => `
                <div class="bg-cardBg rounded-2xl overflow-hidden border border-cardBorder group hover:-translate-y-1 transition-all duration-300 animate-on-scroll">
                    <div class="h-40 overflow-hidden bg-baseAlt relative">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100">
                    </div>
                    <div class="p-6 flex flex-col h-[calc(100%-10rem)]">
                        <h3 class="text-lg font-bold text-textMain mb-2 group-hover:text-accent">${project.title}</h3>
                        <p class="text-textMuted text-sm mb-4 line-clamp-2">${project.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">${project.tags.map((tag) => `<span class="text-accent text-xs font-semibold px-2 py-1 bg-accent/10 rounded">${tag}</span>`).join('')}</div>
                        <div class="mt-auto flex items-center gap-3 pt-2 border-t border-cardBorder/50">
                            ${project.github_link ? `<a href="${project.github_link}" target="_blank" class="flex items-center justify-center bg-baseAlt hover:bg-accent/20 text-textMain hover:text-accent rounded-full p-2 transition-colors"><i class="fab fa-github text-xl"></i></a>` : ''}
                            ${project.demo_link ? `<a href="${project.demo_link}" target="_blank" class="flex-1 text-center bg-accent text-black font-bold py-2 rounded-xl hover:bg-accentHover transition-colors text-sm">Live Demo <i class="fas fa-external-link-alt ml-1"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');

    projectsGrid.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });
}

function showAdminPanel() {
    adminOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderAdminItems();
}

function closeAdminPanel() {
    adminOverlay.classList.add('hidden');
    if (modalOverlay.classList.contains('hidden') && resumeModalOverlay.classList.contains('hidden')) {
        document.body.style.overflow = '';
    }
}

function renderAdminItems() {
    adminProjectItems.innerHTML = adminState.projects.map((project, index) => `
                <div class="admin-section-card rounded-3xl border border-cardBorder p-4 space-y-4">
                    <div class="flex items-center justify-between gap-4">
                        <h4 class="text-lg font-bold text-textMain">Project ${index + 1}</h4>
                        <button data-remove-project="${index}" class="text-red-400 hover:text-red-200 font-semibold">Remove</button>
                    </div>
                    <div class="grid gap-4">
                        <input data-project-field="title" data-project-index="${index}" value="${project.title}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Title">
                        <textarea data-project-field="description" data-project-index="${index}" rows="3" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Description">${project.description}</textarea>
                        <input data-project-field="tags" data-project-index="${index}" value="${project.tags.join(', ')}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Tags, comma separated">
                        <div class="space-y-2">
                            <label class="text-sm text-textMuted">Upload image</label>
                            <input type="file" data-project-image-upload data-project-index="${index}" accept="image/*" class="w-full text-sm text-textMain" />
                        </div>
                        <input data-project-field="image" data-project-index="${index}" value="${project.image}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Image URL">
                        <input data-project-field="github_link" data-project-index="${index}" value="${project.github_link || ''}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="GitHub URL (optional)">
                        <input data-project-field="demo_link" data-project-index="${index}" value="${project.demo_link || ''}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Live Demo URL (optional)">
                    </div>
                </div>
            `).join('');

    adminLanguageItems.innerHTML = adminState.languages.map((skill, index) => `
                <div class="admin-tag">
                    <input data-language-index="${index}" class="bg-transparent outline-none text-textMain text-sm w-full" value="${skill.name}" placeholder="Language">
                    <button data-remove-language="${index}" class="text-red-400 hover:text-red-200 pr-2">×</button>
                </div>
            `).join('');

    adminFrameworkItems.innerHTML = adminState.frameworks.map((skill, index) => `
                <div class="admin-tag">
                    <input data-framework-index="${index}" class="bg-transparent outline-none text-textMain text-sm w-full" value="${skill.name}" placeholder="Framework / Tool">
                    <button data-remove-framework="${index}" class="text-red-400 hover:text-red-200 pr-2">×</button>
                </div>
            `).join('');

    adminEducationItems.innerHTML = adminState.education.map((item, index) => `
                <div class="admin-section-card rounded-3xl border border-cardBorder p-4 space-y-4">
                    <div class="flex items-center justify-between gap-4">
                        <h4 class="text-lg font-bold text-textMain">Education ${index + 1}</h4>
                        <button data-remove-education="${index}" class="text-red-400 hover:text-red-200 font-semibold">Remove</button>
                    </div>
                    <div class="grid gap-4">
                        <input data-education-field="duration" data-education-index="${index}" value="${item.duration}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Duration">
                        <input data-education-field="degree" data-education-index="${index}" value="${item.degree}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Degree">
                        <input data-education-field="institution" data-education-index="${index}" value="${item.institution}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Institution">
                        <input data-education-field="status" data-education-index="${index}" value="${item.status}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Status">
                    </div>
                </div>
            `).join('');

    const adminCertificationItems = document.getElementById('admin-certification-items');
    if (adminCertificationItems) {
        adminCertificationItems.innerHTML = adminState.certifications.map((item, index) => `
                <div class="admin-section-card rounded-3xl border border-cardBorder p-4 space-y-4">
                    <div class="flex items-center justify-between gap-4">
                        <h4 class="text-lg font-bold text-textMain">Certification ${index + 1}</h4>
                        <button data-remove-certification="${index}" class="text-red-400 hover:text-red-200 font-semibold">Remove</button>
                    </div>
                    <div class="grid gap-4">
                        <input data-certification-field="title" data-certification-index="${index}" value="${item.title}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Title">
                        <input data-certification-field="issuer" data-certification-index="${index}" value="${item.issuer}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Issuer">
                        <input data-certification-field="date" data-certification-index="${index}" value="${item.date}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Date">
                        <textarea data-certification-field="description" data-certification-index="${index}" rows="2" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Description">${item.description}</textarea>
                        <input data-certification-field="icon" data-certification-index="${index}" value="${item.icon}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="FontAwesome Icon (e.g., fab fa-react)">
                        <input data-certification-field="link" data-certification-index="${index}" value="${item.link}" class="admin-input w-full px-4 py-3 rounded-xl text-textMain outline-none" placeholder="Link">
                    </div>
                </div>
            `).join('');
    }
}

function updateAdminState(e) {
    const target = e.target;
    if (!target) return;

    if (target.dataset.projectField) {
        const index = Number(target.dataset.projectIndex);
        const field = target.dataset.projectField;
        if (field === 'tags') {
            adminState.projects[index].tags = target.value.split(',').map((tag) => tag.trim()).filter(Boolean);
        } else {
            adminState.projects[index][field] = target.value;
        }
        renderProjects();
    }

    if (typeof target.dataset.languageIndex !== 'undefined') {
        const index = Number(target.dataset.languageIndex);
        adminState.languages[index] = { ...adminState.languages[index], name: target.value };
        renderTechLanguages();
    }

    if (typeof target.dataset.frameworkIndex !== 'undefined') {
        const index = Number(target.dataset.frameworkIndex);
        adminState.frameworks[index] = { ...adminState.frameworks[index], name: target.value };
        renderTechFrameworks();
    }

    if (typeof target.dataset.educationIndex !== 'undefined') {
        const index = Number(target.dataset.educationIndex);
        const field = target.dataset.educationField;
        adminState.education[index][field] = target.value;
        renderEducation();
    }

    if (typeof target.dataset.certificationIndex !== 'undefined') {
        const index = Number(target.dataset.certificationIndex);
        const field = target.dataset.certificationField;
        adminState.certifications[index][field] = target.value;
        if (typeof renderCertifications === 'function') renderCertifications();
    }

    if (target.id === 'admin-resume-input') {
        adminState.resumeUrl = target.value;
        updateResumeLinks();
    }
}

function handleImageUpload(file, index) {
    if (!file || !adminState.projects[index]) return;
    const reader = new FileReader();
    reader.onload = function (event) {
        adminState.projects[index].image = event.target.result;
        renderProjects();
        renderAdminItems();
    };
    reader.readAsDataURL(file);
}

function handleAdminBlur(e) {
    const target = e.target;
    if (!target) return;

    if (target.dataset.projectField) saveProject(Number(target.dataset.projectIndex));
    if (typeof target.dataset.languageIndex !== 'undefined') saveLanguage(Number(target.dataset.languageIndex));
    if (typeof target.dataset.frameworkIndex !== 'undefined') saveFramework(Number(target.dataset.frameworkIndex));
    if (typeof target.dataset.educationIndex !== 'undefined') saveEducation(Number(target.dataset.educationIndex));
    if (typeof target.dataset.certificationIndex !== 'undefined') saveCertification(Number(target.dataset.certificationIndex));
    if (target.id === 'admin-resume-input') saveSettings();
}

function addProject() {
    adminState.projects.push({
        id: null,
        title: 'New Project',
        description: 'Project description goes here.',
        tags: ['HTML', 'CSS'],
        image: 'https://via.placeholder.com/400x240.png?text=Project+Image',
    });
    renderAdminItems();
    renderProjects();
    saveProject(adminState.projects.length - 1);
}

function addLanguage() {
    adminState.languages.push({ id: null, name: 'New Language' });
    renderAdminItems();
    renderTechLanguages();
    saveLanguage(adminState.languages.length - 1);
}

function addFramework() {
    adminState.frameworks.push({ id: null, name: 'New Tool' });
    renderAdminItems();
    renderTechFrameworks();
    saveFramework(adminState.frameworks.length - 1);
}

function addEducation() {
    adminState.education.push({
        id: null,
        duration: '2024 - 2028',
        degree: 'New Degree',
        institution: 'New Institution',
        status: 'Status',
    });
    renderAdminItems();
    renderEducation();
    saveEducation(adminState.education.length - 1);
}

function addCertification() {
    adminState.certifications.push({
        id: null,
        title: 'New Certification',
        issuer: 'Issuer',
        date: '2024',
        description: 'Description...',
        icon: 'fas fa-certificate',
        link: '#'
    });
    renderAdminItems();
    if (typeof renderCertifications === 'function') renderCertifications();
    saveCertification(adminState.certifications.length - 1);
}

document.addEventListener('click', async (e) => {
    if (e.target.closest('#close-admin-btn') || e.target.closest('#close-admin-bottom-btn')) {
        closeAdminPanel();
    }

    const projectRemove = e.target.closest('[data-remove-project]');
    if (projectRemove) {
        const index = Number(projectRemove.dataset.removeProject);
        await deleteProject(index);
        return;
    }

    const languageRemove = e.target.closest('[data-remove-language]');
    if (languageRemove) {
        const index = Number(languageRemove.dataset.removeLanguage);
        adminState.languages.splice(index, 1);
        renderAdminItems();
        renderTechLanguages();
        return;
    }

    const frameworkRemove = e.target.closest('[data-remove-framework]');
    if (frameworkRemove) {
        const index = Number(frameworkRemove.dataset.removeFramework);
        adminState.frameworks.splice(index, 1);
        renderAdminItems();
        renderTechFrameworks();
        return;
    }

    const educationRemove = e.target.closest('[data-remove-education]');
    if (educationRemove) {
        const index = Number(educationRemove.dataset.removeEducation);
        await deleteEducation(index);
        return;
    }

    const certificationRemove = e.target.closest('[data-remove-certification]');
    if (certificationRemove) {
        const index = Number(certificationRemove.dataset.removeCertification);
        await deleteCertification(index);
        return;
    }
});

adminProjectItems.addEventListener('input', updateAdminState);
adminProjectItems.addEventListener('change', (e) => {
    const target = e.target;
    if (target.dataset.projectImageUpload) {
        const index = Number(target.dataset.projectIndex);
        handleImageUpload(target.files ? target.files[0] : null, index);
    }
});
adminProjectItems.addEventListener('focusout', handleAdminBlur);
adminLanguageItems.addEventListener('input', updateAdminState);
adminLanguageItems.addEventListener('focusout', handleAdminBlur);
adminFrameworkItems.addEventListener('input', updateAdminState);
adminFrameworkItems.addEventListener('focusout', handleAdminBlur);
adminEducationItems.addEventListener('input', updateAdminState);
adminEducationItems.addEventListener('focusout', handleAdminBlur);

const adminCertificationItems = document.getElementById('admin-certification-items');
if (adminCertificationItems) {
    adminCertificationItems.addEventListener('input', updateAdminState);
    adminCertificationItems.addEventListener('focusout', handleAdminBlur);
}
const adminResumeInput = document.getElementById('admin-resume-input');
if (adminResumeInput) {
    adminResumeInput.addEventListener('input', updateAdminState);
    adminResumeInput.addEventListener('focusout', handleAdminBlur);
}

addProjectBtn.addEventListener('click', addProject);
addLanguageBtn.addEventListener('click', addLanguage);
addFrameworkBtn.addEventListener('click', addFramework);
addEducationBtn.addEventListener('click', addEducation);

const addCertificationBtn = document.getElementById('add-certification-btn');
if (addCertificationBtn) addCertificationBtn.addEventListener('click', addCertification);

const adminSaveAllBtn = document.getElementById('admin-save-all-btn');
if (adminSaveAllBtn) adminSaveAllBtn.addEventListener('click', saveAllAdminData);

async function saveAllAdminData() {
    if (!supabaseClient) {
        alert('Supabase is not connected. Cannot save data.');
        return;
    }

    if (adminSaveAllBtn) {
        adminSaveAllBtn.innerText = 'Saving...';
        adminSaveAllBtn.disabled = true;
    }

    try {
        for (let i = 0; i < adminState.projects.length; i++) await saveProject(i);
        for (let i = 0; i < adminState.languages.length; i++) await saveLanguage(i);
        for (let i = 0; i < adminState.frameworks.length; i++) await saveFramework(i);
        for (let i = 0; i < adminState.education.length; i++) await saveEducation(i);
        if (typeof saveCertification === 'function') {
            for (let i = 0; i < adminState.certifications.length; i++) await saveCertification(i);
        }
        await saveSettings();

        alert('All changes saved successfully to the database!');
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data. Check console for details.');
    }

    if (adminSaveAllBtn) {
        adminSaveAllBtn.innerText = 'Save All Changes';
        adminSaveAllBtn.disabled = false;
    }
}

function openAdminPrompt() {
    const enteredKey = prompt('Developer access requested. Enter Master Key:');
    if (enteredKey === ADMIN_MASTER_KEY) {
        showAdminPanel();
    } else if (enteredKey !== null) {
        alert('Incorrect master key.');
    }
    adminStageOneUnlocked = false;
    keySequenceBuffer = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key.length === 1) {
        keySequenceBuffer += e.key.toLowerCase();
        const maxLength = Math.max(ADMIN_SECRET_SEQUENCE.length, ADMIN_MASTER_KEY.length);
        if (keySequenceBuffer.length > maxLength) {
            keySequenceBuffer = keySequenceBuffer.slice(-maxLength);
        }

        if (!adminStageOneUnlocked && keySequenceBuffer.endsWith(ADMIN_SECRET_SEQUENCE)) {
            adminStageOneUnlocked = true;
            triggerAdminPasswordPrompt();
        }

        if (adminStageOneUnlocked && keySequenceBuffer.endsWith(ADMIN_MASTER_KEY)) {
            showAdminPanel();
            adminStageOneUnlocked = false;
            keySequenceBuffer = '';
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!adminOverlay.classList.contains('hidden')) closeAdminPanel();
    }
});

let tapCount = 0;
let tapTimeout;
document.addEventListener('DOMContentLoaded', () => {
    loadSupabaseData();

    const homeSection = document.getElementById('home');
    if (homeSection) {
        // Use pointerdown to avoid mobile double-tap click delays
        homeSection.addEventListener('pointerdown', () => {
            tapCount++;
            if (tapCount >= 10) {
                tapCount = 0;
                openAdminPrompt();
            }
            clearTimeout(tapTimeout);
            // Increased to 2 seconds so people don't lose their streak easily
            tapTimeout = setTimeout(() => { tapCount = 0; }, 2000);
        });
    }
});