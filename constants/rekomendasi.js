export const recommendationBloodPresure = {
  hipotensiKrisis: {
    value: "Tekanan darah sistolik < 90 mmHg dan/atau tekanan darah diastolik < 60 mmHg",
    symptom: "Pusing, pingsan, kebingungan, kelelahan ekstrem, kulit pucat dan dingin",
    recommendation: "Segera cari bantuan medis, berbaring dengan kaki diangkat, minum air dan garam elektrolit",
  },
  hipotensi: {
    value: "Tekanan darah sistolik 90-100 mmHg dan/atau tekanan darah diastolik 60-70 mmHg",
    symptom: "Pusing, kelelahan, penglihatan kabur",
    recommendation: "Konsumsi garam secukupnya, hidrasi yang cukup, dan periksa dengan dokter jika gejala berlanjut",
  },
  normal: {
    value: "Tekanan darah sistolik 101-120 mmHg dan/atau tekanan darah diastolik 70-80 mmHg",
    symptom: "Tidak ada gejala yang mengkhawatirkan",
    recommendation: "Pertahankan gaya hidup sehat, diet seimbang, olahraga teratur",
  },
  prahipertensi: {
    value: "Tekanan darah sistolik 121-139 mmHg dan/atau tekanan darah diastolik 80-89 mmHg",
    symptom: "Mungkin tidak ada gejala jelas, tetapi risiko peningkatan penyakit kardiovaskular",
    recommendation: "Modifikasi gaya hidup, kurangi asupan garam, lebih banyak olahraga, dan pantau tekanan darah secara teratur",
  },
  hipertensi1: {
    value: "Tekanan darah sistolik 140-159 mmHg dan/atau tekanan darah diastolik 90-99 mmHg",
    symptom: "Sakit kepala, pusing, mimisan",
    recommendation: "Modifikasi gaya hidup dan mungkin memerlukan obat sesuai resep dokter",
  },
  hipertensi2: {
    value: "Tekanan darah sistolik ≥ 160 mmHg dan/atau tekanan darah diastolik ≥ 100 mmHg",
    symptom: "Sakit kepala parah, kelelahan, gangguan penglihatan, nyeri dada",
    recommendation: "Segera konsultasi ke dokter, kemungkinan besar memerlukan pengobatan",
  },
  hipertensiKrisis: {
    value: "Tekanan darah sistolik > 180 mmHg dan/atau tekanan darah diastolik > 120 mmHg",
    symptom: "Sakit kepala parah, kecemasan, sesak napas, mimisan, nyeri dada",
    recommendation: "Segera cari perawatan medis darurat",
  },
};

export const recommendationOxygenSaturation = {
  sianosis: {
    value: "Saturasi oksigen < 85%",
    symptom: "Kulit kebiruan, sesak napas, kebingungan",
    recommendation: "Segera cari bantuan medis, bisa memerlukan oksigen tambahan",
  },
  saturasiOksigenRendah: {
    value: "Saturasi oksigen 85-89%",
    symptom: "Sesak napas, pusing, kelelahan",
    recommendation: "Periksa ke dokter, mungkin memerlukan oksigen tambahan",
  },
  oksigenDarahRendah: {
    value: "Saturasi oksigen 90-94%",
    symptom: "Mungkin tidak ada gejala jelas, tetapi dapat menyebabkan masalah jangka panjang",
    recommendation: "Pantau kondisi dan periksa ke dokter untuk evaluasi lebih lanjut",
  },
  oksigenDarahStabil: {
    value: "Saturasi oksigen 95-97%",
    symptom: "Tidak ada gejala yang mengkhawatirkan",
    recommendation: "Pertahankan gaya hidup sehat, pastikan ventilasi yang baik saat tidur",
  },
  saturasiOksigenNormal: {
    value: "Saturasi oksigen 98-100%",
    symptom: "Tidak ada gejala yang mengkhawatirkan",
    recommendation: "Tidak ada tindakan khusus yang diperlukan",
  },
  sianosisKrisis: {
    value: "Saturasi oksigen < 70%",
    symptom: "Kulit dan bibir sangat kebiruan, kesadaran menurun, sesak napas berat",
    recommendation: "Segera cari bantuan medis darurat, bisa memerlukan ventilasi mekanis",
  },
};

export const recommendationHeartRate = {
  sangatBaik: {
    value: "Detak jantung < 60 bpm (untuk atlet bisa lebih rendah)",
    symptom: "Tidak ada gejala yang mengkhawatirkan",
    recommendation: "Pertahankan tingkat aktivitas fisik yang tinggi dan gaya hidup sehat",
  },
  hebat: {
    value: "Detak jantung 60-69 bpm",
    symptom: "Tidak ada gejala yang mengkhawatirkan",
    recommendation: "Teruskan gaya hidup sehat dan olahraga teratur",
  },
  baik: {
    value: "Detak jantung 70-79 bpm",
    symptom: "Tidak ada gejala yang mengkhawatirkan",
    recommendation: "Teruskan aktivitas fisik dan diet seimbang",
  },
  rataRata: {
    value: "Detak jantung 80-89 bpm",
    symptom: "Mungkin sedikit lebih cepat, tapi biasanya tidak ada gejala mengkhawatirkan",
    recommendation: "Pertimbangkan meningkatkan aktivitas fisik dan mengelola stres",
  },
  dibawahRataRata: {
    value: "Detak jantung ≥ 90 bpm",
    symptom: "Mungkin merasa jantung berdebar, sesak napas, atau kelelahan",
    recommendation: "Periksa ke dokter, mungkin perlu evaluasi kesehatan lebih lanjut dan modifikasi gaya hidup",
  },
};