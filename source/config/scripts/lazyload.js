class LazyLoad {
  constructor(element) {
    this.element = element;

    this.classLoader = 'picture--lazy';
  }

  init() {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          const img = lazyImage.querySelector('img');

          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');

          const sources = lazyImage.querySelectorAll('source');
          sources.forEach((pictureSource) => {
            const course = pictureSource;
            course.srcset = course.dataset.srcset;
            course.removeAttribute('data-srcset');
          });

          lazyImageObserver.unobserve(lazyImage);
          lazyImage.classList.remove(this.classLoader);
        }
      });
    });

    lazyImageObserver.observe(this.element);
  }
}

export default LazyLoad;
