// Jalankan kode setelah seluruh halaman dimuat
window.onload = function() {
    // 1. Dapatkan parameter dari URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Ambil nilai dari parameter 'v' (contoh: ?v=abc123xyz)
    const videoId = urlParams.get('v');

    // 3. Dapatkan elemen container tempat kita akan menaruh video
    const playerContainer = document.getElementById('player-container');

    // 4. Jika videoId ditemukan di URL
    if (videoId) {
        // Buat URL embed dari Videy
        const iframeSrc = `https://cdn.videy.co/embed/${videoId}`;
        
        // Buat elemen iframe
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'true');

        // Hapus pesan instruksi dan masukkan iframe ke dalam container
        playerContainer.innerHTML = '';
        playerContainer.appendChild(iframe);
    } 
    // Jika tidak ada videoId, biarkan pesan instruksi tetap ditampilkan.
};
