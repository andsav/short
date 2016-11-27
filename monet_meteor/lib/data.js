Config = new Mongo.Collection("global");
Dna = new Mongo.Collection("dna");
Images = new Mongo.Collection("images");
Votes = new Mongo.Collection("votes");

Params = {
    brightness: {id: 0, range: [-50, 50]},
    contrast: {id: 1, range: [-50, 50]},
    vibrance: {id: 2, range: [-100, 100]},
    hue: {id: 3, range: [0, 100]},
    gamma: {id: 4, range: [0, 100]},
    stackBlur: {id: 5, range: [0, 20]},
    saturation: {id: 6, range: [-100, 100]},
    exposure: {id: 7, range: [-50, 50]},
    sepia: {id: 8, range: [0, 100]},
    noise: {id: 9, range: [0, 100]},
    sharpen: {id: 10, range: [0, 100]}
};
