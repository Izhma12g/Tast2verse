function selectCategory(element) {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.classList.remove('selected');
    });
    element.classList.add('selected');
}