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

    randomHash : -1
};

Meteor.startup(function () {
    var images = fs.readdirSync('./../../../../../public/addImg/');

    // If images in addImg folder, parse them
    if(images) {

        var histogram = Meteor.npmRequire('histogram');
        var toAdd = images.length;

        _.each(images, function(img) {
            if(img.split('.').pop().toLowerCase() == "jpg") {

                console.log(toAdd + " images to add.");

                histogram("./../../../../../public/addImg/" + img || FileReader.result, function (err, data) {

                    var max = 0;
                    var peak = 0;
                    var count = 0;

                    _.each(data.red, function (e) {
                        if (e > max) {
                            max = e;
                            peak = count;
                        }
                        ++count;
                    });
                    _.each(data.green, function (e) {
                        if (e > max) {
                            max = e;
                            peak = count;
                        }
                        ++count;
                    });
                    _.each(data.blue, function (e) {
                        if (e > max) {
                            max = e;
                            peak = count;
                        }
                        ++count;
                    });

                    var colors = (Math.round(data.colors.rgb / 119694 * 100) > 100) ? 99 : Math.round(data.colors.rgb / 119694 * 100);
                    var final = Global.pad(3, Math.round(peak).toString(), 0) + Global.pad(2, colors.toString(), 0);

                    Images.insert({
                        "hash" : parseInt(final),
                        "split" : [peak, colors]
                    });

                    fs.renameSync("./../../../../../public/addImg/" + img, "./../../../../../public/activeImg/" + final + ".jpg");
                    console.log(img + " -> " + final);

                    --toAdd;

                });
            }
        });

    }


    // If first generation, generate random pop

    if(Config.find().count() === 0) {
        Config.insert( { "generation" : 1, "votes" : 0, lastGen : new Date(), lastVote : new Date() } );

        console.log("Generating first generation");

        for(var i=0; i < Global.POPULATION_COUNT; ++i) {

            for(var j=0; j<Global.GENES_COUNT; ++j) {

                var genes = [];

                _.each(Params, function(e) {
                   genes.push(Global.genRandom(e.range[0], e.range[1]));
                });

                Dna.insert({
                    "individual": i,
                    "allele" : j,
                    "preset" : genes
                });

                console.log("Individual " + (i+1) + " gene " + (j + 1));
            }
        }
    }
});

Meteor.publish("images", function() {
    return Images.find();
});
Meteor.publish("config", function() {
    return Config.find();
});

Meteor.methods({
    getPresets: function(i, hash) {
        return Dna.findOne({ individual: i, allele: hash }).preset;
    },
    vote: function(i, hash) {
        Votes.insert({
           individual : i,
           allele: hash
        });

        Config.update({}, {$inc : { votes: 1 }, $set : { lastVote : new Date() }});
    },
    generation: function() {

        console.log("Warning, generation function has been called");

        var scores = [];
        var max = [0, 0];

        for(var i=0; i < Global.POPULATION_COUNT; ++i) {
            var score = Votes.find({ "individual" : i }).count();
            scores.push(score);
            if(score > max[1]) max = [i, score];
        }

        // 1) "Natural Selection" Bring everyone a little closer to the winner
        console.log("Begin Natural Selection");
        for(i=0; i < Global.POPULATION_COUNT; ++i) {

            for(var j=0; j < Global.GENES_COUNT; ++j) {

                var newPreset = Dna.findOne({individual : i, allele : j}).preset;
                var winnerVal = Dna.findOne({individual : max[0], allele : j}).preset;

                _.each(newPreset, function(e, k) {

                    r = Global.genRandom(0, 17); // Delta between 0 and 17 percent because

                    newPreset[k] = (e*(100-r) + winnerVal[k]*r)/100;

                });

                Dna.update({individual : i, allele : j}, {$set : {preset: newPreset}});
            }
        }

        console.log("Begin blur");

        // 2) "Blur" (make neighbours alike)
        /*
        for(i=0; i < Global.POPULATION_COUNT; ++i) {

            for(var j=5; j < Global.GENES_COUNT; ++j) {

                var presets = Dna.find({individual: i, allele : { $gt: j-3, $lt: j+3 }}).fetch(); // Radius 7 because

                var avgPresets = [];

                var total = 0;
                _.each(presets, function(e) {
                    total += e;
                });
                var average = total/7;

                Dna.update({individual : i, allele : j}, {$set : {preset: newPreset}});

            }
        }
        */

        console.log("Begin noise");
        // 3) "Noise" (introduce random mutations)
        // Swap 256 random points with completely random presets

        for(var i=0; i<256; ++i) {
            var ind = Global.genRandomInt(0, Global.POPULATION_COUNT-1);
            var gene = Global.genRandomInt(0, Global.GENES_COUNT-1);

            var newPreset = [];

            _.each(Params, function(e) {
                newPreset.push(Global.genRandom(e.range[0], e.range[1]));
            });

            Dna.update({individual: ind, allele: gene}, {$set : {preset: newPreset}});
        }

        console.log("Begin cleanup");
        // increment generation count
        Config.update({}, {$inc : { generation: 1 }, $set : { lastGen : new Date(), votes : 0 }});
        // empty votes
        Votes.remove();
    }
});