// ==========================================================
// == GANTI LINK DI BAWAH INI DENGAN DIRECT LINK ADSTERRA-MU ==
// ==========================================================
const adsterraDirectLink = "https://example.com/your-adsterra-link";

// Menjalankan semua fungsi setelah halaman siap
$(document).ready(function() {

    // --- BAGIAN 1: LOGIKA PLAYER ---
    const uploadSection = $('#upload-section');
    const playerSection = $('#player-section');
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');

    if (videoId) {
        uploadSection.addClass('hidden');
        playerSection.removeClass('hidden');

        const iframeSrc = `https://cdn.videy.co/embed/${videoId}`;
        const iframe = $('<iframe>', {
            src: iframeSrc,
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: true
        });
        $('#video-wrapper').append(iframe);

        // --- LOGIKA OVERLAY IKLAN ---
        const playerOverlay = $('#player-overlay');
        
        // Menggunakan .one() agar event hanya berjalan satu kali saja
        playerOverlay.one('click', function() {
            // 1. Buka link Adsterra di tab baru
            window.open(adsterraDirectLink, '_blank');
            
            // 2. Hilangkan overlay dengan menambahkan class
            $(this).addClass('overlay-hidden');
        });
    }

    // --- BAGIAN 2: LOGIKA UPLOAD (Diambil dari Videy.co) ---
    $('#year').text(new Date().getFullYear());

    window.handleClick = function() {
        if ($(".clickListenerFile").length > 0) {
            $(".clickListenerFile").click();
        }
    }

    $(".clickListenerFile").on('change', function() {
        upload();
    });

    function upload() {
        const fileInput = $("#selectedFile")[0].files[0];
        const errorDiv = $(".upload-error");
        errorDiv.hide().text('');

        if (fileInput) {
            if (fileInput.type !== 'video/mp4' && fileInput.type !== 'video/quicktime') {
                alert('Unsupported File Type. Only MP4 and MOV are supported.');
                $("#selectedFile").val('');
                return;
            }
            
            const maxFileSize = 100 * 1024 * 1024;
            if (fileInput.size > maxFileSize) {
                errorDiv.text("Error: too large, please upload a file less than 100MB").show();
                return;
            }

            const formData = new FormData($('#form')[0]);
            $(".box-upload").addClass("animate").html("Uploading...");
            $("#selectedFile").removeClass("clickListenerFile");

            $.ajax({
                xhr: function() {
                    const xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            let percentComplete = parseInt((evt.loaded / evt.total) * 100);
                            $(".box-upload").html(percentComplete + "%");
                            if (percentComplete === 100) {
                                $(".box-upload").html("Processing");
                            }
                        }
                    }, false);
                    return xhr;
                },
                url: `https://videy.co/api/upload`,
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(result) {
                    const videoLink = result.link;
                    const parts = videoLink.split('/');
                    const newId = parts.pop();
                    window.location.href = `/play/${newId}`;
                },
                error: function() {
                    $(".box-upload").html("Upload a Video").removeClass("animate");
                    $("#selectedFile").addClass("clickListenerFile");
                    errorDiv.text("Upload failed. Please try again.").show();
                }
            });
        }
    }
});
