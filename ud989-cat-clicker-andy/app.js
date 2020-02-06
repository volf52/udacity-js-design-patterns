// ======== Model ============

const model = {
    currentCat: null,
    cats: new Array(5).fill(undefined).map((_, idx) => ({
        img: `./cat_picture${idx + 1}.jpeg`,
        name: `Cat ${idx + 1}`,
        clicks: 0
    }))
};

// ========== Controller ====================

const controller = {
    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },

    getCurrentCat: () => model.currentCat,
    getCats: () => model.cats,
    setCurrentCat: cat => {
        model.currentCat = cat;
    },
    incrementClickCounter: () => {
        model.currentCat.clicks++;
        catView.render();
    }
};

// ============== View ======================

const catView = {
    init: function() {
        this.catElem = $("#cat");
        this.catNameElem = $("#cat-name");
        this.catImgElem = $("#cat-img");
        this.countElem = $("#cat-count");

        this.catImgElem.on("click", () => {
            controller.incrementClickCounter();
        });

        this.render();
    },
    render: function() {
        const currCat = controller.getCurrentCat();
        this.countElem.text(currCat.clicks);
        this.catNameElem.text(currCat.name);
        this.catImgElem.attr("src", currCat.img);
    }
};

var catListView = {
    init: function() {
        this.catListElem = $("#cat-list");
        this.render();
    },
    render: function() {
        const cats = controller.getCats();
        this.catListElem.html("");

        for (var cat of cats) {
            this.catListElem.append(
                jQuery("<li />").append(
                    jQuery("<button />")
                        .text(cat.name)
                        .on(
                            "click",
                            (catCopy => () => {
                                controller.setCurrentCat(catCopy);
                                catView.render();
                            })(cat)
                        )
                )
            );
        }
    }
};

$(document).ready(() => {
    controller.init();
});
