const Obat = require("../models/Obat");

//Export semua method yang ada di dalam object(module.exports)
module.exports = {
    //Membuat view untuk obat
    viewObat : async(req,res) => {
        req.session.loggedIn = true;
        try{
            //Membuat variabel obat dan menunda eksekusi hingga proses async selesai lalu mengambil model obat
            //Method find digunakan untuk mengambil semua collection yang ada di database Obat
            const obat = await Obat.find();
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message : alertMessage, status: alertStatus};

            res.render("obat_page", {
                obat,
                alert,
                title: "Tabel Obat",
            });
        }catch(error){
            res.redirect("/obat");
        }
    },

    viewObatByJenis : async(req, res) => {
        req.session.loggedIn = true;
        try{
            //Membuat variabel obat dan menunda eksekusi hingga proses async selesai lalu mengambil model obat
            //Method find digunakan untuk mengambil semua collection yang ada di database Obat
            const obat = await Obat.find({jenisObat:req.params.jenisObat});
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message : alertMessage, status: alertStatus};

            res.render("obat_page", {
                obat,
                alert,
                title: "Tabel Obat",
            });
        }catch(error){
            res.redirect("/obat");
        }
    },

    viewObatByNama : async(req, res) => {
        req.session.loggedIn = true;
        try{
            //Membuat variabel obat dan menunda eksekusi hingga proses async selesai lalu mengambil model obat
            //Method find digunakan untuk mengambil semua collection yang ada di database Obat
            const obat = await Obat.find({namaObat:req.params.namaObat});
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message : alertMessage, status: alertStatus};

            res.render("obat_page", {
                obat,
                alert,
                title: "Tabel Obat",
            });
        }catch(error){
            res.redirect("/obat");
        }
    },

    viewDetailObat : async(req, res) => {
        req.session.loggedIn = true;
        try{
            const obat = await Obat.findOne({_id:req.params.id});
            const pemasok = obat.pemasok;
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message:alertMessage, status: alertStatus};
            res.render("detail_obat_page", {
                obat,
                pemasok,
                alert,
                title: "Detail Obat"
            });
        }catch(error){
            req.flash("alertMessage", '${error.message}');
            req.flash("alertStatus", "danger");
            res.redirect("/obat");
        }
    },

    //Create Obat
    addObat : async(req, res) => {
        try{
            const {namaObat, jenisObat, harga, deskripsiObat, efekSamping, dosis, kontraindikasi} = req.body;
            await Obat.create({namaObat, jenisObat, harga, deskripsiObat, efekSamping, dosis, kontraindikasi});
            req.flash("alertMessage", "Data berhasil ditambahkan!");
            req.flash("alertStatus", "Success");
            res.redirect("/obat");
        }catch(error){
            req.flash("alertMessage", '${error.message}');
            req.flash("alertStatus", "danger");
            res.redirect("/obat");
        }
    },

    //Read Obat

    //Update Obat
    editObat : async(req, res) => {
        try{
            const {id, namaObat, jenisObat, harga, deskripsiObat, efekSamping, dosis, kontraindikasi} = req.body;
            const obat = await Obat.findOne({_id: id});
            obat.namaObat = namaObat;
            obat.jenisObat = jenisObat;
            obat.harga = harga;
            obat.deskripsiObat = deskripsiObat;
            obat.efekSamping = efekSamping;
            obat.dosis = dosis;
            obat.kontraindikasi = kontraindikasi;
            await obat.save();
            req.flash("alertMessage", "Berhasil mengubah data obat");
            req.flash("alertStatus", "Success");
            res.redirect("/obat");
        }catch(error){
            req.flash("alertMessage", '${error.message}');
            req.flash("alertStatus", "danger");
            res.redirect("/mahasiswa");
        }
    },

    //Delete Obat
    deleteObat : async(req, res) => {
        try{
            const { id } = req.params;
            // const obat = await Obat.findOne({ _id : id });
            await Obat.deleteOne({_id : id});
            req.flash("alertMessage", "Data berhasil dihapus");
            req.flash("alertStatus", "warning");
            res.redirect("/obat");
        }catch(error){
            req.flash("alertMessage", '${error.message}');
            req.flash("alertStatus", "danger");
            res.redirect("/obat");
        }
    },

    viewPemasok: async (req, res) => {
        req.session.loggedIn = true;
        try {
        const obat = await Obat.findOne({_id:req.params.id});
        const pemasok = obat.pemasok;
        //   message and status
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        //   render componen
        res.render("detail_obat_page", {
            obat,
            pemasok,
            alert,
            title: "Tabel Obat"
        });
        } catch (error) {
        // back to user jika error
        // erro message
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/obat");
        }
    },

    addPemasok: async(req, res) => {
        req.session.loggedIn = true;
        try {
        const obat = await Obat.findOne({_id:req.params.id});
        const newPemasok = {
            namaPemasok : req.body.namaPemasok,
            alamatPemasok : req.body.alamatPemasok
            };
            obat.pemasok.push(newPemasok);
            await obat.save();

            // success message
            req.flash("alertMessage", "Pemasok berhasil ditambahkan");
            req.flash("alertStatus", "success");
            res.redirect("/obat/id/"+req.params.id);

            } catch (error) {
            // erro message
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/obat/id/"+req.params.id);
            }
    },
        
    editPemasok : async(req, res) => {
        req.session.loggedIn = true;
        try{
            const obat = await Obat.findOne({_id:req.params.idObat});
            await obat.save();
            console.log("==========================================");
            console.log(req.body.id);
            await Obat.findOneAndUpdate(
                {_id :req.params.idObat, 'pemasok._id' : req.body.id},
                {
                    $set : {
                        'pemasok.$.namaPemasok' : req.body.namaPemasok,
                        'pemasok.$.alamatPemasok' : req.body.alamatPemasok,
                    },
                },
                {new : true}
            );
            req.flash("alertMessage", "Berhasil memperbarui data pemasok");
            req.flash("alertStatus", "success");
            res.redirect("/obat/id/"+req.params.idObat);
        }catch(error){
            req.flash("alertMessage", '${error.message}');
            req.flash("alertStatus", "danger");
            res.redirect("obat/id/" + req.params.idObat);
        }
    },

    deletePemasok : async(req, res) => {
        req.session.loggedIn = true;
        try{
            const obat = await Obat.findOne({_id : req.params.idObat});
            await obat.save();
            await Obat.findOneAndUpdate(
                {_id: req.params.idObat},
                {$pull: { pemasok : {_id:req.params.idPemasok}}},
                {new : true}
            );
            req.flash("alertMessage", "Pemasok Berhasil Dihapus");
            req.flash("alertStatus", "warning");
            res.redirect("/obat/id/"+req.params.idObat);
        }catch(error){
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/obat/id/"+req.params.idObat);
        }
    }
}