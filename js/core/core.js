// Core Module - игровой цикл
window.Core = {
    canvas: null,
    ctx: null,
    isRunning: false,
    lastTime: 0,
    
    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.isRunning = true;
        this.lastTime = performance.now() / 1000;
        console.log('✅ Core initialized');
        this.gameLoop();
        return this;
    },
    
    gameLoop: function() {
        if (!this.isRunning) return;
        
        const now = performance.now() / 1000;
        let delta = Math.min(0.033, now - this.lastTime);
        this.lastTime = now;
        
        // Очищаем канвас
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Обновление игровой логики
        if (window.GameState && GameState.isActive) {
            this.update(delta);
        }
        
        // Отрисовка
        if (window.Graphics) {
            Graphics.draw();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    },
    
    update: function(delta) {
        // Будет расширено на этапе 2
        if (window.GameState) {
            GameState.updateElixir(delta);
        }
    },
    
    getCanvas: function() {
        return this.canvas;
    },
    
    getContext: function() {
        return this.ctx;
    }
};



