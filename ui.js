// Функция для рисования полоски эликсира
window.drawElixirBar = function(ctx, current, max) {
    const barWidth = 300;
    const barHeight = 25;
    const x = 250;
    const y = 20;
    const fillPercent = current / max;
    
    // Фон
    ctx.fillStyle = '#4b0082';
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Заполнение
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(x, y, barWidth * fillPercent, barHeight);
    
    // Иконки эликсира
    for (let i = 0; i < max; i++) {
        ctx.fillStyle = i < current ? '#ffffff' : '#666666';
        ctx.beginPath();
        ctx.arc(x + 20 + i * 30, y + 12, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}
