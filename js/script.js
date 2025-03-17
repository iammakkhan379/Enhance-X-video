document.addEventListener('DOMContentLoaded', function() {
    // Navigation and Scroll
    const navLinks = document.querySelectorAll('nav a');
    const getStartedBtn = document.getElementById('get-started-btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    getStartedBtn.addEventListener('click', function() {
        const enhancerSection = document.getElementById('enhancer-tool');
        window.scrollTo({
            top: enhancerSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Video Upload Handling
    const videoUploadArea = document.getElementById('video-upload-area');
    const videoUploadInput = document.getElementById('video-upload');
    const videoControls = document.getElementById('video-controls');
    const originalVideo = document.getElementById('original-video');
    const enhancedVideo = document.getElementById('enhanced-video');
    const originalVideoInfo = document.getElementById('original-video-info');
    const enhancedVideoInfo = document.getElementById('enhanced-video-info');
    const enhanceVideoBtn = document.getElementById('enhance-video-btn');
    const downloadVideoBtn = document.getElementById('download-video-btn');
    const resetVideoBtn = document.getElementById('reset-video-btn');
    const videoProcessing = document.getElementById('video-processing');
    const videoProgress = document.getElementById('video-progress');
    
    // Video Enhancement Options
    const videoResolution = document.getElementById('video-resolution');
    const videoQuality = document.getElementById('video-quality');
    const noiseReduction = document.getElementById('noise-reduction');
    const noiseReductionValue = document.getElementById('noise-reduction-value');
    const colorEnhancement = document.getElementById('color-enhancement');
    const colorEnhancementValue = document.getElementById('color-enhancement-value');
    
    // Image Upload Handling
    const imageUploadArea = document.getElementById('image-upload-area');
    const imageUploadInput = document.getElementById('image-upload');
    const imageControls = document.getElementById('image-controls');
    const originalImage = document.getElementById('original-image');
    const enhancedImage = document.getElementById('enhanced-image');
    const originalImageInfo = document.getElementById('original-image-info');
    const enhancedImageInfo = document.getElementById('enhanced-image-info');
    const enhanceImageBtn = document.getElementById('enhance-image-btn');
    const downloadImageBtn = document.getElementById('download-image-btn');
    const resetImageBtn = document.getElementById('reset-image-btn');
    const imageProcessing = document.getElementById('image-processing');
    const imageProgress = document.getElementById('image-progress');
    
    // Image Enhancement Options
    const imageResolution = document.getElementById('image-resolution');
    const sharpness = document.getElementById('sharpness');
    const sharpnessValue = document.getElementById('sharpness-value');
    const imageNoiseReduction = document.getElementById('image-noise-reduction');
    const imageNoiseReductionValue = document.getElementById('image-noise-reduction-value');
    const imageColorEnhancement = document.getElementById('image-color-enhancement');
    const imageColorEnhancementValue = document.getElementById('image-color-enhancement-value');
    
    // Range input value display
    noiseReduction.addEventListener('input', function() {
        noiseReductionValue.textContent = `${this.value}%`;
    });
    
    colorEnhancement.addEventListener('input', function() {
        colorEnhancementValue.textContent = `${this.value}%`;
    });
    
    sharpness.addEventListener('input', function() {
        sharpnessValue.textContent = `${this.value}%`;
    });
    
    imageNoiseReduction.addEventListener('input', function() {
        imageNoiseReductionValue.textContent = `${this.value}%`;
    });
    
    imageColorEnhancement.addEventListener('input', function() {
        imageColorEnhancementValue.textContent = `${this.value}%`;
    });
    
    // Video Upload Functionality
    videoUploadArea.addEventListener('click', function() {
        videoUploadInput.click();
    });
    
    videoUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#6c63ff';
        this.style.backgroundColor = 'rgba(108, 99, 255, 0.05)';
    });
    
    videoUploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#ccc';
        this.style.backgroundColor = 'transparent';
    });
    
    videoUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ccc';
        this.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            videoUploadInput.files = e.dataTransfer.files;
            handleVideoUpload(e.dataTransfer.files[0]);
        }
    });
    
    videoUploadInput.addEventListener('change', function() {
        if (this.files.length) {
            handleVideoUpload(this.files[0]);
        }
    });
    
    function handleVideoUpload(file) {
        // Check if file is a video
        if (!file.type.startsWith('video/')) {
            alert('Please upload a valid video file.');
            return;
        }
        
        // Check file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
            alert('File size exceeds 100MB limit.');
            return;
        }
        
        // Create video URL and display
        const videoURL = URL.createObjectURL(file);
        originalVideo.src = videoURL;
        
        // Show video controls and hide upload area
        videoUploadArea.style.display = 'none';
        videoControls.style.display = 'block';
        
        // Display video information
        originalVideo.onloadedmetadata = function() {
            const duration = formatTime(originalVideo.duration);
            const resolution = `${originalVideo.videoWidth}x${originalVideo.videoHeight}`;
            originalVideoInfo.textContent = `Duration: ${duration} | Resolution: ${resolution} | Size: ${formatFileSize(file.size)}`;
        };
    }
    
    // Image Upload Functionality
    imageUploadArea.addEventListener('click', function() {
        imageUploadInput.click();
    });
    
    imageUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#6c63ff';
        this.style.backgroundColor = 'rgba(108, 99, 255, 0.05)';
    });
    
    imageUploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#ccc';
        this.style.backgroundColor = 'transparent';
    });
    
    imageUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ccc';
        this.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            imageUploadInput.files = e.dataTransfer.files;
            handleImageUpload(e.dataTransfer.files[0]);
        }
    });
    
    imageUploadInput.addEventListener('change', function() {
        if (this.files.length) {
            handleImageUpload(this.files[0]);
        }
    });
    
    function handleImageUpload(file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }
        
        // Check file size (max 20MB)
        if (file.size > 20 * 1024 * 1024) {
            alert('File size exceeds 20MB limit.');
            return;
        }
        
        // Create image URL and display
        const imageURL = URL.createObjectURL(file);
        originalImage.src = imageURL;
        
        // Show image controls and hide upload area
        imageUploadArea.style.display = 'none';
        imageControls.style.display = 'block';
        
        // Display image information
        originalImage.onload = function() {
            const resolution = `${originalImage.naturalWidth}x${originalImage.naturalHeight}`;
            originalImageInfo.textContent = `Resolution: ${resolution} | Size: ${formatFileSize(file.size)}`;
        };
    }
    
    // Video Enhancement
    enhanceVideoBtn.addEventListener('click', function() {
        // Show processing indicator
        videoProcessing.style.display = 'flex';
        enhanceVideoBtn.disabled = true;
        
        // Simulate video enhancement process
        simulateVideoEnhancement();
    });
    
    function simulateVideoEnhancement() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            videoProgress.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Create enhanced video (in a real app, this would be the actual enhanced video)
                enhancedVideo.src = originalVideo.src;
                
                // Update enhanced video info based on selected options
                const resolutionMap = {
                    '720p': '1280x720',
                    '1080p': '1920x1080',
                    '1440p': '2560x1440',
                    '2160p': '3840x2160'
                };
                
                const selectedResolution = resolutionMap[videoResolution.value];
                const qualityLevel = videoQuality.value.charAt(0).toUpperCase() + videoQuality.value.slice(1);
                
                enhancedVideoInfo.textContent = `Resolution: ${selectedResolution} | Quality: ${qualityLevel} | Noise Reduction: ${noiseReduction.value}% | Color Enhancement: ${colorEnhancement.value}%`;
                
                // Hide processing indicator and enable download button
                videoProcessing.style.display = 'none';
                enhanceVideoBtn.disabled = false;
                downloadVideoBtn.disabled = false;
            }
        }, 50);
    }
    
    // Image Enhancement
    enhanceImageBtn.addEventListener('click', function() {
        // Show processing indicator
        imageProcessing.style.display = 'flex';
        enhanceImageBtn.disabled = true;
        
        // Simulate image enhancement process
        simulateImageEnhancement();
    });
    
    function simulateImageEnhancement() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            imageProgress.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Create enhanced image (in a real app, this would be the actual enhanced image)
                enhancedImage.src = originalImage.src;
                
                // Calculate new resolution based on scale factor
                const scaleFactor = parseFloat(imageResolution.value);
                const newWidth = Math.round(originalImage.naturalWidth * scaleFactor);
                const newHeight = Math.round(originalImage.naturalHeight * scaleFactor);
                
                // Update enhanced image info
                enhancedImageInfo.textContent = `Resolution: ${newWidth}x${newHeight} | Sharpness: ${sharpness.value}% | Noise Reduction: ${imageNoiseReduction.value}% | Color Enhancement: ${imageColorEnhancement.value}%`;
                
                // Hide processing indicator and enable download button
                imageProcessing.style.display = 'none';
                enhanceImageBtn.disabled = false;
                downloadImageBtn.disabled = false;
            }
        }, 30);
    }
    
    // Download Enhanced Video
    downloadVideoBtn.addEventListener('click', function() {
        // Check if running on mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // For mobile devices, open in new tab first
            const videoWindow = window.open(enhancedVideo.src, '_blank');
            
            // Add download instructions for mobile
            alert('Long press on the video and select "Download" or "Save" from your browser menu to save the video.');
        } else {
            // Desktop download handling
            const a = document.createElement('a');
            a.href = enhancedVideo.src;
            a.download = 'enhanced_video.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
    
    // Download Enhanced Image
    downloadImageBtn.addEventListener('click', function() {
        // Check if running on mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // For mobile devices, open in new tab first
            const imageWindow = window.open(enhancedImage.src, '_blank');
            
            // Add download instructions for mobile
            alert('Long press on the image and select "Download" or "Save" from your browser menu to save the image.');
        } else {
            // Desktop download handling
            const a = document.createElement('a');
            a.href = enhancedImage.src;
            a.download = 'enhanced_image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
    
    // Reset Video
    resetVideoBtn.addEventListener('click', function() {
        // Reset video upload
        videoUploadInput.value = '';
        originalVideo.src = '';
        enhancedVideo.src = '';
        originalVideoInfo.textContent = '';
        enhancedVideoInfo.textContent = '';
        
        // Reset controls
        videoControls.style.display = 'none';
        videoUploadArea.style.display = 'block';
        downloadVideoBtn.disabled = true;
        
        // Reset options
        videoResolution.value = '1080p';
        videoQuality.value = 'medium';
        noiseReduction.value = 50;
        noiseReductionValue.textContent = '50%';
        colorEnhancement.value = 50;
        colorEnhancementValue.textContent = '50%';
    });
    
    // Reset Image
    resetImageBtn.addEventListener('click', function() {
        // Reset image upload
        imageUploadInput.value = '';
        originalImage.src = '';
        enhancedImage.src = '';
        originalImageInfo.textContent = '';
        enhancedImageInfo.textContent = '';
        
        // Reset controls
        imageControls.style.display = 'none';
        imageUploadArea.style.display = 'block';
        downloadImageBtn.disabled = true;
        
        // Reset options
        imageResolution.value = '2';
        sharpness.value = 50;
        sharpnessValue.textContent = '50%';
        imageNoiseReduction.value = 50;
        imageNoiseReductionValue.textContent = '50%';
        imageColorEnhancement.value = 50;
        imageColorEnhancementValue.textContent = '50%';
    });
    
    // Helper Functions
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return bytes + ' B';
        } else if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else if (bytes < 1024 * 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        } else {
            return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
        }
    }
}); 