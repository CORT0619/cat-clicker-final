
/* model */
let model = {
  data: [
    {
      name: 'Julian',
      numClicks: 0,
      src: 'cat1.jpg'
    },
    {
      name: 'Bobby',
      numClicks: 0,
      src: 'cat2.jpg'
    },
    {
      name: 'Pearl',
      numClicks: 0,
      src: 'cat3.jpg'
    },
    {
      name: 'Jamie',
      numClicks: 0,
      src: 'cat4.jpg'
    },
    {
      name: 'Penelope',
      numClicks: 0,
      src: 'cat5.jpg'
    }
  ]
};


/* View 1 - Image view */
let view1 = {
  render: function(curr) {
    // this.currentCat = 0;
    const catImg = document.querySelector('#catImg img');
    const catNameContainer = document.querySelector('.catName');
    const text = document.querySelector('#timesClicked');

    catImg.src = 'imgs/' + curr.src;
    catImg.style.visibility = 'visible'
    text.textContent = curr.numClicks;

    catImg.addEventListener('click', (function(clickCount) {
      return function() {
        curr.numClicks++;
        text.textContent = curr.numClicks;
      };

    })(curr.numClicks));

    // add cat name
    catNameContainer.textContent = curr.name;
  }
};


/* View 2 - List view */
let view2 = {
  render: function() {
    const fragment = document.createDocumentFragment();
    const list = document.querySelector('.catLinks ul');

    octopus.getCats().forEach(function(cat, i) {
      let listItem = document.createElement('li');
      listItem.textContent = cat.name;

      /* event listener */
      listItem.addEventListener('click', function() {
        view1.render(cat);
      });

      fragment.appendChild(listItem);
    });
    list.appendChild(fragment);
  }
};

/* Octopus */
var octopus = {
  getCats: function() {
    return model.data;
  }
};

view2.render();