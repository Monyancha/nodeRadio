const getMusic = require("../search/search");
const fs = require("fs");

const categories = ["house", "trance", "edm", "nightcore", "pop", "hip-hop", "rap", "rock", "metal", "country", "R&B", "indie"];
module.exports = app => {
    categories.forEach(category => {
        app.get(`/api/${category}`, (req, res) => {
            //getMusic(`${category} music`);
            
            const dir = `./client/public/genres/${category}`;
            fs.readdir(dir, (err, files) => {
                res.send({
                    song:   `/genres/${category}/${category}1.mp4`,
                    info:   readFile(`${dir}/info/${category}1.txt`, true),
                    link:   readFile(`${dir}/info/${category}1.txt`, false)

                });
                res.end();
            });
        });

        // post live data
        app.post(`/api/live/${category}`, (req, res) => {
            const songId = req.body.songId;
            res.send({
                current: readFile(`./client/public/genres/${category}/info/${category}${songId}.txt`, true),
                next: readFile(`./client/public/genres/${category}/info/${category}${songId + 1}.txt`, true)
            });
        });

        // get current song playing
        app.get(`/api/live/${category}`, (req, res) => {
            console.log(123);
        });
    });

    // read bytes from file and returns content
    function readFile(file, mode) {
        const fileInfo = fs.readFileSync(file).toString().split("|---|");
        const title = fileInfo[0].toUpperCase();
        const link = fileInfo[1];

        if (mode) {
            if (title.split("(") === undefined) {
                return title.toUpperCase();
            }
    
            else {
                return title.toUpperCase().split("(")[0];
            }
        }

        else {
            return link;
        }
    }
};