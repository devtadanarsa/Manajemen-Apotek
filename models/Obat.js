const mongoose = require("mongoose");

//Membuat variabel baru dengan nama obatScheme
const obatScheme = new mongoose.Schema({
    namaObat : {
        type: String,
        required: true,
    },

    jenisObat : {
        type: String,
        required: true,
    },

    harga : {
        type: Number,
        required: true,
    },
    
    deskripsiObat : {
        type: String,
        required: true,
    },

    efekSamping : {
        type: String,
        required: true,
    },

    dosis : {
        type: String,
        required: true,
    },

    kontraindikasi : {
        type: String,
        required: true
    },

    pemasok : [{
        namaPemasok : {
            type: String,
            required: true
        },
        alamatPemasok : {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("Obat", obatScheme);