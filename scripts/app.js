
/* model */
let model = {
  currentCat: 0,
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
  init: function() {
    this.adminEnabled = false;
  },
  render: function(curr) {
    const self = this;
    const catImg = document.querySelector('#catImg img');

    catImg.src = 'imgs/' + curr.src;
    catImg.setAttribute('data-cat', curr);
    catImg.style.visibility = 'visible';
    this.updateClickCounter(curr);

    catImg.addEventListener('click', (function(clickCount) {
      return function() {
        curr.numClicks++;
        self.updateClickCounter(curr);
      };
    })(curr.numClicks));

    // update name of the cat
    this.updateText(curr);
  },
  updateText: function(curr) {
    const catNameContainer = document.querySelector('.catName');
    catNameContainer.textContent = curr.name;
  },
  updateClickCounter: function(curr) {
    const text = document.querySelector('#timesClicked');
    text.textContent = curr.numClicks;
  },
  showAdmin: function() {
    const adminTools = document.querySelector('.admin .tools');

    this.adminEnabled = !this.adminEnabled;
    adminTools.style.visibility = this.adminEnabled ? 'visible' : 'hidden'; 
  },
  clearInputs: function(e) {
    const inputs = document.querySelectorAll('.admin .tools input');
    inputs.forEach(function(input) {
      input.value = '';
    });
    e.preventDefault();
  },
  save: function(e) {
    const inputs = document.querySelectorAll('.admin .tools input');
    inputs.forEach(function(input) {
      if (input.value !== '') {
        switch(input.name) {
          case 'catName':
            octopus.setName(input.value);
            view2.render();
            break;
          case 'catUrl':
            octopus.setSrc(input.value);
            break;        
          case 'catClicks':
            octopus.setClicks(input.value);
            break;
        }
        input.value = '';
        view1.render(octopus.getCurrCatData());
      }
    });
    e.preventDefault();
  }
};


/* View 2 - List view */
let view2 = {
  init: function() {
    const fragment = document.createDocumentFragment();
  },
  render: function() {
    const fragment = document.createDocumentFragment();
    const list = document.querySelector('.catLinks ul');
    list.innerHTML = '';

    octopus.getCats().forEach(function(cat, i) {
      let listItem = document.createElement('li');
      listItem.textContent = cat.name;

      /* event listener */
      listItem.addEventListener('click', function() {
        view1.render(cat);
        octopus.setCurrentCat(i);
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
  },
  setCurrentCat: function(num) {
    return model.currentCat = num;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  getCurrCatData: function() {
    return model.data[this.getCurrentCat()];
  },
  setName: function(name) {
    return model.data[this.getCurrentCat()].name = name;
  },
  setSrc: function(url) {
    return model.data[this.getCurrentCat()].src = url;
  },
  setClicks: function(clicks) {
    return model.data[this.getCurrentCat()].numClicks = clicks;
  }
};

view1.init();
view2.render();