const Cat = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable("Tabby");
    this.level = ko.computed(function() {
        const clicks = this.clickCount();
        if (clicks < 10) return "Infant";
        else if (clicks < 20) return "Teen";
        else return "Adult";
    }, this);
    this.imgSrc = ko.observable("../img/434164568_fea0ad4013_z.jpg");
    this.imgAttrib = ko.observable("https://www.flickr.com/photos/big/");
};

const ViewModel = function() {
    const self = this;
    this.currCat = ko.observable(new Cat());
    this.incrementCounter = function() {
        self.currCat().clickCount(self.currCat().clickCount() + 1);
    };
};

ko.applyBindings(new ViewModel());
