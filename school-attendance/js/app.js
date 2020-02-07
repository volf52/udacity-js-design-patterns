// Global 'config'

const classes = [
    "Intro to Philosophy",
    "Software Engineering",
    "Mobile Programming",
    "Artificial Intelligence",
    "Computer Hardware"
];
const totalDays = 14;

// ====== Model =========
const model = {
    init: function() {
        if (!localStorage.getItem("attendance")) {
            console.log("Creating dummy attendance records...");
            const attendance = {};
            classes.forEach(name => {
                attendance[name] = [];
                for (var i = 0; i < totalDays; i++) {
                    attendance[name].push(false);
                }
            });
            this.attendance = attendance;
            this.save();
        } else this.attendance = JSON.parse(localStorage.getItem("attendance"));
    },
    save: function() {
        localStorage.setItem("attendance", JSON.stringify(this.attendance));
    }
};

// ======== Controller ======

const controller = {
    init: function() {
        model.init();
        view.init();
        view.render();
    },
    getAttendance: function() {
        return {
            ...model.attendance
        };
    },
    getMissed: function(name) {
        const student = model.attendance[name];
        if (student === undefined) return -1;
        return this.countMissing(student);
    },
    countMissing: function(arr) {
        return arr.filter(Boolean).length;
    },
    saveData: function() {
        model.save();
    },
    toggleAttendance: function(name, idx) {
        const student = model.attendance[name];
        if (student === undefined) return -1;
        student[idx] = !student[idx];
        model.save();
    }
};

// ======== View =========
const view = {
    init: function() {
        this.tbody = $("tbody");
        const headerRow = jQuery("<tr />");
        headerRow.append(
            jQuery("<th />")
                .addClass("name-col")
                .text("Class Name")
        );
        for (let i = 1; i <= totalDays; i++)
            headerRow.append(jQuery("<th />").text(i));
        headerRow.append(
            jQuery("<th />")
                .addClass("missed-col")
                .text("Days Missed")
        );
        $("thead")
            .html("")
            .append(headerRow);
    },
    render: function() {
        const attendance = controller.getAttendance();
        const tbody = this.tbody;
        tbody.html("");
        Object.keys(attendance).forEach((name, idx) => {
            const studentRow = jQuery("<tr />").addClass("student");
            const attendedArr = attendance[name];
            const missing = controller.countMissing(attendedArr);
            studentRow.append(
                jQuery("<td />")
                    .addClass("name-col")
                    .text(name)
            );
            attendedArr.forEach((val, innerIdx) => {
                studentRow.append(
                    jQuery("<td />")
                        .addClass("attend-col")
                        .attr("id", idx)
                        .append(
                            jQuery("<input />")
                                .attr("type", "checkbox")
                                .attr("checked", val)
                                .click(
                                    ((key, valIdx) => () => {
                                        controller.toggleAttendance(
                                            key,
                                            valIdx
                                        );
                                        view.render();
                                    })(name, innerIdx)
                                )
                        )
                );
            });
            studentRow.append(
                jQuery("<td />")
                    .addClass("missed-col")
                    .text(missing)
            );
            tbody.append(studentRow);
        });
    }
};

$(document).ready(() => {
    controller.init();
});
