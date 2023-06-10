const Obat = require("../models/Obat");

//Export semua method yang ada di dalam object(module.exports)
module.exports = {
    //Membuat view untuk obat
    viewObat : async(req,res) => {
        try{
            //Membuat variabel obat dan menunda eksekusi hingga proses async selesai lalu mengambil model obat
            //Method find digunakan untuk mengambil semua collection yang ada di database Obat
            const obat = await Obat.find();
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message : alertMessage, status: alertStatus};

            res.render("index", {
                obat,
                alert,
                title: "CRUD",
            });
        }catch(error){
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
            console.log("INI DELETE");
            const { id } = req.params;
            // const obat = await Obat.findOne({ _id : id });
            await Obat.findOneAndDelete(id);
            req.flash("alertMessage", "Data berhasil dihapus");
            req.flash("alertStatus", "warning");
            res.redirect("/obat");
        }catch(error){
            req.flash("alertMessage", '${error.message}');
            req.flash("alertStatus", "danger");
            res.redirect("/obat");
        }
    },
    
}