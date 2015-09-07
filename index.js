
/* =========== Octopus ============*/

var octopus = {
    init: function (){
        
        this.setCurrentCat(this.getCats()[0]);
        catListView.init();
        catDetailView.init();
        adminAreaView.init();
    },
    getCats: function() {
        return model.cats;
    },
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    incrementCounter: function () {
        this.getCurrentCat().counter++;
        catDetailView.render();
        adminAreaView.render();
    },
    
    
    toggleArea: function () {
        model.isAdmin = !model.isAdmin;
        adminAreaView.render();
    },
    allowAdminArea: function () {
        return model.isAdmin;
    },
    updateCatData: function (name, url, counter) {
        var index = model.getIdByName(model.currentCat.name);
        if (index > -1) {
            model.update(index, name, url, counter);
        }
        this.setCurrentCat(this.getCats()[index]);
        catDetailView.render();
        catListView.render();
        adminAreaView.render();
    }
};


/* =========== Model ============*/

var model = {
    isAdmin: false,
    currentCat: null,
    cats: [
        {name: 'Tom', imageSrc: 'http://www.medhatspca.ca/sites/default/files/news_photos/2014-Apr-15/node-147/cute-little-cat.jpg', counter: 0}, 
        {name: 'Jimmy', imageSrc: 'http://7-themes.com/data_images/out/59/6974484-cute-cat-smile.jpg', counter: 0}, 
        {name: 'Felix', imageSrc: 'http://www.medhatspca.ca/sites/default/files/news_photos/2014-Apr-15/node-147/cute-little-cat.jpg', counter: 0}, 
    ],
    getIdByName: function (name) {
        var selIndex = -1
        this.cats.forEach(function (cat, index) {
            if(cat.name === name) {
                selIndex = index;
            }
        });
        return selIndex;
    },
    update: function (index, name, url, counter) {
        this.cats[index] = {name: name, imageSrc: url, counter: counter};
    }
};


/* =========== Views ============*/

var catListView = {
    init: function () {
        this.catListElem = document.getElementById('cats-list');
        this.render();
    },
    render: function () {
        var cats = octopus.getCats();
        
        this.catListElem.innerHTML = '';
        
        for (var i=0; i < cats.length; i++) {
            
            var cat = cats[i];
            var elem = document.createElement('li');
            elem.innerHTML = cat.name;
            
            elem.addEventListener('click', (function (cat) {
                return function () {
                    octopus.setCurrentCat(cat);
                    catDetailView.render();
                    adminAreaView.render();
                }
            })(cat));
            
            this.catListElem.appendChild(elem);
        }
    },
};

var catDetailView = {
    init: function() {
        this.catNameElem = document.getElementById('cat-name');
        this.catCounterElem = document.getElementById('cat-counter');
        this.catImageElem = document.getElementById('cat-img');

        this.catImageElem.addEventListener('click', function (e) {
            octopus.incrementCounter();
        });
        
        this.render();
    },
    render: function () {
        var cat = octopus.getCurrentCat();
         
        this.catNameElem.innerHTML = cat.name;
        this.catCounterElem.innerHTML = cat.counter;
         this.catImageElem.src = cat.imageSrc;
    }
};


var adminAreaView = {
    init: function () {
        var view = this;
        this.adminToggleBtn = document.getElementById('toggle-admin');
        this.adminForm = document.getElementById('admin-form');
        this.catNameInput = document.getElementById('cat-name-form');
        this.catUrlInput = document.getElementById('cat-url-form');
        this.catCounterInput = document.getElementById('cat-counter-form');
        
        this.adminToggleBtn.addEventListener('click', function () {
            octopus.toggleArea();
        });
        
        this.adminForm.addEventListener('submit', function (e) {
            e.preventDefault();
            octopus.updateCatData(view.catNameInput.value, view.catUrlInput.value, view.catCounterInput.value);
        });
        
        this.render();
    },
    render: function () {
        if(octopus.allowAdminArea()) {
            this.adminForm.style.display = 'block';
        } else {
            this.adminForm.style.display = 'none';
        }
        
        var cat = octopus.getCurrentCat();
        
        this.catNameInput.value = cat.name;
        this.catUrlInput.value = cat.imageSrc;
        this.catCounterInput.value = cat.counter;
    }
};



octopus.init();
 