document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigation a');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    // Intersection Observer options
    const options = {
        root: null, // Viewport is the root
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: '0px' // No margin adjustment
    };

    // Intersection Observer callback
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const targetId = entry.target.id;
            const navLink = document.querySelector(`.navigation a[href="#${targetId}"]`);

            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    };

    // Initialize Intersection Observer
    const observer = new IntersectionObserver(observerCallback, options);

    sections.forEach(section => observer.observe(section));

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle scrolling in the sidebar and scroll the main content
    sidebar.addEventListener('wheel', (e) => {
        e.preventDefault();
        const contentHeight = content.scrollHeight - content.clientHeight;
        const sidebarScrollAmount = e.deltaY;
        content.scrollTop += sidebarScrollAmount;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Create the cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // Move the cursor element based on mouse position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    // Optional: Add the "active" class when hovering over interactive elements
    const interactiveElements = document.querySelectorAll('a, section, .social-links a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active'); // Enlarge and brighten the spotlight
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active'); // Return to normal spotlight size
        });
    });
});
