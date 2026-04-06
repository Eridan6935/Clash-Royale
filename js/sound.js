// Sound Module - звуковые эффекты
window.SoundFX = {
    sounds: {},
    music: null,
    isMuted: false,
    isMusicEnabled: true,
    isSFXEnabled: true,
    
    init: function() {
        this.loadSounds();
        this.loadMusic();
        console.log('🔊 Sound system initialized');
    },
    
    loadSounds: function() {
        const soundList = {
            deploy: 'assets/audio/sounds/deploy.mp3',
            hit: 'assets/audio/sounds/hit.mp3',
            towerHit: 'assets/audio/sounds/tower_hit.mp3',
            victory: 'assets/audio/sounds/victory.mp3',
            defeat: 'assets/audio/sounds/defeat.mp3'
        };
        
        for (let key in soundList) {
            const audio = new Audio(soundList[key]);
            audio.preload = 'auto';
            this.sounds[key] = audio;
        }
    },
    
    loadMusic: function() {
        this.music = new Audio('assets/audio/music/battle_theme.mp3');
        this.music.loop = true;
        this.music.volume = 0.5;
        this.music.preload = 'auto';
    },
    
    play: function(soundName) {
        if (this.isMuted) return;
        if (!this.isSFXEnabled && soundName !== 'victory' && soundName !== 'defeat') return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log(`🔇 Sound play error: ${soundName}`));
        }
    },
    
    playMusic: function() {
        if (this.isMuted) return;
        if (!this.isMusicEnabled) return;
        
        if (this.music) {
            this.music.currentTime = 0;
            this.music.play().catch(e => console.log('🎵 Music play error'));
        }
    },
    
    stopMusic: function() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    },
    
    pauseMusic: function() {
        if (this.music && !this.music.paused) {
            this.music.pause();
        }
    },
    
    resumeMusic: function() {
        if (this.music && this.music.paused && !this.isMuted && this.isMusicEnabled) {
            this.music.play().catch(e => console.log('Music resume error'));
        }
    },
    
    toggleMute: function() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopMusic();
        } else {
            if (GameState.isActive) this.playMusic();
        }
        console.log(`🔇 Sound muted: ${this.isMuted}`);
        return this.isMuted;
    },
    
    toggleMusic: function() {
        this.isMusicEnabled = !this.isMusicEnabled;
        if (!this.isMusicEnabled) {
            this.stopMusic();
        } else if (GameState.isActive && !this.isMuted) {
            this.playMusic();
        }
        console.log(`🎵 Music: ${this.isMusicEnabled ? 'ON' : 'OFF'}`);
    },
    
    toggleSFX: function() {
        this.isSFXEnabled = !this.isSFXEnabled;
        console.log(`🔊 SFX: ${this.isSFXEnabled ? 'ON' : 'OFF'}`);
    },
    
    setVolume: function(volume) {
        const vol = Math.max(0, Math.min(1, volume));
        if (this.music) this.music.volume = vol;
        for (let key in this.sounds) {
            this.sounds[key].volume = vol;
        }
    },
    
    // Тестовый звук
    test: function() {
        this.play('deploy');
        setTimeout(() => this.play('hit'), 500);
    }
};
