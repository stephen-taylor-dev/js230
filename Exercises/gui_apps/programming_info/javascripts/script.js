const MAX_CHARS = 120;

document.addEventListener('DOMContentLoaded', () => {
  populateLanguages();
});

function populateLanguages() {
  languages.forEach(language => {
    const h2 = document.createElement('h2');
    h2.textContent = `${language.name}`;

    const p = document.createElement('p');
    p.textContent = getSubDescription(language.description);


    const button = document.createElement('button');
    button.className = 'show-more';
    button.textContent = 'Show More';
    button.dataset.languageName = language.name;

    const languagesBlock = document.querySelector('#languages');
    languagesBlock.appendChild(h2);
    languagesBlock.appendChild(p);
    languagesBlock.appendChild(button);

    setButtonListeners();
  });
}

function setButtonListeners() {
  const buttons = document.querySelectorAll('.show-more');
  buttons.forEach(button => {
    button.addEventListener('click', toggleDescription);
  });
}

function toggleDescription(event) {
  const languageName = event.target.dataset.languageName;
  
  if (event.target.innerText === 'Show More') {
    event.target.previousElementSibling.innerText = getFullDescription(languageName);
    event.target.innerText = 'Show Less';
  } else if (event.target.innerText === 'Show Less') {
    event.target.previousElementSibling.innerText = getSubDescription(getFullDescription(languageName));
    event.target.innerText = 'Show More';
  }
}

function findLanguage(name) {
  return languages.filter(language => {
    return language.name === name;
  })[0];
}

function getFullDescription(name) {
  return findLanguage(name)['description'];
}

function getSubDescription(string) {
  return string.slice(0, MAX_CHARS) + '...';
}

const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
                 'general-purpose programming language. It was designed and developed in the mid-1990s ' +
                 'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
                 'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
                 'including functional, object-oriented, and imperative. It also has a dynamic type ' +
                 'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
                 'programming language. It has been standardized in the ECMAScript language ' +
                 'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
                 'technologies of World Wide Web content production; the majority of websites employ ' +
                 'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
                 'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
                 'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
                 'with a long history and a distinctive, fully parenthesized prefix notation. ' +
                 'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
                 'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
                 'since its early days, and many dialects have existed over its history. Today, the best ' +
                 'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  },
];