Meteor.subscribe("images");
Meteor.subscribe("config");

var Global = {
    pad: function(width, string, padding) {
        return (width <= string.length) ? string : Global.pad(width, padding + string, padding)
    },

    genRandom: function(min, max) {
        return Math.round((Math.random() * (max - min) + min) * 100) / 100;
    },

    genRandomInt: function(min, max) {
        return Math.round((Math.random() * (max - min) + min));
    },

    GENES_COUNT: 256*3*100+99,

    POPULATION_COUNT: 21,

    randomHash: -1,

    intHash: -1,

    rendered: 0,

    processed: 0

};

Template.images.helpers({
    allImages: function() {
        return Images.find();
    },

    table: function() {
        var ret = [{cell : []}, {cell : []}, {cell : []}, {cell : []}, {cell : []}, {cell : []}, {cell : []}];

        var mapping = _.shuffle(_.range(0, Global.POPULATION_COUNT));

        _.each(mapping, function(e, k) {
           ret[Math.floor(k/3)].cell.push({id: e});
        });

        return ret;
    },

    randomHash: function() {

        if(Global.randomHash == -1) {
            var r = Global.genRandomInt(0, 256*3);
            var r2 = Global.genRandomInt(0, 99);

            var img = Images.findOne({ split : { $near : [r, r2] } });

            if(img) {
                Global.intHash = img.hash;
                Global.randomHash = Global.pad(5, img.hash.toString(), '0');
            }

        }
        else {
            Global.rendered++;
        }

        if(Global.rendered == 20) {

            for(var count=0; count<21; ++count) {
                (function(i) {
                    Meteor.call("getPresets", i, Global.intHash, function(error, result) {

                        var id = "#img" + i.toString();
                        var c = Caman(id, function() {
                            this.brightness(result[0]);
                            this.contrast(result[1]);
                            this.vibrance(result[2]);
                            this.hue(result[3]);
                            this.gamma(result[4]);
                            this.stackBlur(result[5]);
                            this.saturation(result[6]);
                            this.exposure(result[7]);
                            this.sepia(result[8]);
                            //this.noise(result[9]);
                            this.sharpen(result[10]);

                            this.render();
                        });

                        Caman.Event.listen(c, "processComplete", function () {
                            var transparent = document.getElementById("transparent");
                            transparent.style.opacity = (i / 35);

                            Global.processed++;
                            if(Global.processed == 188) {
                                var loading = document.getElementById("loading");
                                var imgTable = document.getElementById("imgTable");
                                loading.className = "hidden";
                                imgTable.className = "";
                            }
                        });

                    });
                })(count);
            }
        }

        return Global.randomHash;
    },
    config : function() {
        return Config.findOne();
    }
});

Template.images.events({
    'click .picture': function (e) {
        var $td = $(e.target).closest('td');

        $td.addClass("success");

        var ind = $td.data("ind");
        var hash = Global.randomHash;

        Meteor.call("vote", ind, hash);

        Router.go("/vote");
    },
    'click #die' : function () {
        var ind = Global.genRandomInt(0, Global.POPULATION_COUNT);
        var hash = Global.randomHash;

        Meteor.call("vote", ind, hash);

        Router.go("/vote");
    }
});

Template.dev.events({
   'click #evol' : function() {
       // Stop this in production for now!
       //Meteor.call("generation");
   }
});