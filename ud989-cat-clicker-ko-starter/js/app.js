const initData = [
    {
        name: "Cat 1",
        imgSrc: "../img/1413379559_412a540d29_z.jpg",
        imgAttrib: "https://www.flickr.com/photos/big/"
    },
    {
        name: "Cat 2",
        imgSrc: "../img/22252709_010df3379e_z.jpg",
        imgAttrib: "https://www.flickr.com/photos/big/"
    },
    {
        name: "Cat 3",
        imgSrc: "../img/4154543904_6e2428c421_z.jpg",
        imgAttrib: "https://www.flickr.com/photos/big/"
    },
    {
        name: "Cat 4",
        imgSrc: "../img/434164568_fea0ad4013_z.jpg",
        imgAttrib: "https://www.flickr.com/photos/big/"
    },
    {
        name: "Cat 5",
        imgSrc: "../img/9648464288_2516b35537_z.jpg",
        imgAttrib: "https://www.flickr.com/photos/big/"
    }
];

const Cat = function(data) {
    this.clickCount = ko.observable(0);
    this.name = ko.observable(data.name);
    this.level = ko.computed(function() {
        const clicks = this.clickCount();
        if (clicks < 10) return "Infant";
        else if (clicks < 20) return "Teen";
        else return "Adult";
    }, this);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttrib = ko.observable(data.imgAttrib);
};

const ViewModel = function() {
    const self = this;

    this.catList = ko.observableArray([]);
    initData.forEach(cat => {
        self.catList().push(new Cat(cat));
    });

    this.currCat = ko.observable(this.catList()[0]);
    this.incrementCounter = function() {
        self.currCat().clickCount(self.currCat().clickCount() + 1);
    };
};

ko.applyBindings(new ViewModel());
